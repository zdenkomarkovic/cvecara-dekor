import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stranica nije pronađena",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
        backgroundColor: "var(--color-rose-pale)",
      }}
    >
      <p style={{ fontSize: "5rem", marginBottom: "1rem" }}>🌸</p>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 6vw, 4rem)",
          fontWeight: 300,
          marginBottom: "0.5rem",
          color: "var(--color-dark)",
        }}
      >
        404
      </h1>
      <p style={{ color: "var(--color-gray)", marginBottom: "2rem", lineHeight: 1.7 }}>
        Tražena stranica ne postoji.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn-outline">
          Početna
        </Link>
        <Link href="/prodavnica" className="btn-primary">
          Prodavnica
        </Link>
      </div>
    </div>
  );
}
