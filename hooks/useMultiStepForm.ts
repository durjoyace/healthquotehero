"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/api-config";

interface UseMultiStepFormOptions<T> {
  initialData: T;
  totalSteps: number;
  baseUrl: string;
  formType: "health" | "medicare";
  onComplete: (data: T) => Promise<void>;
}

export function useMultiStepForm<T extends Record<string, unknown>>({
  initialData,
  totalSteps,
  baseUrl,
  formType,
  onComplete,
}: UseMultiStepFormOptions<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form state
  const [formData, setFormData] = useState<T>(() => {
    // Try to restore from sessionStorage
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(`${formType}_form_data`);
      if (saved) {
        try {
          return { ...initialData, ...JSON.parse(saved) };
        } catch {
          return initialData;
        }
      }
    }
    return initialData;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [arrivalId, setArrivalId] = useState<string>("");

  // Persist form data to sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`${formType}_form_data`, JSON.stringify(formData));
    }
  }, [formData, formType]);

  // Get URL parameters on mount
  useEffect(() => {
    const campaign = searchParams.get("cid") || searchParams.get("campaign") || "";
    const term = searchParams.get("kw") || searchParams.get("term") || "";
    const tid = searchParams.get("tid") || "";

    if (campaign || term || tid) {
      setFormData((prev) => ({
        ...prev,
        campaign,
        term,
      }));
    }
  }, [searchParams]);

  // Create arrival on mount
  useEffect(() => {
    const createArrival = async () => {
      if (arrivalId) return;

      try {
        const response = await fetch(API_ENDPOINTS.arrival, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formType,
            campaign: formData.campaign || "",
            term: formData.term || "",
            referrer: typeof window !== "undefined" ? document.referrer : "",
            landingUrl: typeof window !== "undefined" ? window.location.href : "",
          }),
        });

        const data = await response.json();
        if (data.arrivalId) {
          setArrivalId(data.arrivalId);
          setFormData((prev) => ({ ...prev, arrival_id: data.arrivalId }));
        }
      } catch (error) {
        console.error("Failed to create arrival:", error);
      }
    };

    createArrival();
  }, [formType, arrivalId, formData.campaign, formData.term]);

  // Update form field
  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  // Update multiple fields at once
  const updateFields = useCallback((fields: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  }, []);

  // Validate current step
  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string> = {};

    // Step-specific validation
    if (formType === "health") {
      switch (step) {
        case 1:
          if (!formData.zip || (formData.zip as string).length !== 5) {
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
        case 6:
          if (!formData.address) newErrors.address = "Address is required";
          break;
        case 7:
          if (!formData.first_name) newErrors.first_name = "First name is required";
          if (!formData.last_name) newErrors.last_name = "Last name is required";
          if (!formData.email || !isValidEmail(formData.email as string)) {
            newErrors.email = "Valid email is required";
          }
          if (!formData.phone || !isValidPhone(formData.phone as string)) {
            newErrors.phone = "Valid phone number is required";
          }
          break;
      }
    } else if (formType === "medicare") {
      switch (step) {
        case 1:
          if (!formData.zip || (formData.zip as string).length !== 5) {
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
          if (!formData.interested_in) newErrors.interested_in = "Please select a coverage type";
          break;
        case 4:
          if (!formData.address) newErrors.address = "Address is required";
          break;
        case 5:
          if (!formData.first_name) newErrors.first_name = "First name is required";
          if (!formData.last_name) newErrors.last_name = "Last name is required";
          if (!formData.email || !isValidEmail(formData.email as string)) {
            newErrors.email = "Valid email is required";
          }
          if (!formData.phone || !isValidPhone(formData.phone as string)) {
            newErrors.phone = "Valid phone number is required";
          }
          break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, formType]);

  // Go to next step
  const nextStep = useCallback(async () => {
    if (!validateStep(currentStep)) {
      return false;
    }

    if (currentStep < totalSteps) {
      const nextStepNum = currentStep + 1;
      setCurrentStep(nextStepNum);

      // Update URL
      const nextUrl = `${baseUrl}${nextStepNum}/`;
      router.push(nextUrl);

      return true;
    } else {
      // Final step - submit
      return handleSubmit();
    }
  }, [currentStep, totalSteps, baseUrl, router, validateStep]);

  // Go to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      const prevStepNum = currentStep - 1;
      setCurrentStep(prevStepNum);

      const prevUrl = `${baseUrl}${prevStepNum}/`;
      router.push(prevUrl);
    }
  }, [currentStep, baseUrl, router]);

  // Go to specific step
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
        router.push(`${baseUrl}${step}/`);
      }
    },
    [baseUrl, totalSteps, router]
  );

  // Handle form submission
  const handleSubmit = useCallback(async (): Promise<boolean> => {
    if (!validateStep(currentStep)) {
      return false;
    }

    setIsSubmitting(true);

    try {
      await onComplete(formData);

      // Clear form data from session
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(`${formType}_form_data`);
      }

      return true;
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Failed to submit form. Please try again." });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, formData, formType, onComplete, validateStep]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setCurrentStep(1);
    setErrors({});
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(`${formType}_form_data`);
    }
  }, [initialData, formType]);

  return {
    formData,
    currentStep,
    totalSteps,
    isSubmitting,
    errors,
    arrivalId,
    updateField,
    updateFields,
    nextStep,
    prevStep,
    goToStep,
    handleSubmit,
    resetForm,
    validateStep,
  };
}

// Validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 10;
}
