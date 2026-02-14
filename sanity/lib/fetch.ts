import { client, isSanityConfigured } from "./client";

export interface SanityProduct {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  description: string;
  images: Array<{ asset: { _ref: string }; _key: string }>;
  category?: { name: string; slug: { current: string } };
  inStock: boolean;
  featured: boolean;
}

export interface SanityCategory {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
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
      _id, name, slug, price, description, images, inStock, featured,
      category-> { name, slug }
    }`
  );
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  return requireClient().fetch(
    `*[_type == "product" && featured == true] | order(_createdAt desc) [0...8] {
      _id, name, slug, price, description, images, inStock, featured,
      category-> { name, slug }
    }`
  );
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  return requireClient().fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, slug, price, description, images, inStock, featured,
      category-> { name, slug }
    }`,
    { slug }
  );
}

export async function getAllCategories(): Promise<SanityCategory[]> {
  return requireClient().fetch(
    `*[_type == "category"] | order(name asc) {
      _id, name, slug, description
    }`
  );
}

export async function getProductsByCategory(categorySlug: string): Promise<SanityProduct[]> {
  return requireClient().fetch(
    `*[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
      _id, name, slug, price, description, images, inStock, featured,
      category-> { name, slug }
    }`,
    { categorySlug }
  );
}
