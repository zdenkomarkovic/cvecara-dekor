import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvala na narudžbini",
  robots: { index: false, follow: false },
};

export default function HvalaPage() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
        backgroundColor: "var(--color-rose-pale)",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🌸</div>

      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 300,
          color: "var(--color-dark)",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}
      >
        Hvala na narudžbini!
      </h1>

      <div className="divider" />

      <p
        style={{
          fontSize: "1.05rem",
          color: "var(--color-gray)",
          maxWidth: "480px",
          lineHeight: 1.8,
          marginTop: "1rem",
          marginBottom: "2rem",
        }}
      >
        Primili smo vašu narudžbinu. Kontaktiraćemo vas u najkraćem roku radi potvrde
        i dogovora o dostavi.
      </p>

      <div
        style={{
          backgroundColor: "white",
          border: "1px solid var(--color-rose-light)",
          borderRadius: "4px",
          padding: "1.5rem 2rem",
          marginBottom: "2rem",
          maxWidth: "380px",
          width: "100%",
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "var(--color-gray)", marginBottom: "0.75rem" }}>
          Za hitne upite:
        </p>
        <a
          href="tel:0656268801"
          style={{
            display: "block",
            fontFamily: "var(--font-serif)",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "var(--color-rose)",
            textDecoration: "none",
            marginBottom: "0.5rem",
          }}
        >
          065 626 8801
        </a>
        <a
          href="https://instagram.com/cvecara_dekor_kg"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.9rem",
            color: "var(--color-gray)",
            textDecoration: "none",
          }}
        >
          @cvecara_dekor_kg
        </a>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn-outline">
          Početna
        </Link>
        <Link href="/prodavnica" className="btn-primary">
          Nastavi kupovinu
        </Link>
      </div>
    </div>
  );
}
