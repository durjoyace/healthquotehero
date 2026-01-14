import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/uploads/.tmb/"],
      },
    ],
    sitemap: "https://www.healthquotehero.com/sitemap.xml",
  };
}
