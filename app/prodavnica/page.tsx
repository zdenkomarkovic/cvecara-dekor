import type { Metadata } from "next";
import { getAllProducts, type SanityProduct } from "@/sanity/lib/fetch";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Prodavnica",
  description:
    "Pogledajte našu kompletnu ponudu – bukveti, aranžmani, dekoracije i pokloni. Dostava na teritoriji Kragujevca.",
};

export default async function ProdavnicaPage() {
  let products: SanityProduct[] = [];

  try {
    products = await getAllProducts();
  } catch {
    // Sanity nije konfigurisan
  }

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
        {/* Products grid */}
        {products.length > 0 ? (
          <>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-gray)",
                marginBottom: "1.5rem",
              }}
            >
              {products.length} {products.length === 1 ? "proizvod" : "proizvoda"}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {products.map((product) => (
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
              Prodavnica se puni...
            </h2>
            <p style={{ color: "var(--color-gray)", marginBottom: "2rem" }}>
              Dodajte proizvode kroz Sanity Studio ili nas pozovite direktno.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:0656268801" className="btn-primary">
                Pozovite nas
              </a>
              <Link href="/" className="btn-outline">
                Početna
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
