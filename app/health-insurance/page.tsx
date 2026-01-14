import { Metadata } from "next";
import { HealthInsuranceForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Health Insurance Quotes",
  description:
    "Get free health insurance quotes in minutes. Compare plans from top providers and find affordable coverage for you and your family.",
  alternates: {
    canonical: "/health-insurance/",
  },
  openGraph: {
    title: "Health Insurance Quotes - Health Quote Hero",
    description: "Compare health insurance plans and find affordable coverage.",
    type: "website",
  },
};

export default function HealthInsurancePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Find Affordable Health Insurance
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Compare plans from top insurance providers and get personalized quotes in
            minutes. No obligation, 100% free.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <HealthInsuranceForm initialStep={1} />

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Get Health Insurance Through Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <h3 className="font-semibold mb-2">Save Money</h3>
              <p className="text-gray-600 text-sm">
                Compare multiple quotes to find the best rates for your budget
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <h3 className="font-semibold mb-2">Quality Coverage</h3>
              <p className="text-gray-600 text-sm">
                Access plans from top-rated insurance companies nationwide
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Expert Help</h3>
              <p className="text-gray-600 text-sm">
                Licensed agents ready to help you find the right plan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg p-4 shadow-sm">
              <summary className="font-semibold cursor-pointer">
                How does the quote process work?
              </summary>
              <p className="mt-3 text-gray-600">
                Simply fill out our quick form with basic information about yourself and
                your coverage needs. We&apos;ll match you with licensed insurance agents
                who will provide personalized quotes from multiple carriers.
              </p>
            </details>
            <details className="bg-white rounded-lg p-4 shadow-sm">
              <summary className="font-semibold cursor-pointer">
                Is my information secure?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes, we use industry-standard encryption to protect your personal
                information. We only share your details with licensed insurance
                professionals.
              </p>
            </details>
            <details className="bg-white rounded-lg p-4 shadow-sm">
              <summary className="font-semibold cursor-pointer">
                Am I obligated to purchase a plan?
              </summary>
              <p className="mt-3 text-gray-600">
                No, there&apos;s no obligation. Getting quotes is completely free and
                you&apos;re under no pressure to buy. Compare your options and decide
                what&apos;s best for you.
              </p>
            </details>
            <details className="bg-white rounded-lg p-4 shadow-sm">
              <summary className="font-semibold cursor-pointer">
                What if I have a pre-existing condition?
              </summary>
              <p className="mt-3 text-gray-600">
                Under the Affordable Care Act, insurance companies cannot deny coverage or
                charge higher premiums based on pre-existing conditions for ACA-compliant
                plans.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
