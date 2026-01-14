import { Metadata } from "next";
import { MedicareForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Medicare Insurance Quotes",
  description:
    "Get free Medicare quotes in minutes. Compare Medicare Advantage, Supplement, and Part D plans from top providers.",
  alternates: {
    canonical: "/medicare/",
  },
  openGraph: {
    title: "Medicare Insurance Quotes - Health Quote Hero",
    description: "Compare Medicare plans and find the right coverage for you.",
    type: "website",
  },
};

export default function MedicarePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Find the Right Medicare Plan
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Compare Medicare Advantage, Supplement, and Part D plans from top
            providers. Get personalized quotes in minutes.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <MedicareForm initialStep={1} />

      {/* Medicare Types Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10">
            Types of Medicare Coverage
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Medicare Advantage</h3>
              <p className="text-gray-600 text-sm">
                All-in-one plans that combine Parts A, B, and often D. May include
                extra benefits like vision, dental, and hearing.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Medicare Supplement</h3>
              <p className="text-gray-600 text-sm">
                Also known as Medigap, these plans help pay for costs Original
                Medicare doesn&apos;t cover, like copays and deductibles.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Part D (Prescription)</h3>
              <p className="text-gray-600 text-sm">
                Prescription drug coverage that helps lower medication costs. Can
                be added to Original Medicare or Medicare Supplement plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Compare Medicare Plans With Us?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">$0 Premium Plans</h3>
              <p className="text-gray-600 text-sm">
                Many Medicare Advantage plans available with no monthly premium
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Licensed Agents</h3>
              <p className="text-gray-600 text-sm">
                Expert Medicare specialists ready to answer your questions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Plan Comparison</h3>
              <p className="text-gray-600 text-sm">
                Compare benefits, costs, and coverage side-by-side
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Fast & Free</h3>
              <p className="text-gray-600 text-sm">
                Get quotes in minutes with no obligation to enroll
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-10">
            Medicare FAQs
          </h2>
          <div className="space-y-4">
            <details className="bg-gray-50 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                When can I enroll in Medicare?
              </summary>
              <p className="mt-3 text-gray-600">
                Your Initial Enrollment Period begins 3 months before you turn 65
                and ends 3 months after your birthday month. You can also enroll
                during the Annual Enrollment Period (October 15 - December 7) or
                Special Enrollment Periods if you qualify.
              </p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                What&apos;s the difference between Medicare Advantage and Medigap?
              </summary>
              <p className="mt-3 text-gray-600">
                Medicare Advantage (Part C) replaces Original Medicare and often
                includes additional benefits. Medigap (Medicare Supplement) works
                alongside Original Medicare to help cover out-of-pocket costs like
                copays and deductibles.
              </p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                Do I need Part D if I have Medicare Advantage?
              </summary>
              <p className="mt-3 text-gray-600">
                Most Medicare Advantage plans include prescription drug coverage
                (Part D). If yours doesn&apos;t, you can add a standalone Part D plan.
                If you have Original Medicare with Medigap, you&apos;ll likely want to
                add Part D for drug coverage.
              </p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                Are there really $0 premium Medicare plans?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes! Many Medicare Advantage plans offer $0 monthly premiums (you
                still pay your Part B premium). These plans may have different
                copays, deductibles, and provider networks, so it&apos;s important to
                compare total costs.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
