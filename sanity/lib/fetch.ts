import { client, isSanityConfigured } from "./client";

export interface SanityProduct {
  _id: string;
  _updatedAt: string;
  name: string;
  slug: { current: string };
  price?: number | null;
  description: string;
  images: Array<{ asset: { _ref: string }; _key: string }>;
  inStock: boolean;
  featured: boolean;
}

function requireClient() {
  if (!isSanityConfigured || !client) {
    throw new Error("Sanity nije konfigurisan. Dodajte NEXT_PUBLIC_SANITY_PROJECT_ID u .env.local");
  }
  return client;
}

export async function getAllProducts(): Promise<SanityProduct[]> {
  return requireClient().fetch(
    `*[_type == "product"] | order(_createdAt desc) {
      _id, _updatedAt, name, slug, price, description, images, inStock, featured
    }`
  );
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  return requireClient().fetch(
    `*[_type == "product" && featured == true] | order(_createdAt desc) [0...8] {
      _id, _updatedAt, name, slug, price, description, images, inStock, featured
    }`
  );
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  return requireClient().fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, _updatedAt, name, slug, price, description, images, inStock, featured
    }`,
    { slug }
  );
}
