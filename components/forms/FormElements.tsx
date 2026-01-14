"use client";

import { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

// Text Input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className = "", ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <input
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
}

// Select
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <select
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none bg-white ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Radio Group
interface RadioGroupProps {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inline?: boolean;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  inline = false,
}: RadioGroupProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      )}
      <div className={inline ? "flex flex-wrap gap-4" : "space-y-2"}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              value === option.value
                ? "border-primary-500 bg-primary-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-3 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Checkbox
interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function Checkbox({ label, checked, onChange, error }: CheckboxProps) {
  return (
    <div className="mb-4">
      <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:border-gray-400">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
        />
        <span className="ml-3 text-gray-700">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Checkbox Group (for multiple selections)
interface CheckboxGroupProps {
  label?: string;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

export function CheckboxGroup({
  label,
  options,
  values,
  onChange,
  error,
}: CheckboxGroupProps) {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              values.includes(option.value)
                ? "border-primary-500 bg-primary-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input
              type="checkbox"
              checked={values.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="ml-3 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Date Picker (Month/Day/Year selects)
interface DatePickerProps {
  label?: string;
  month: string;
  day: string;
  year: string;
  onMonthChange: (value: string) => void;
  onDayChange: (value: string) => void;
  onYearChange: (value: string) => void;
  minYear?: number;
  maxYear?: number;
  error?: string;
}

export function DatePicker({
  label,
  month,
  day,
  year,
  onMonthChange,
  onDayChange,
  onYearChange,
  minYear = 1924,
  maxYear = new Date().getFullYear(),
  error,
}: DatePickerProps) {
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => ({
    value: String(maxYear - i),
    label: String(maxYear - i),
  }));

  const fieldsetId = `date-picker-${label?.toLowerCase().replace(/\s+/g, '-') || 'date'}`;

  return (
    <fieldset className="mb-4">
      {label && (
        <legend className="block text-sm font-medium text-gray-700 mb-2">{label}</legend>
      )}
      <div className="grid grid-cols-3 gap-2">
        <select
          id={`${fieldsetId}-month`}
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
          aria-label="Birth month"
          className={`px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Month</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <select
          id={`${fieldsetId}-day`}
          value={day}
          onChange={(e) => onDayChange(e.target.value)}
          aria-label="Birth day"
          className={`px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <select
          id={`${fieldsetId}-year`}
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          aria-label="Birth year"
          className={`px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y.value} value={y.value}>
              {y.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
    </fieldset>
  );
}

// Phone Input with formatting
interface PhoneInputProps extends Omit<InputProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export function PhoneInput({ value, onChange, ...props }: PhoneInputProps) {
  const formatPhone = (input: string): string => {
    const cleaned = input.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      if (parts.length === 0) return "";
      if (parts.length === 1) return parts[0];
      if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
      return `(${parts[0]}) ${parts[1]}-${parts[2]}`;
    }
    return input;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    onChange(formatted);
  };

  return (
    <Input
      {...props}
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder="(555) 555-5555"
      maxLength={14}
    />
  );
}

// ZIP Code Input
interface ZipInputProps extends Omit<InputProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onValidZip?: (city: string, state: string) => void;
}

export function ZipInput({ value, onChange, onValidZip, ...props }: ZipInputProps) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 5);
    onChange(cleaned);

    // Auto-lookup city/state when 5 digits entered
    if (cleaned.length === 5 && onValidZip) {
      try {
        const response = await fetch(`/api/geocode?zip=${cleaned}`);
        const data = await response.json();
        if (data.success) {
          onValidZip(data.city, data.state);
        }
      } catch {
        // ZIP lookup failed silently - user can still proceed with manual entry
      }
    }
  };

  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      value={value}
      onChange={handleChange}
      placeholder="Enter ZIP code"
      maxLength={5}
    />
  );
}

// Progress Bar
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Form Buttons
interface FormButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
  isLastStep?: boolean;
  showBack?: boolean;
  nextLabel?: string;
}

export function FormButtons({
  onBack,
  onNext,
  isSubmitting = false,
  isLastStep = false,
  showBack = true,
  nextLabel,
}: FormButtonsProps) {
  return (
    <div className="flex gap-4 mt-8">
      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          disabled={isSubmitting}
        >
          Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          nextLabel || (isLastStep ? "Submit" : "Next")
        )}
      </button>
    </div>
  );
}

// Form Container
interface FormContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function FormContainer({ children, title, subtitle }: FormContainerProps) {
  return (
    <div className="max-w-xl mx-auto p-6">
      {title && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
