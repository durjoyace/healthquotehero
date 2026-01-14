"use client";

// Real insurance carrier names
const carriers = [
  "Aetna",
  "Anthem",
  "Blue Cross Blue Shield",
  "Cigna",
  "Humana",
  "Kaiser Permanente",
  "UnitedHealthcare",
  "Oscar Health",
];

interface LogoBarProps {
  className?: string;
}

export function LogoBar({ className = "" }: LogoBarProps) {
  return (
    <div className={className}>
      <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
        Compare Plans From America&apos;s Leading Insurance Carriers
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {carriers.map((carrier) => (
          <span
            key={carrier}
            className="text-gray-400 font-heading font-semibold text-sm md:text-base hover:text-primary-900 transition-colors cursor-default"
          >
            {carrier}
          </span>
        ))}
      </div>
    </div>
  );
}

// Trust badges with real certifications
export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 md:gap-10 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">256-bit SSL Encrypted</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">HIPAA Compliant</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">BBB Accredited</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
        <span className="font-medium">Licensed in All 50 States</span>
      </div>
    </div>
  );
}

// Compact trust strip for hero sections
export function TrustStrip({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "dark" ? "text-white/80" : "text-gray-600";
  const iconColor = variant === "dark" ? "text-green-400" : "text-green-600";

  return (
    <div className={`flex flex-wrap justify-center gap-6 text-sm ${textColor}`}>
      <div className="flex items-center gap-2">
        <svg className={`w-5 h-5 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>No Cost to You</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className={`w-5 h-5 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Licensed Agents</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className={`w-5 h-5 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>No Spam Calls</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className={`w-5 h-5 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Unbiased Advice</span>
      </div>
    </div>
  );
}
