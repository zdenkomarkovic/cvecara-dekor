import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { SITE_URL } from "@/lib/constants";
import ProductPageClient from "@/components/shop/ProductPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) return {};

    const ogImageUrl =
      product.images?.[0]
        ? urlFor(product.images[0]).width(1200).height(630).fit("crop").url()
        : undefined;

    const description = product.description
      ? `${product.description.slice(0, 140)} – Cvećara Dekor Kragujevac`
      : `${product.name} – cveće i aranžmani u Cvećari Dekor, Kragujevac. Dostava na teritoriji Kragujevca.`;

    return {
      title: product.name,
      description,
      alternates: {
        canonical: `${SITE_URL}/prodavnica/${slug}`,
      },
      openGraph: {
        title: `${product.name} | Cvećara Dekor`,
        description,
        url: `${SITE_URL}/prodavnica/${slug}`,
        images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: product.name }] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function ProizvodPage({ params }: PageProps) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  if (!product) notFound();

  return <ProductPageClient product={product} />;
}
