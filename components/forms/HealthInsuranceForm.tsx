"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Input,
  Select,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  PhoneInput,
  ZipInput,
  ProgressBar,
  FormButtons,
  FormContainer,
} from "./FormElements";
import {
  GENDER_OPTIONS,
  HOUSEHOLD_SIZE_OPTIONS,
  HOUSEHOLD_INCOME_OPTIONS,
  MAJOR_LIFE_EVENTS,
  HEALTH_CONDITIONS,
  INITIAL_HEALTH_FORM_DATA,
  type HealthInsuranceFormData,
} from "@/lib/types/forms";
import { JornayaScript } from "./JornayaScript";

interface HealthInsuranceFormProps {
  initialStep?: number;
}

const TOTAL_STEPS = 7;
const BASE_URL = "/health-plan-form-m";

// Loading fallback for the form
function FormLoadingFallback() {
  return (
    <div className="min-h-[60vh] py-8 bg-gray-50">
      <div className="container max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    </div>
  );
}

// Main form wrapper with Suspense
export function HealthInsuranceForm({ initialStep = 1 }: HealthInsuranceFormProps) {
  return (
    <Suspense fallback={<FormLoadingFallback />}>
      <HealthInsuranceFormContent initialStep={initialStep} />
    </Suspense>
  );
}

// Actual form content that uses useSearchParams
function HealthInsuranceFormContent({ initialStep = 1 }: HealthInsuranceFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form state
  const [formData, setFormData] = useState<HealthInsuranceFormData>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("health_form_data");
      if (saved) {
        try {
          return { ...INITIAL_HEALTH_FORM_DATA, ...JSON.parse(saved) };
        } catch {
          return INITIAL_HEALTH_FORM_DATA;
        }
      }
    }
    return INITIAL_HEALTH_FORM_DATA;
  });

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [arrivalId, setArrivalId] = useState("");

  // Save form data to session
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("health_form_data", JSON.stringify(formData));
    }
  }, [formData]);

  // Get URL params on mount
  useEffect(() => {
    const campaign = searchParams.get("cid") || searchParams.get("campaign") || "";
    const term = searchParams.get("kw") || searchParams.get("term") || "";
    const zip = searchParams.get("zip") || "";

    if (campaign || term || zip) {
      setFormData((prev) => ({
        ...prev,
        campaign,
        term,
        zip: zip || prev.zip,
      }));
    }
  }, [searchParams]);

  // Create arrival tracking on mount
  useEffect(() => {
    const createArrival = async () => {
      if (arrivalId) return;

      try {
        const response = await fetch("/api/lead/arrival", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formType: "health",
            campaign: formData.campaign,
            term: formData.term,
            referrer: document.referrer,
            landingUrl: window.location.href,
          }),
        });

        const data = await response.json();
        if (data.arrivalId) {
          setArrivalId(data.arrivalId);
          setFormData((prev) => ({ ...prev, arrival_id: data.arrivalId }));
        }
      } catch {
        // Arrival creation failed silently - form can still be submitted
      }
    };

    createArrival();
  }, [arrivalId, formData.campaign, formData.term]);

  // Update field
  const updateField = <K extends keyof HealthInsuranceFormData>(
    field: K,
    value: HealthInsuranceFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Validate current step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.zip || formData.zip.length !== 5) {
          newErrors.zip = "Please enter a valid 5-digit ZIP code";
        }
        break;
      case 2:
        if (!formData.birth_month) newErrors.birth_month = "Required";
        if (!formData.birth_day) newErrors.birth_day = "Required";
        if (!formData.birth_year) newErrors.birth_year = "Required";
        if (!formData.gender) newErrors.gender = "Please select your gender";
        break;
      case 3:
        if (!formData.household_size) newErrors.household_size = "Required";
        if (!formData.household_income) newErrors.household_income = "Required";
        break;
      case 4:
        if (formData.has_major_event && !formData.major_life_event) {
          newErrors.major_life_event = "Please select the life event";
        }
        break;
      case 6:
        if (!formData.address) newErrors.address = "Address is required";
        break;
      case 7:
        if (!formData.first_name) newErrors.first_name = "First name is required";
        if (!formData.last_name) newErrors.last_name = "Last name is required";
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Valid email is required";
        }
        if (!formData.phone || formData.phone.replace(/\D/g, "").length !== 10) {
          newErrors.phone = "Valid phone number is required";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep < TOTAL_STEPS) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      router.push(`${BASE_URL}${nextStep}/`);
    } else {
      // Submit form
      await handleSubmit();
    }
  };

  // Handle previous step
  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      router.push(`${BASE_URL}${prevStep}/`);
    }
  };

  // Submit form
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Get Jornaya token if available
      const jornayaToken =
        (document.getElementById("leadid_token") as HTMLInputElement)?.value || "";

      const submitData = {
        ...formData,
        jornaya_id: jornayaToken,
      };

      const response = await fetch("/api/lead/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "health",
          formData: submitData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Clear form data
        sessionStorage.removeItem("health_form_data");

        // Redirect to thank you page with params
        const params = new URLSearchParams({
          type: "health",
          arrivalId: result.arrivalId || arrivalId,
          city: formData.city || result.city || "",
          state: formData.state || result.state || "",
        });
        router.push(`/thank-you/?${params.toString()}`);
      } else {
        setErrors({ submit: result.error || "Submission failed" });
      }
    } catch {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle ZIP validation and city/state lookup
  const handleZipValidated = (city: string, state: string) => {
    setFormData((prev) => ({ ...prev, city, state }));
  };

  // Get income options based on household size
  const incomeOptions =
    HOUSEHOLD_INCOME_OPTIONS[parseInt(formData.household_size) || 1]?.map((opt) => ({
      value: String(opt.value),
      label: opt.label,
    })) || [];

  // Render step content
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormContainer
            title="Get Your Free Health Insurance Quote"
            subtitle="Enter your ZIP code to see plans available in your area"
          >
            <ZipInput
              label="ZIP Code"
              value={formData.zip}
              onChange={(val) => updateField("zip", val)}
              onValidZip={handleZipValidated}
              error={errors.zip}
            />
          </FormContainer>
        );

      case 2:
        return (
          <FormContainer title="About You" subtitle="Tell us about yourself">
            <DatePicker
              label="Date of Birth"
              month={formData.birth_month}
              day={formData.birth_day}
              year={formData.birth_year}
              onMonthChange={(val) => updateField("birth_month", val)}
              onDayChange={(val) => updateField("birth_day", val)}
              onYearChange={(val) => updateField("birth_year", val)}
              minYear={new Date().getFullYear() - 65}
              maxYear={new Date().getFullYear() - 18}
              error={errors.birth_month || errors.birth_day || errors.birth_year}
            />
            <RadioGroup
              label="Gender"
              name="gender"
              options={GENDER_OPTIONS}
              value={formData.gender}
              onChange={(val) => updateField("gender", val as "male" | "female")}
              error={errors.gender}
              inline
            />
          </FormContainer>
        );

      case 3:
        return (
          <FormContainer title="Household Information">
            <Select
              label="How many people are in your household?"
              options={HOUSEHOLD_SIZE_OPTIONS}
              value={formData.household_size}
              onChange={(e) => {
                updateField("household_size", e.target.value);
                // Reset income when household size changes
                updateField("household_income", "");
              }}
              placeholder="Select household size"
              error={errors.household_size}
            />
            <Select
              label="Expected annual household income"
              options={incomeOptions}
              value={formData.household_income}
              onChange={(e) => updateField("household_income", e.target.value)}
              placeholder="Select income range"
              error={errors.household_income}
            />
            <Checkbox
              label="Are you self-employed?"
              checked={formData.is_self_employed}
              onChange={(val) => updateField("is_self_employed", val)}
            />
          </FormContainer>
        );

      case 4:
        return (
          <FormContainer
            title="Life Events"
            subtitle="Have you experienced any major life events in the past 60 days?"
          >
            <RadioGroup
              label=""
              name="has_major_event"
              options={[
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]}
              value={formData.has_major_event ? "true" : "false"}
              onChange={(val) => updateField("has_major_event", val === "true")}
              inline
            />
            {formData.has_major_event && (
              <>
                <Select
                  label="What life event did you experience?"
                  options={MAJOR_LIFE_EVENTS}
                  value={formData.major_life_event}
                  onChange={(e) => updateField("major_life_event", e.target.value)}
                  placeholder="Select life event"
                  error={errors.major_life_event}
                />
                <DatePicker
                  label="When did this event occur?"
                  month={formData.event_month}
                  day={formData.event_day}
                  year={formData.event_year}
                  onMonthChange={(val) => updateField("event_month", val)}
                  onDayChange={(val) => updateField("event_day", val)}
                  onYearChange={(val) => updateField("event_year", val)}
                  minYear={new Date().getFullYear() - 1}
                  maxYear={new Date().getFullYear()}
                />
              </>
            )}
          </FormContainer>
        );

      case 5:
        return (
          <FormContainer
            title="Health Information"
            subtitle="Do you or anyone in your household have major health conditions?"
          >
            <RadioGroup
              label=""
              name="have_conditions"
              options={[
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]}
              value={formData.have_conditions ? "true" : "false"}
              onChange={(val) => updateField("have_conditions", val === "true")}
              inline
            />
            {formData.have_conditions && (
              <CheckboxGroup
                label="Select any conditions that apply"
                options={HEALTH_CONDITIONS}
                values={formData.health_conditions}
                onChange={(vals) => updateField("health_conditions", vals)}
              />
            )}
          </FormContainer>
        );

      case 6:
        return (
          <FormContainer title="Your Location">
            <Input
              label="Street Address"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="123 Main St"
              error={errors.address}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="City"
              />
              <Input
                label="State"
                value={formData.state}
                onChange={(e) => updateField("state", e.target.value)}
                placeholder="State"
              />
            </div>
            <Input label="ZIP Code" value={formData.zip} disabled />
          </FormContainer>
        );

      case 7:
        return (
          <FormContainer
            title="Contact Information"
            subtitle="We'll send your personalized quotes to this information"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.first_name}
                onChange={(e) => updateField("first_name", e.target.value)}
                placeholder="First name"
                error={errors.first_name}
              />
              <Input
                label="Last Name"
                value={formData.last_name}
                onChange={(e) => updateField("last_name", e.target.value)}
                placeholder="Last name"
                error={errors.last_name}
              />
            </div>
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              error={errors.email}
            />
            <PhoneInput
              label="Phone Number"
              value={formData.phone}
              onChange={(val) => updateField("phone", val)}
              error={errors.phone}
            />

            {/* Jornaya lead token */}
            <input type="hidden" id="leadid_token" name="leadid_token" />

            {/* Legal disclaimer */}
            <p className="text-xs text-gray-500 mt-4">
              By clicking Submit, you agree to be contacted by licensed insurance agents at
              the phone number and email provided. You consent to receive calls, texts, and
              emails about health insurance options. Consent is not required to purchase.
              Message and data rates may apply.
            </p>

            {errors.submit && (
              <p className="text-red-600 text-sm mt-2">{errors.submit}</p>
            )}
          </FormContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[60vh] py-8 bg-gray-50">
      <div className="container max-w-2xl">
        {/* Jornaya Script */}
        <JornayaScript />

        {/* Progress */}
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <FormButtons
            onBack={handleBack}
            onNext={handleNext}
            isSubmitting={isSubmitting}
            isLastStep={currentStep === TOTAL_STEPS}
            showBack={currentStep > 1}
            nextLabel={currentStep === TOTAL_STEPS ? "Get My Quotes" : undefined}
          />
        </div>

        {/* Trust indicators */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
}
