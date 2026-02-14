"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";

export default function KorpaPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
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
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🛒</div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.5rem",
            fontWeight: 300,
            marginBottom: "1rem",
          }}
        >
          Korpa je prazna
        </h1>
        <p style={{ color: "var(--color-gray)", marginBottom: "2rem", lineHeight: 1.7 }}>
          Pregledajte našu prodavnicu i odaberite nešto lijepo.
        </p>
        <Link href="/prodavnica" className="btn-primary">
          Idi na prodavnicu
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "60vh" }}>
      <div
        style={{
          backgroundColor: "var(--color-rose-pale)",
          padding: "3rem 1.5rem 2rem",
          textAlign: "center",
          borderBottom: "1px solid var(--color-rose-light)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
          }}
        >
          Vaša korpa
        </h1>
        <div className="divider" />
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Items */}
          <div>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: "1rem",
                  alignItems: "center",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid var(--color-rose-light)",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "80px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    backgroundColor: "var(--color-rose-pale)",
                    flexShrink: 0,
                  }}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="80px"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      🌸
                    </div>
                  )}
                </div>

                {/* Name & controls */}
                <div>
                  <Link
                    href={`/prodavnica/${item.slug}`}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      fontWeight: 400,
                      color: "var(--color-dark)",
                      textDecoration: "none",
                    }}
                  >
                    {item.name}
                  </Link>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-rose)", marginTop: "0.25rem" }}>
                    {item.price.toLocaleString("sr-RS")} RSD
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginTop: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid var(--color-rose-light)",
                        borderRadius: "2px",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: "1rem",
                        }}
                      >
                        −
                      </button>
                      <span style={{ width: "28px", textAlign: "center", fontSize: "0.875rem" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: "1rem",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        color: "var(--color-gray)",
                        letterSpacing: "0.05em",
                        textDecoration: "underline",
                      }}
                    >
                      Ukloni
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--color-dark)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {(item.price * item.quantity).toLocaleString("sr-RS")} RSD
                </p>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={clearCart}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  color: "var(--color-gray)",
                  textDecoration: "underline",
                  letterSpacing: "0.05em",
                }}
              >
                Isprazni korpu
              </button>
              <Link
                href="/prodavnica"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-rose)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                ← Nastavi kupovinu
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-rose-light)",
              borderRadius: "4px",
              padding: "1.5rem",
              minWidth: "260px",
              position: "sticky",
              top: "90px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                fontWeight: 300,
                marginBottom: "1.5rem",
              }}
            >
              Pregled porudžbine
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
                fontSize: "0.9rem",
                color: "var(--color-gray)",
              }}
            >
              <span>Ukupno proizvoda</span>
              <span>
                {items.reduce((s, i) => s + i.quantity, 0)} kom
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
                fontSize: "0.9rem",
                color: "var(--color-gray)",
              }}
            >
              <span>Dostava</span>
              <span style={{ color: "var(--color-green)" }}>Po dogovoru</span>
            </div>

            <div
              style={{
                borderTop: "1px solid var(--color-rose-light)",
                paddingTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                }}
              >
                Ukupno
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: "var(--color-rose)",
                }}
              >
                {total.toLocaleString("sr-RS")} RSD
              </span>
            </div>

            <Link href="/narudzbina" className="btn-primary" style={{ display: "block", textAlign: "center" }}>
              Naruči
            </Link>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--color-gray)",
                textAlign: "center",
                marginTop: "1rem",
                lineHeight: 1.6,
              }}
            >
              🚚 Dostava na teritoriji Kragujevca
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
