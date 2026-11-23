import type { MetadataRoute } from "next";
import { collections } from "@/lib/collections";
import { products } from "@/lib/products";

const BASE_URL = "https://www.evseev.store";

const staticPages: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, priority: 1, changeFrequency: "weekly" },
  { url: `${BASE_URL}/catalog`, priority: 0.9, changeFrequency: "weekly" },
  { url: `${BASE_URL}/capsule`, priority: 0.9, changeFrequency: "weekly" },
  { url: `${BASE_URL}/collections`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/education`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE_URL}/contacts`, priority: 0.5, changeFrequency: "yearly" },
  { url: `${BASE_URL}/manifest`, priority: 0.4, changeFrequency: "yearly" },
  { url: `${BASE_URL}/creativity`, priority: 0.4, changeFrequency: "monthly" },
  { url: `${BASE_URL}/offer`, priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => !product.hidden)
    .map((product) => ({
      url: `${BASE_URL}/catalog/${product.id}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const collectionPages: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${BASE_URL}${collection.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...collectionPages, ...productPages];
}
