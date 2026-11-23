import type { MetadataRoute } from "next";

const BASE_URL = "https://www.evseev.store";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/cart", "/checkout", "/likes", "/success"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
