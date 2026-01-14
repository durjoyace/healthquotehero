import type { Metadata } from "next";
import HealthInsuranceContent from "@/components/pages/HealthInsuranceContent";
import { FAQSchema, WebPageSchema, InsuranceProductSchema } from "@/components/JsonLd";
import { healthInsuranceFaqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Affordable Health Insurance Plans 2026 | Compare & Save $350/Month",
  description:
    "How much is health insurance per month? Find cheap health insurance starting at $50/month with ACA subsidies. Compare plans from Aetna, UnitedHealthcare, Humana, Blue Cross, Ambetter & 75+ carriers. Free quotes in 2 minutes.",
  keywords: [
    "affordable health insurance",
    "cheap health insurance",
    "health insurance cost",
    "how much is health insurance",
    "health insurance marketplace",
    "ACA health insurance",
    "Obamacare plans",
    "individual health insurance",
    "family health insurance",
    "health insurance quotes",
    "compare health insurance",
    "health insurance deductible",
    "PPO health insurance",
    "HMO health insurance",
    "open enrollment 2026",
    "2026 health insurance subsidies",
  ],
  alternates: {
    canonical: "/health-insurance",
  },
  openGraph: {
    title: "2026 Affordable Health Insurance Plans | Save $350/Month",
    description:
      "Find cheap health insurance from $50/month with 2026 subsidies. Compare Aetna, UnitedHealthcare, Humana & 75+ carriers. Free quotes, no obligation.",
    url: "https://www.healthquotehero.com/health-insurance",
    type: "website",
    images: [
      {
        url: "/api/og?title=2026%20Health%20Insurance%20Plans&subtitle=Compare%2075%2B%20carriers.%20As%20low%20as%20%2450%2Fmonth%20with%20subsidies.&type=health",
        width: 1200,
        height: 630,
        alt: "Compare Affordable Health Insurance Plans 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 Affordable Health Insurance Plans | Save $350/Month",
    description:
      "Find cheap health insurance from $50/month with 2026 subsidies. Compare 75+ top carriers. Free quotes in 2 minutes.",
    images: ["/api/og?title=2026%20Health%20Insurance%20Plans&subtitle=Compare%2075%2B%20carriers.%20As%20low%20as%20%2450%2Fmonth%20with%20subsidies.&type=health"],
  },
};

export default function HealthInsurancePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <FAQSchema faqs={healthInsuranceFaqs} />
      <WebPageSchema
        name="Affordable Health Insurance Plans"
        description="Compare affordable health insurance plans from 75+ top carriers. Find cheap health insurance starting at $50/month with ACA subsidies."
        url="https://www.healthquotehero.com/health-insurance"
        breadcrumb={[
          { name: "Home", url: "https://www.healthquotehero.com" },
          { name: "Health Insurance", url: "https://www.healthquotehero.com/health-insurance" },
        ]}
      />
      <InsuranceProductSchema
        name="Health Insurance Comparison Service"
        description="Compare and purchase affordable health insurance plans from 75+ carriers including Aetna, UnitedHealthcare, Humana, and Blue Cross Blue Shield. Find ACA marketplace plans with subsidies."
        url="https://www.healthquotehero.com/health-insurance"
      />

      {/* Page Content */}
      <HealthInsuranceContent />
    </>
  );
}
