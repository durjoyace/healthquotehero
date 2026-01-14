"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { InsuranceOffer } from "@/lib/types/forms";

function ThankYouContent() {
  const searchParams = useSearchParams();

  const [offers, setOffers] = useState<InsuranceOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const type = searchParams.get("type") || "health";
  const arrivalId = searchParams.get("arrivalId") || "";
  const city = searchParams.get("city") || "Your City";
  const state = searchParams.get("state") || "Your State";

  // Fetch offers on mount
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          `/api/lead/offers?arrivalId=${arrivalId}&type=${type}`
        );
        const data = await response.json();
        if (data.success) {
          setOffers(data.offers);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [arrivalId, type]);

  const isHealth = type === "health";
  const title = isHealth ? "Health Insurance" : "Medicare";

  return (
    <div className="min-h-[80vh] py-12 bg-gray-50">
      <div className="container max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thank You for Your Submission!
          </h1>
          <p className="text-lg text-gray-600">
            Insurance professionals will be reaching out to you shortly.
          </p>
          <p className="text-xl font-semibold text-primary-600 mt-4">
            We matched you with top {title.toLowerCase()} companies in {city}, {state}
          </p>
        </div>

        {/* Offers Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-center mb-2">
            Click 2-3 companies below to compare rates
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Get personalized quotes from top-rated insurance providers
          </p>

          {loading ? (
            <div className="flex justify-center py-12" role="status" aria-label="Loading offers">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-gray-500">
              <p>Unable to load offers. Our team will contact you with personalized quotes shortly.</p>
            </div>
          ) : offers.length > 0 ? (
            <div className="space-y-4">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Our team will contact you with personalized quotes shortly.</p>
            </div>
          )}
        </div>

        {/* What to Expect */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-lg mb-4">What Happens Next?</h3>
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold mr-3" aria-hidden="true">
                1
              </span>
              <span className="text-gray-600">
                Licensed insurance agents will review your information
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold mr-3" aria-hidden="true">
                2
              </span>
              <span className="text-gray-600">
                You&apos;ll receive calls with personalized plan options
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold mr-3" aria-hidden="true">
                3
              </span>
              <span className="text-gray-600">
                Compare quotes and choose the best coverage for your needs
              </span>
            </li>
          </ol>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            &larr; Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Offer Card Component with safe image handling
function OfferCard({ offer }: { offer: InsuranceOffer }) {
  const isClickToCall = offer.adtype === "click_to_call";
  const [imageError, setImageError] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Logo */}
        <div className="p-4 flex items-center justify-center md:w-48 bg-gray-50">
          <div className="w-32 h-16 bg-white rounded flex items-center justify-center p-2">
            {offer.logoURL && !imageError ? (
              <Image
                src={offer.logoURL}
                alt={`${offer.company} logo`}
                width={128}
                height={64}
                className="max-w-full max-h-full object-contain"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              <span className="text-sm font-bold text-gray-700">{offer.company}</span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 p-4">
          <h3 className="font-bold text-lg text-gray-900">{offer.headline}</h3>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            {offer.descriptionLines.map((line, idx) => (
              <li key={idx} className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="p-4 flex flex-col items-center justify-center bg-gray-50 md:w-48">
          {offer.monthlyCost && (
            <div className="text-center mb-2">
              <span className="text-2xl font-bold text-primary-600">
                ${offer.monthlyCost}
              </span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
          )}
          {isClickToCall && offer.actionLink ? (
            <a
              href={`tel:${offer.actionLink.split(":")[1]}`}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors"
            >
              Call Now
            </a>
          ) : (
            <a
              href={offer.clickURL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors"
            >
              Get Quote
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center" role="status" aria-label="Loading page">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );
}

// Main page component with Suspense
export default function ThankYouPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ThankYouContent />
    </Suspense>
  );
}
