"use client";

import Script from "next/script";
import { API_CONFIG } from "@/lib/api-config";

/**
 * Jornaya LeadiD Script
 * Provides lead verification and compliance tracking
 *
 * In production, replace the campaign ID with your actual Jornaya campaign ID
 */
export function JornayaScript() {
  // Skip if no campaign ID configured
  if (!API_CONFIG.jornayaCampaignId) {
    return (
      <>
        {/* Placeholder for leadid_token when Jornaya is not configured */}
        <input type="hidden" id="leadid_token" name="leadid_token" value="" />
      </>
    );
  }

  return (
    <>
      {/* Jornaya LeadiD Script */}
      <Script
        id="jornaya-leadid"
        strategy="afterInteractive"
        src={`https://create.lidstatic.com/campaign/${API_CONFIG.jornayaCampaignId}.js?snippet_version=2`}
      />

      {/* LeadiD token input - will be populated by Jornaya script */}
      <input type="hidden" id="leadid_token" name="leadid_token" />
    </>
  );
}

/**
 * Jornaya TCPA Disclosure
 * Required disclosure text for TCPA compliance
 */
export function JornayaTCPADisclosure() {
  return (
    <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded">
      <p>
        By clicking the button above, I provide my electronic signature and express written
        consent to be contacted by Health Quote Hero and its{" "}
        <a href="/partners" className="underline">
          marketing partners
        </a>{" "}
        and licensed insurance agents at the telephone number and email address I provided,
        including by live agent, autodialer, pre-recorded or artificial voice message,
        text/SMS message, or email, regarding health insurance products. I understand that
        my consent is not a condition of purchasing any goods or services and that I may
        revoke my consent at any time. Message and data rates may apply. I have read and
        agree to the{" "}
        <a href="/terms" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
