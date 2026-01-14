import type { Metadata } from "next";
import MedicareContent from "@/components/pages/MedicareContent";
import { FAQSchema, WebPageSchema, InsuranceProductSchema } from "@/components/JsonLd";
import { medicareFaqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Medicare Plans 2026 | New $2,100 Drug Cap & Negotiated Prices",
  description:
    "What is Medicare and which plan is right for you? Compare $0 premium Medicare Advantage plans, Medigap, and Part D drug coverage. 2026 brings a new $2,100 out-of-pocket cap and 10 drugs with Medicare-negotiated prices. 234,000+ seniors helped.",
  keywords: [
    "Medicare",
    "Medicare Advantage",
    "Medicare Part C",
    "Medigap",
    "Medicare Supplement",
    "Medicare Part D",
    "Medicare Part B",
    "Medicare enrollment",
    "Medicare cost",
    "Medicare dental",
    "what is Medicare",
    "Medicare plans 2026",
    "Medicare Advantage vs Medigap",
    "$0 premium Medicare",
    "Medicare drug coverage",
    "Medicare Part D $2100 cap",
    "Medicare negotiated drug prices",
  ],
  alternates: {
    canonical: "/medicare",
  },
  openGraph: {
    title: "Medicare Plans 2026 | New $2,100 Drug Cap & Savings",
    description:
      "Compare Medicare Advantage, Medigap & Part D plans. 2026: $2,100 drug cap, 10 medications with negotiated prices. 234,000+ seniors helped. Free quotes.",
    url: "https://www.healthquotehero.com/medicare",
    type: "website",
    images: [
      {
        url: "/api/og?title=2026%20Medicare%20Plans&subtitle=New%20%242%2C100%20drug%20cap.%20%240%20premium%20plans%20available.&type=medicare",
        width: 1200,
        height: 630,
        alt: "Compare Medicare Plans 2026 - New Drug Savings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicare Plans 2026 | New $2,100 Drug Cap & Savings",
    description:
      "Compare Medicare Advantage, Medigap & Part D. 2026: $2,100 drug cap, negotiated prices. Free quotes from top carriers.",
    images: ["/api/og?title=2026%20Medicare%20Plans&subtitle=New%20%242%2C100%20drug%20cap.%20%240%20premium%20plans%20available.&type=medicare"],
  },
};

export default function MedicarePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <FAQSchema faqs={medicareFaqs} />
      <WebPageSchema
        name="Medicare Plans Comparison"
        description="Compare Medicare Advantage, Medigap, and Part D plans. Find $0 premium Medicare Advantage options and Medicare Supplement coverage."
        url="https://www.healthquotehero.com/medicare"
        breadcrumb={[
          { name: "Home", url: "https://www.healthquotehero.com" },
          { name: "Medicare", url: "https://www.healthquotehero.com/medicare" },
        ]}
      />
      <InsuranceProductSchema
        name="Medicare Plan Comparison Service"
        description="Compare and enroll in Medicare Advantage (Part C), Medigap supplements, and Part D drug coverage from carriers including Humana, UnitedHealthcare, Aetna, and Blue Cross Blue Shield."
        url="https://www.healthquotehero.com/medicare"
      />

      {/* Page Content */}
      <MedicareContent />
    </>
  );
}
