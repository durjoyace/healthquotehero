/**
 * Form Types and Interfaces
 * Based on original WordPress/Gravity Forms implementation
 */

// Health Insurance Form Data
export interface HealthInsuranceFormData {
  // Step 1 - Landing
  zip: string;

  // Step 2 - Personal Info
  birth_month: string;
  birth_day: string;
  birth_year: string;
  gender: "male" | "female" | "";

  // Step 3 - Household
  household_size: string;
  household_income: string;
  is_self_employed: boolean;

  // Step 4 - Life Events
  has_major_event: boolean;
  major_life_event: string;
  event_month: string;
  event_day: string;
  event_year: string;

  // Step 5 - Health Conditions
  have_conditions: boolean;
  health_conditions: string[];

  // Step 6 - Address
  address: string;
  city: string;
  state: string;

  // Step 7 - Contact
  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  // Tracking
  arrival_id: string;
  jornaya_id: string;
  campaign: string;
  term: string;
  vertical_id: string;
}

// Medicare Form Data
export interface MedicareFormData {
  // Step 1 - Landing
  zip: string;

  // Step 2 - Personal Info
  birth_month: string;
  birth_day: string;
  birth_year: string;
  gender: "male" | "female" | "";

  // Step 3 - Coverage Interest
  interested_in: string;

  // Step 4 - Address
  address: string;
  city: string;
  state: string;

  // Step 5 - Contact
  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  // Tracking
  arrival_id: string;
  jornaya_id: string;
  campaign: string;
  term: string;
  vertical_id: string;
}

// Household income options based on household size
export const HOUSEHOLD_INCOME_OPTIONS: Record<number, { value: number; label: string }[]> = {
  1: [
    { value: 15075, label: "$0 to $30,150" },
    { value: 39194, label: "$30,150 to $48,240" },
    { value: 48240, label: "$48,240 or more" },
  ],
  2: [
    { value: 20300, label: "$0 to $40,600" },
    { value: 52780, label: "$40,600 to $64,960" },
    { value: 64960, label: "$64,960 or more" },
  ],
  3: [
    { value: 25525, label: "$0 to $51,050" },
    { value: 66364, label: "$51,050 to $81,680" },
    { value: 81680, label: "$81,680 or more" },
  ],
  4: [
    { value: 30750, label: "$0 to $61,500" },
    { value: 79950, label: "$61,500 to $98,400" },
    { value: 98400, label: "$98,400 or more" },
  ],
  5: [
    { value: 35975, label: "$0 to $71,950" },
    { value: 93534, label: "$71,950 to $115,120" },
    { value: 115120, label: "$115,120 or more" },
  ],
  6: [
    { value: 41200, label: "$0 to $82,400" },
    { value: 107120, label: "$82,400 to $131,840" },
    { value: 131840, label: "$131,840 or more" },
  ],
  7: [
    { value: 46425, label: "$0 to $92,850" },
    { value: 120704, label: "$92,850 to $148,560" },
    { value: 148560, label: "$148,560 or more" },
  ],
  8: [
    { value: 51650, label: "$0 to $103,300" },
    { value: 134290, label: "$103,300 to $165,280" },
    { value: 165280, label: "$165,280 or more" },
  ],
};

// Health conditions options
export const HEALTH_CONDITIONS = [
  { value: "diabetes", label: "Diabetes" },
  { value: "heart_disease", label: "Heart Disease" },
  { value: "cancer", label: "Cancer" },
  { value: "copd", label: "COPD/Lung Disease" },
  { value: "depression", label: "Depression/Anxiety" },
  { value: "high_blood_pressure", label: "High Blood Pressure" },
  { value: "obesity", label: "Obesity" },
  { value: "arthritis", label: "Arthritis" },
];

// Major life events
export const MAJOR_LIFE_EVENTS = [
  { value: "lost_coverage", label: "Lost health coverage" },
  { value: "moved", label: "Moved to a new state" },
  { value: "married", label: "Got married" },
  { value: "divorced", label: "Got divorced" },
  { value: "had_baby", label: "Had a baby" },
  { value: "adopted", label: "Adopted a child" },
  { value: "lost_medicaid", label: "Lost Medicaid/CHIP" },
  { value: "turned_26", label: "Turned 26" },
  { value: "released_incarceration", label: "Released from incarceration" },
  { value: "citizenship", label: "Gained citizenship" },
];

// Medicare coverage types
export const MEDICARE_COVERAGE_TYPES = [
  { value: "medicare_advantage", label: "Medicare Advantage" },
  { value: "medicare_supplement", label: "Medicare Supplement (Medigap)" },
  { value: "prescription_drug", label: "Prescription Drug Plan (Part D)" },
  { value: "not_sure", label: "Not Sure - Help Me Decide" },
];

// Gender options
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

// Household size options
export const HOUSEHOLD_SIZE_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8+" },
];

// API Response Types
export interface ArrivalResponse {
  status: "success" | "error";
  arrivalID?: string;
  message?: string;
}

export interface LeadSubmitResponse {
  status: "success" | "error";
  leadID?: string;
  message?: string;
}

export interface GeocodeResponse {
  city: string;
  state: string;
  state_long: string;
  county: string;
  lat: number;
  lng: number;
}

export interface InsuranceOffer {
  id: string;
  company: string;
  planName: string;
  logoURL: string;
  clickURL: string;
  headline: string;
  descriptionLines: string[];
  monthlyCost?: number;
  deductible?: number;
  coinsurancePercentage?: number;
  outOfPocketMax?: number;
  lifeTimeMaxBenefit?: number;
  adtype: "click" | "click_to_call";
  actionLink?: string;
  actionButtonURL?: string;
  contentImageURL?: string;
  pixelURL?: string;
}

export interface ThankYouPageData {
  offers: InsuranceOffer[];
  city: string;
  state: string;
  heading: string;
  subheading: string;
}

// Form step configuration
export interface FormStep {
  id: number;
  title: string;
  fields: string[];
}

export const HEALTH_FORM_STEPS: FormStep[] = [
  { id: 1, title: "Get Started", fields: ["zip"] },
  { id: 2, title: "About You", fields: ["birth_month", "birth_day", "birth_year", "gender"] },
  { id: 3, title: "Household", fields: ["household_size", "household_income", "is_self_employed"] },
  { id: 4, title: "Life Events", fields: ["has_major_event", "major_life_event", "event_month", "event_day", "event_year"] },
  { id: 5, title: "Health", fields: ["have_conditions", "health_conditions"] },
  { id: 6, title: "Location", fields: ["address", "city", "state"] },
  { id: 7, title: "Contact", fields: ["first_name", "last_name", "email", "phone"] },
];

export const MEDICARE_FORM_STEPS: FormStep[] = [
  { id: 1, title: "Get Started", fields: ["zip"] },
  { id: 2, title: "About You", fields: ["birth_month", "birth_day", "birth_year", "gender"] },
  { id: 3, title: "Coverage", fields: ["interested_in"] },
  { id: 4, title: "Location", fields: ["address", "city", "state"] },
  { id: 5, title: "Contact", fields: ["first_name", "last_name", "email", "phone"] },
];

// Initial form states
export const INITIAL_HEALTH_FORM_DATA: HealthInsuranceFormData = {
  zip: "",
  birth_month: "",
  birth_day: "",
  birth_year: "",
  gender: "",
  household_size: "",
  household_income: "",
  is_self_employed: false,
  has_major_event: false,
  major_life_event: "",
  event_month: "",
  event_day: "",
  event_year: "",
  have_conditions: false,
  health_conditions: [],
  address: "",
  city: "",
  state: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  arrival_id: "",
  jornaya_id: "",
  campaign: "",
  term: "",
  vertical_id: "101",
};

export const INITIAL_MEDICARE_FORM_DATA: MedicareFormData = {
  zip: "",
  birth_month: "",
  birth_day: "",
  birth_year: "",
  gender: "",
  interested_in: "",
  address: "",
  city: "",
  state: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  arrival_id: "",
  jornaya_id: "",
  campaign: "",
  term: "",
  vertical_id: "102",
};
