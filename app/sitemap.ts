import { MetadataRoute } from "next";
import { getPagesIndex } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.healthquotehero.com";
  const pages = getPagesIndex();

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url:
      page.slug === "healthquotehero"
        ? baseUrl
        : `${baseUrl}/${page.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page.slug === "healthquotehero" ? 1 : 0.8,
  }));

  // Add home page explicitly
  const homeEntry: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  return [...homeEntry, ...pageEntries.filter((p) => p.url !== baseUrl)];
}
