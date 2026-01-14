"use client";

import { HealthInsuranceForm } from "@/components/forms";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { StatsGrid } from "@/components/StatsCounter";
import { TrustStrip, TrustBadges } from "@/components/LogoBar";
import { TestimonialGrid, healthInsuranceTestimonials } from "@/components/TestimonialCard";
import { healthInsuranceFaqs } from "@/lib/faq-data";
import {
  SourceCitation,
  LastUpdated,
  MedicalDisclaimer,
  ExternalResources,
  healthInsuranceSources,
  healthInsuranceResources,
} from "@/components/SourceCitation";
import { HealthInsuranceCostSection } from "@/components/CostComparisonTable";
import { Breadcrumb } from "@/components/Breadcrumb";

const stats = [
  { end: 4200, prefix: "$", suffix: "", label: "Avg. Annual Savings" },
  { end: 75, suffix: "+", label: "Insurance Carriers" },
  { end: 687, prefix: "$", suffix: "", label: "Avg. Monthly Premium*" },
  { end: 98, suffix: "%", label: "Customer Satisfaction" },
];

const benefits = [
  {
    title: "Navigate the 2026 Subsidy Changes",
    description: "Enhanced ACA subsidies expired in 2025. We help you understand the new 400% FPL income limits ($62,600 single, $128,600 family of 4) and find every tax credit you still qualify for.",
    iconColor: "orange",
  },
  {
    title: "Compare 75+ Health Insurance Companies",
    description: "Search 2026 plans from Aetna, Blue Cross, Cigna, Humana, UnitedHealthcare, Ambetter, Oscar Health, Molina, and more - all side-by-side with real-time pricing.",
    iconColor: "primary",
  },
  {
    title: "Expert Guidance on Plan Types",
    description: "HMO ($562/mo avg) vs PPO ($680/mo avg)? High deductible with HSA? Our licensed agents explain 2026 plan options and help you balance premium costs with coverage needs.",
    iconColor: "primary",
  },
];

export default function HealthInsuranceContent() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container">
          <Breadcrumb />
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-gradient-animated text-white py-16 md:py-24 relative overflow-hidden">
        {/* Floating decorative shapes */}
        <div className="hero-shape w-72 h-72 bg-white -top-36 -right-36" />
        <div className="hero-shape w-48 h-48 bg-orange-400 bottom-0 left-1/4" />

        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-in" className="mb-4">
              <span className="badge badge-white">2026 Plans • Updated Subsidy Info</span>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                2026 Health Insurance Plans &amp; Subsidy Guide
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
                Average 2026 cost: <span className="font-bold text-orange-400">$687/month</span> (Silver plan). With subsidies, eligible enrollees pay as low as <span className="font-bold text-orange-400">$50/month</span>. The 400% FPL subsidy cliff is back - we&apos;ll help you navigate it.
              </p>
              <TrustStrip variant="dark" />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="section-sm bg-gray-50 border-b border-gray-100">
        <div className="container">
          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* Form Section */}
      <HealthInsuranceForm initialStep={1} />

      {/* Benefits Section */}
      <section className="section section-gray">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <span className="badge badge-primary mb-4">Health Insurance Marketplace</span>
            <h2 className="text-gray-900">
              How to Get Affordable Health Insurance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0">
              Wondering how much health insurance costs? We compare affordable health plans
              from the marketplace so you don&apos;t have to spend hours on healthcare.gov.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <StaggerItem key={benefit.title}>
                <div className="card-premium card-premium-hover text-center h-full">
                  <div
                    className={`${
                      benefit.iconColor === "orange" ? "icon-box-orange" : "icon-box"
                    } mx-auto mb-6`}
                  >
                    <svg
                      className={`w-8 h-8 ${
                        benefit.iconColor === "orange"
                          ? "text-orange-500"
                          : "text-primary-900"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {index === 0 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                      {index === 1 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      )}
                      {index === 2 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-0">{benefit.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Cost Comparison Section */}
      <HealthInsuranceCostSection />

      {/* Testimonials Section */}
      <section className="section section-gray">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <span className="badge badge-orange mb-4">Real Savings</span>
            <h2 className="text-gray-900">
              See What Our Customers Are Saving
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0">
              These are real results from real people who found better coverage at lower prices.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <TestimonialGrid testimonials={healthInsuranceTestimonials} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-sm border-t border-b border-gray-100">
        <div className="container">
          <AnimateOnScroll>
            <TrustBadges />
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container max-w-3xl">
          <AnimateOnScroll className="text-center mb-12">
            <span className="badge badge-primary mb-4">Common Questions</span>
            <h2 className="text-gray-900">
              Your Questions, Answered
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-0">
              Everything you need to know about getting health insurance through Health Quote Hero.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="space-y-4">
            {healthInsuranceFaqs.map((faq) => (
              <StaggerItem key={faq.question}>
                <details>
                  <summary>{faq.question}</summary>
                  <div className="mt-0 px-6 pb-6">
                    <p className="text-gray-600 mb-2">{faq.answer}</p>
                    {faq.source && (
                      <p className="text-sm text-gray-500 mb-0">
                        Source:{" "}
                        <a
                          href={faq.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-700 hover:text-primary-900 underline"
                        >
                          {faq.source.name}
                        </a>
                      </p>
                    )}
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Medical Disclaimer */}
          <AnimateOnScroll className="mt-12">
            <MedicalDisclaimer />
          </AnimateOnScroll>
        </div>
      </section>

      {/* External Resources Section */}
      <section className="section section-gray">
        <div className="container max-w-4xl">
          <AnimateOnScroll className="text-center mb-10">
            <h2 className="text-gray-900 text-2xl">
              Official Health Insurance Resources
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-0">
              Verify information and explore additional resources from official government sources.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <ExternalResources resources={healthInsuranceResources} />
          </AnimateOnScroll>

          {/* Sources & Last Updated */}
          <div className="mt-8 space-y-4">
            <SourceCitation sources={healthInsuranceSources} />
            <LastUpdated date="January 14, 2026" />
          </div>
        </div>
      </section>
    </>
  );
}
