import { MetadataRoute } from "next";
import { getPagesIndex } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.healthquotehero.com";
  const pages = getPagesIndex();

  // Core pages with high priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/health-insurance`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/medicare`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
  ];

  // Dynamic content pages
  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) =>
      page.slug !== "healthquotehero" &&
      page.slug !== "health-insurance" &&
      page.slug !== "medicare"
    )
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...corePages, ...pageEntries];
}
