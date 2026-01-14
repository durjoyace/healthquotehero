// JSON-LD Structured Data Components for SEO

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

export function OrganizationSchema({
  name = "Health Quote Hero",
  url = "https://www.healthquotehero.com",
  logo = "https://www.healthquotehero.com/logo.png",
  description = "Health Quote Hero helps Americans find affordable health insurance and Medicare plans. Compare quotes from 75+ top insurance carriers including Aetna, UnitedHealthcare, Humana, and Blue Cross Blue Shield.",
  telephone = "+1-800-555-0123",
  sameAs = [],
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    telephone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone,
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
      areaServed: "US",
    },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  breadcrumb?: { name: string; url: string }[];
}

export function WebPageSchema({ name, description, url, breadcrumb }: WebPageSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Health Quote Hero",
      url: "https://www.healthquotehero.com",
    },
  };

  if (breadcrumb && breadcrumb.length > 0) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface InsuranceProductSchemaProps {
  name: string;
  description: string;
  provider?: string;
  url: string;
}

export function InsuranceProductSchema({ name, description, provider = "Health Quote Hero", url }: InsuranceProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Insurance Brokerage",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://www.healthquotehero.com",
    },
    url,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface AggregateRatingSchemaProps {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}

export function AggregateRatingSchema({
  itemName,
  ratingValue,
  reviewCount,
  bestRating = 5
}: AggregateRatingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating,
      reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
