import type { Metadata } from "next";
import HomeContent from "@/components/pages/HomeContent";
import { WebPageSchema, AggregateRatingSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Find Affordable Health Insurance | Compare Plans & Save $350/Month | Health Quote Hero",
  description:
    "Compare affordable health insurance plans from Aetna, UnitedHealthcare, Humana, Blue Cross, Ambetter & 75+ carriers. How much is health insurance per month? As low as $50/month with ACA subsidies. Get free quotes in 2 minutes.",
  keywords: [
    "affordable health insurance",
    "health insurance marketplace",
    "cheap health insurance",
    "health insurance quotes",
    "compare health insurance",
    "ACA health insurance",
    "Obamacare plans",
    "health insurance cost",
    "Medicare plans",
    "health insurance companies",
    "individual health insurance",
    "family health insurance",
    "health insurance with pre-existing conditions",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Find Affordable Health Insurance | Save $350/Month",
    description:
      "Compare health insurance plans from 75+ carriers. Save an average of $350/month. Free quotes, licensed agents, no obligation.",
    url: "https://www.healthquotehero.com",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Health Quote Hero - Find Affordable Health Insurance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affordable Health Insurance | Save $350/Month | Health Quote Hero",
    description:
      "Compare plans from Aetna, UnitedHealthcare, Humana & 75+ carriers. Get free quotes in minutes.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <WebPageSchema
        name="Health Quote Hero - Affordable Health Insurance Comparison"
        description="Compare affordable health insurance plans from 75+ top carriers including Aetna, UnitedHealthcare, Humana, and Blue Cross Blue Shield. Get free quotes and save an average of $350/month."
        url="https://www.healthquotehero.com"
      />
      <AggregateRatingSchema
        itemName="Health Quote Hero"
        ratingValue={4.9}
        reviewCount={12847}
      />

      {/* Page Content */}
      <HomeContent />
    </>
  );
}
