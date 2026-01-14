"use client";

import { useState } from "react";

export interface Source {
  name: string;
  url: string;
  accessDate?: string;
}

interface SourceCitationProps {
  sources: Source[];
  className?: string;
}

export function SourceCitation({ sources, className = "" }: SourceCitationProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-700 transition-colors w-full text-left"
      >
        <svg
          className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span>Sources & References ({sources.length})</span>
      </button>

      {expanded && (
        <ul className="mt-3 space-y-2 pl-6 text-sm">
          {sources.map((source, index) => (
            <li key={index} className="text-gray-600">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 hover:text-primary-900 underline"
              >
                {source.name}
              </a>
              {source.accessDate && (
                <span className="text-gray-500 ml-1">
                  (accessed {source.accessDate})
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface LastUpdatedProps {
  date: string;
  className?: string;
}

export function LastUpdated({ date, className = "" }: LastUpdatedProps) {
  return (
    <div className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Last updated: {date}</span>
    </div>
  );
}

interface MedicalDisclaimerProps {
  className?: string;
}

export function MedicalDisclaimer({ className = "" }: MedicalDisclaimerProps) {
  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 ${className}`}>
      <div className="flex gap-3">
        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-1">Important Notice</p>
          <p className="text-amber-700">
            This information is for educational purposes only and is not intended as medical or insurance advice.
            Insurance plans, costs, and coverage vary by location and individual circumstances.
            Please consult with a licensed insurance agent or healthcare provider for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
}

interface ExternalResourcesProps {
  resources: {
    name: string;
    url: string;
    description: string;
  }[];
  title?: string;
  className?: string;
}

export function ExternalResources({ resources, title = "Official Resources", className = "" }: ExternalResourcesProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-6 ${className}`}>
      <h3 className="font-heading font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        {title}
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200"
          >
            <div className="font-medium text-gray-900 group-hover:text-primary-700 flex items-center gap-1">
              {resource.name}
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

// Pre-defined source sets for reuse
export const healthInsuranceSources: Source[] = [
  {
    name: "Healthcare.gov - Health Insurance Marketplace",
    url: "https://www.healthcare.gov/",
    accessDate: "January 2026",
  },
  {
    name: "CMS.gov - 2026 Marketplace Open Enrollment",
    url: "https://www.cms.gov/marketplace",
    accessDate: "January 2026",
  },
  {
    name: "Kaiser Family Foundation - Health Insurance Market",
    url: "https://www.kff.org/health-reform/",
    accessDate: "January 2026",
  },
  {
    name: "IRS - Premium Tax Credit",
    url: "https://www.irs.gov/affordable-care-act/individuals-and-families/premium-tax-credit",
    accessDate: "January 2026",
  },
];

export const medicareSources: Source[] = [
  {
    name: "Medicare.gov - Official U.S. Government Site",
    url: "https://www.medicare.gov/",
    accessDate: "January 2026",
  },
  {
    name: "CMS.gov - 2026 Medicare Parts A & B Premiums",
    url: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-and-deductibles",
    accessDate: "January 2026",
  },
  {
    name: "CMS.gov - Medicare Drug Price Negotiation Program",
    url: "https://www.cms.gov/inflation-reduction-act-and-medicare/medicare-drug-price-negotiation",
    accessDate: "January 2026",
  },
  {
    name: "Medicare.gov - Part D Drug Costs",
    url: "https://www.medicare.gov/drug-coverage-part-d",
    accessDate: "January 2026",
  },
];

export const healthInsuranceResources = [
  {
    name: "Healthcare.gov",
    url: "https://www.healthcare.gov/",
    description: "Official ACA Marketplace for health insurance enrollment",
  },
  {
    name: "IRS Premium Tax Credit",
    url: "https://www.irs.gov/affordable-care-act/individuals-and-families/premium-tax-credit",
    description: "Learn about subsidies and tax credits you may qualify for",
  },
  {
    name: "Kaiser Family Foundation",
    url: "https://www.kff.org/interactive/subsidy-calculator/",
    description: "Subsidy calculator and health policy research",
  },
  {
    name: "State Health Insurance Assistance",
    url: "https://www.shiphelp.org/",
    description: "Free local counseling for health insurance questions",
  },
];

export const medicareResources = [
  {
    name: "Medicare.gov",
    url: "https://www.medicare.gov/",
    description: "Official Medicare information and plan finder",
  },
  {
    name: "Social Security Administration",
    url: "https://www.ssa.gov/medicare/",
    description: "Medicare enrollment and eligibility information",
  },
  {
    name: "Medicare Rights Center",
    url: "https://www.medicarerights.org/",
    description: "Free Medicare counseling and education",
  },
  {
    name: "SHIP Locator",
    url: "https://www.shiphelp.org/",
    description: "Find free local Medicare counseling in your state",
  },
];
