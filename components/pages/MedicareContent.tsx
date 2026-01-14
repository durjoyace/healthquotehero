"use client";

import { MedicareForm } from "@/components/forms";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { StatsGrid } from "@/components/StatsCounter";
import { TrustStrip, TrustBadges } from "@/components/LogoBar";
import { TestimonialGrid, medicareTestimonials } from "@/components/TestimonialCard";
import { medicareFaqs } from "@/lib/faq-data";
import {
  SourceCitation,
  LastUpdated,
  MedicalDisclaimer,
  ExternalResources,
  medicareSources,
  medicareResources,
} from "@/components/SourceCitation";
import { MedicareCostSection } from "@/components/CostComparisonTable";
import { Breadcrumb } from "@/components/Breadcrumb";

const stats = [
  { end: 234000, suffix: "+", label: "Medicare Enrollees Helped" },
  { end: 203, prefix: "$", suffix: "", label: "2026 Part B Premium" },
  { end: 2100, prefix: "$", suffix: "", label: "2026 Part D Drug Cap" },
  { end: 10, suffix: "", label: "Drugs with Negotiated Prices" },
];

const medicareTypes = [
  {
    title: "Medicare Advantage (Part C) - 2026",
    description:
      "In 2026, Medicare Advantage plans have a lower max out-of-pocket ($9,250 vs $9,350 in 2025). New this year: required behavioral health parity with Original Medicare, and a special enrollment period if your plan's provider directory was wrong.",
    iconColor: "primary",
  },
  {
    title: "Medicare Supplement (Medigap)",
    description:
      "Medigap fills the \"gaps\" in Original Medicare - covering the 20% that Part B doesn't pay, plus the $283 deductible (2026). Plan G and Plan N remain most popular. See any doctor who accepts Medicare nationwide with no network restrictions.",
    iconColor: "orange",
  },
  {
    title: "Medicare Part D - Major 2026 Changes",
    description:
      "Big news for 2026: $2,100 annual out-of-pocket cap (pay $0 after that), no more donut hole, and 10 drugs now have Medicare-negotiated prices (Eliquis, Jardiance, Januvia, and more) with savings up to 79%. The Medicare Prescription Payment Plan auto-renews.",
    iconColor: "primary",
  },
];

const benefits = [
  {
    title: "$0 Premium Plans Still Available",
    description: "Many Medicare Advantage plans still offer $0 premiums in 2026, beyond what you pay for Part B ($202.90/month)",
    iconColor: "orange",
  },
  {
    title: "AHIP-Certified Agents",
    description: "Our specialists complete 2026 AHIP certification and understand the new Part D rules, negotiated drug prices, and enrollment options",
    iconColor: "primary",
  },
  {
    title: "2026 Drug Cost Analysis",
    description: "We check if your medications are among the 10 with negotiated prices and find your lowest total cost under the new $2,100 cap",
    iconColor: "primary",
  },
  {
    title: "Directory Accuracy Check",
    description: "New 2026 protection: if a plan's directory was wrong about your doctor, you qualify for a special enrollment period to switch",
    iconColor: "orange",
  },
];

export default function MedicareContent() {
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
              <span className="badge badge-white">2026 Plans • New Drug Price Savings</span>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                2026 Medicare Plans: New Benefits &amp; Drug Savings
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
                Major 2026 changes: Part B is now <span className="font-bold text-orange-400">$202.90/month</span>, Part D has a <span className="font-bold text-orange-400">$2,100 out-of-pocket cap</span>, and 10 drugs have Medicare-negotiated prices with savings up to 79%.
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
      <MedicareForm initialStep={1} />

      {/* Medicare Types Section */}
      <section className="section section-gray">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <span className="badge badge-primary mb-4">Medicare Parts Explained</span>
            <h2 className="text-gray-900">
              Medicare Part C vs Medigap: Which is Better?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0">
              Understand the difference between Medicare Advantage and Medicare Supplement plans.
              We help you compare what Medicare covers and find the best fit for your needs.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {medicareTypes.map((type, index) => (
              <StaggerItem key={type.title}>
                <div className="card-premium card-premium-hover h-full">
                  <div
                    className={`${
                      type.iconColor === "orange" ? "icon-box-orange" : "icon-box"
                    } mb-6`}
                  >
                    <svg
                      className={`w-8 h-8 ${
                        type.iconColor === "orange"
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      )}
                      {index === 1 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      )}
                      {index === 2 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      )}
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 mb-0">{type.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <h2 className="text-gray-900">
              Why Compare Medicare Plans With Us?
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <StaggerItem key={benefit.title}>
                <div className="text-center">
                  <div
                    className={`${
                      benefit.iconColor === "orange" ? "icon-box-orange" : "icon-box"
                    } mx-auto mb-4`}
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      )}
                      {index === 2 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      )}
                      {index === 3 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm mb-0">{benefit.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Cost & Drug Price Section */}
      <MedicareCostSection />

      {/* Testimonials Section */}
      <section className="section section-gray">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <span className="badge badge-orange mb-4">Real Stories</span>
            <h2 className="text-gray-900">
              What Our Medicare Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0">
              See how we&apos;ve helped seniors across the country navigate Medicare
              and find plans that save them money.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <TestimonialGrid testimonials={medicareTestimonials} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-sm border-t border-b border-gray-100 bg-white">
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
            <h2 className="text-gray-900">Medicare Questions Answered</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-0">
              Get clear answers to the most common Medicare questions we hear.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="space-y-4">
            {medicareFaqs.map((faq) => (
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
              Official Medicare Resources
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-0">
              Verify information and explore additional resources from official government sources.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <ExternalResources resources={medicareResources} title="Official Medicare Resources" />
          </AnimateOnScroll>

          {/* Sources & Last Updated */}
          <div className="mt-8 space-y-4">
            <SourceCitation sources={medicareSources} />
            <LastUpdated date="January 14, 2026" />
          </div>
        </div>
      </section>
    </>
  );
}
