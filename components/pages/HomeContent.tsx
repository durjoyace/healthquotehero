"use client";

import Link from "next/link";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { StatsGrid } from "@/components/StatsCounter";
import { TestimonialGrid, homepageTestimonials } from "@/components/TestimonialCard";
import { LogoBar, TrustBadges, TrustStrip } from "@/components/LogoBar";

const stats = [
  { end: 847392, suffix: "+", label: "Quotes Delivered" },
  { end: 687, prefix: "$", suffix: "", label: "Avg. 2026 Monthly Cost*" },
  { end: 75, suffix: "+", label: "Insurance Partners" },
  { end: 2, suffix: " min", label: "Quote Time" },
];

const conditions = [
  {
    title: "Diabetes",
    description:
      "Find plans covering insulin (Medicare now has negotiated prices on Jardiance, Farxiga, Januvia), testing supplies, and management programs.",
    icon: "heart",
  },
  {
    title: "High Blood Pressure",
    description:
      "Get coverage for medications, monitoring devices, and regular check-ups. Many plans cover preventive care at no cost.",
    icon: "activity",
  },
  {
    title: "Blood Clots/Stroke Risk",
    description:
      "Plans covering Eliquis and Xarelto - both now have Medicare-negotiated prices in 2026, saving up to 56%.",
    icon: "heart",
  },
  {
    title: "Heart Disease",
    description:
      "Coverage for cardiac care, Entresto (now Medicare-negotiated), and rehabilitation programs.",
    icon: "heart",
  },
  {
    title: "Autoimmune Conditions",
    description:
      "Plans covering Enbrel and Stelara (both Medicare-negotiated in 2026), plus specialist visits.",
    icon: "pill",
  },
  {
    title: "COPD & Respiratory",
    description:
      "Coverage for oxygen therapy, pulmonary rehab, and respiratory medications.",
    icon: "lungs",
  },
];

const features = [
  {
    title: "Navigate 2026 Subsidy Changes",
    description: "Enhanced ACA subsidies expired. We help you understand the 400% FPL income limits ($62,600 single) and find every tax credit you still qualify for.",
    iconColor: "orange",
  },
  {
    title: "Compare 75+ Insurance Carriers",
    description: "Search 2026 plans from Aetna, Blue Cross, Cigna, UnitedHealthcare, Humana, Ambetter - with real-time pricing for your specific situation.",
    iconColor: "primary",
  },
  {
    title: "Expert Medicare Guidance",
    description: "Part B is $202.90/month in 2026, Part D has a new $2,100 drug cap, and 10 drugs have negotiated prices. Our agents explain what it means for you.",
    iconColor: "primary",
  },
];

export default function HomeContent() {
  return (
    <>
      {/* Hero Section - Premium */}
      <section className="hero-gradient-animated text-white py-20 md:py-32 relative overflow-hidden">
        {/* Floating decorative shapes */}
        <div className="hero-shape w-96 h-96 bg-white -top-48 -right-48" />
        <div className="hero-shape w-64 h-64 bg-orange-400 bottom-0 left-1/4" />
        <div className="hero-shape w-48 h-48 bg-primary-400 top-1/3 right-1/4" />

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <AnimateOnScroll animation="fade-in" className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                <span className="pulse-dot" />
                <span>2026 Plans Available • Subsidy Changes Explained</span>
              </div>
            </AnimateOnScroll>

            {/* Main Headline */}
            <AnimateOnScroll delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 tracking-tight">
                2026 Health Insurance
                <br />
                <span className="text-gradient">&amp; Medicare Guide</span>
              </h1>
            </AnimateOnScroll>

            {/* Subheadline */}
            <AnimateOnScroll delay={200}>
              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl mx-auto">
                Average 2026 plan: <span className="font-bold text-orange-400 text-3xl">$687/mo</span> • Medicare Part B: <span className="font-bold text-orange-400 text-3xl">$203/mo</span>
              </p>
              <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
                ACA subsidies changed in 2026. Medicare has new drug price savings. We&apos;ll help you understand what it means for your coverage and costs.
              </p>
            </AnimateOnScroll>

            {/* CTA Buttons */}
            <AnimateOnScroll delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/health-insurance" className="btn btn-primary btn-lg no-underline">
                  Get Health Insurance Quote
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link href="/medicare" className="btn btn-outline btn-lg no-underline">
                  Explore Medicare Options
                </Link>
              </div>
            </AnimateOnScroll>

            {/* Trust Badges in Hero */}
            <AnimateOnScroll delay={400}>
              <TrustStrip variant="dark" />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Logo Bar / Partners */}
      <section className="section-sm border-b border-gray-100">
        <div className="container">
          <AnimateOnScroll>
            <LogoBar />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-sm bg-primary-900">
        <div className="container">
          <StatsGrid stats={stats} variant="white" />
        </div>
      </section>

      {/* Health Conditions Section */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <span className="badge badge-primary mb-4">Affordable Care Act</span>
            <h2 className="text-gray-900">
              Health Insurance for Pre-Existing Conditions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0">
              Under the ACA (Obamacare), marketplace health insurance plans cannot deny coverage
              or charge more based on your health history. Get affordable health coverage today.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition) => (
              <StaggerItem key={condition.title}>
                <div className="card-gray card-hover h-full">
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                    {condition.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-0">
                    {condition.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Features Section */}
      <section className="section section-gray">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <span className="badge badge-primary mb-4">Health Insurance Marketplace</span>
            <h2 className="text-gray-900">
              How to Get Health Insurance That Fits Your Budget
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0">
              Wondering how much health insurance costs? We help you understand deductibles, premiums, and
              out-of-pocket maximums to find affordable health plans that work for you.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <div className="card-premium card-premium-hover text-center h-full">
                  <div
                    className={`${
                      feature.iconColor === "orange" ? "icon-box-orange" : "icon-box"
                    } mx-auto mb-6`}
                  >
                    <svg
                      className={`w-8 h-8 ${
                        feature.iconColor === "orange"
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                      {index === 1 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-0">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <span className="badge badge-orange mb-4">Real Results</span>
            <h2 className="text-gray-900">
              Our Customers Save Thousands
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0">
              Don&apos;t just take our word for it. Here&apos;s what real customers say about their experience
              and savings with Health Quote Hero.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <TestimonialGrid testimonials={homepageTestimonials} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-sm border-t border-gray-100">
        <div className="container">
          <AnimateOnScroll>
            <TrustBadges className="mb-0" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll>
            <div className="bg-primary-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <span className="inline-block px-4 py-1.5 bg-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-6">
                  2026 Plans Now Available
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                  Get Affordable Health Insurance Quotes
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  How much is health insurance? Find out in minutes. Compare cheap health insurance
                  plans from the marketplace. No spam calls. No obligation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/health-insurance" className="btn btn-primary btn-lg no-underline">
                    Get Your Free Quote
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <a href="tel:1-800-555-0123" className="btn btn-outline btn-lg no-underline">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call 1-800-555-0123
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
