"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Map of known paths to their display labels
const pathLabels: Record<string, string> = {
  "": "Home",
  "health-insurance": "Health Insurance",
  "medicare": "Medicare",
  "about": "About Us",
  "contact": "Contact",
  "privacy": "Privacy Policy",
  "terms": "Terms of Service",
  "thank-you": "Thank You",
};

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if not provided
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    const segments = pathname.split("/").filter(Boolean);

    const result: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const label = pathLabels[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      result.push({ label, href: currentPath });
    }

    return result;
  })();

  // Don't show breadcrumb on homepage
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={`py-3 ${className}`}>
      <ol
        className="flex items-center text-sm text-gray-600 flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li
              key={item.href}
              className="flex items-center"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {isLast ? (
                <span
                  className="text-gray-900 font-medium"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary-700 transition-colors no-underline"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// JSON-LD Breadcrumb schema for SEO
interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const baseUrl = "https://www.healthquotehero.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href === "/" ? baseUrl : `${baseUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
