import type { MetadataRoute } from "next";
import { baseUrl } from "@/content/entreprise";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La seule route dynamique du site n'a rien à indexer.
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
