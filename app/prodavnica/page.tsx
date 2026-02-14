import type { Metadata } from "next";
import {
  getAllProducts,
  getAllCategories,
  type SanityProduct,
  type SanityCategory,
} from "@/sanity/lib/fetch";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prodavnica",
  description:
    "Pogledajte našu kompletnu ponudu – bukveti, aranžmani, dekoracije i pokloni. Dostava na teritoriji Kragujevca.",
};

interface SearchParams {
  kategorija?: string;
}

export default async function ProdavnicaPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { kategorija } = await searchParams;

  let products: SanityProduct[] = [];
  let categories: SanityCategory[] = [];

  try {
    [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);
  } catch {
    // Sanity nije konfigurisan
  }

  const filtered = kategorija
    ? products.filter((p) => p.category?.slug?.current === kategorija)
    : products;

  return (
    <div style={{ minHeight: "60vh" }}>
      {/* Page header */}
      <div
        style={{
          backgroundColor: "var(--color-rose-pale)",
          padding: "4rem 1.5rem 3rem",
          textAlign: "center",
          borderBottom: "1px solid var(--color-rose-light)",
        }}
      >
        <p className="section-subtitle">Naša ponuda</p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "var(--color-dark)",
          }}
        >
          Prodavnica
        </h1>
        <div className="divider" />
        <p
          style={{
            color: "var(--color-gray)",
            marginTop: "1rem",
            lineHeight: 1.7,
          }}
        >
          Svježe cveće i prigodni aranžmani za sve životne prilike
        </p>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        {/* Category filter */}
        {categories.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            <FilterLink href="/prodavnica" active={!kategorija} label="Sve" />
            {categories.map((cat) => (
              <FilterLink
                key={cat._id}
                href={`/prodavnica?kategorija=${cat.slug.current}`}
                active={kategorija === cat.slug.current}
                label={cat.name}
              />
            ))}
          </div>
        )}

        {/* Products grid */}
        {filtered.length > 0 ? (
          <>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-gray)",
                marginBottom: "1.5rem",
              }}
            >
              {filtered.length} {filtered.length === 1 ? "proizvod" : "proizvoda"}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 1.5rem",
            }}
          >
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌸</p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.8rem",
                fontWeight: 300,
                marginBottom: "1rem",
              }}
            >
              {products.length === 0
                ? "Prodavnica se puni..."
                : "Nema proizvoda u ovoj kategoriji"}
            </h2>
            <p style={{ color: "var(--color-gray)", marginBottom: "2rem" }}>
              {products.length === 0
                ? "Dodajte proizvode kroz Sanity Studio ili nas pozovite direktno."
                : "Pogledajte drugu kategoriju."}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:0656268801" className="btn-primary">
                Pozovite nas
              </a>
              <Link href="/prodavnica" className="btn-outline">
                Svi proizvodi
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      style={{
        padding: "0.5rem 1.25rem",
        borderRadius: "2px",
        fontSize: "0.8rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        textDecoration: "none",
        border: "1px solid",
        borderColor: active ? "var(--color-rose)" : "var(--color-rose-light)",
        backgroundColor: active ? "var(--color-rose)" : "transparent",
        color: active ? "white" : "var(--color-dark)",
        transition: "all 0.2s",
      }}
    >
      {label}
    </Link>
  );
}
