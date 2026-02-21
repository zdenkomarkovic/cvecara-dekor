"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { useCart } from "@/components/cart/CartContext";
import { getProductBySlug } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProizvodPage({ params }: PageProps) {
  const { slug } = use(params);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState<
    Awaited<ReturnType<typeof getProductBySlug>> | null | undefined
  >(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    getProductBySlug(slug)
      .then(setProduct)
      .catch(() => setProduct(null));
  }, [slug]);

  if (product === undefined) return <LoadingState />;
  if (product === null) return notFound();

  const images = product.images ?? [];

  const mainImageUrl =
    images[selectedIndex]
      ? urlFor(images[selectedIndex]).width(900).height(900).fit("crop").url()
      : null;

  const zoomedImageUrl =
    images[selectedIndex]
      ? urlFor(images[selectedIndex]).width(1600).height(1600).fit("clip").url()
      : null;

  function handleAddToCart() {
    if (!product) return;
    const cartImageUrl = images[0]
      ? urlFor(images[0]).width(400).height(400).fit("crop").url()
      : undefined;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price ?? 0,
        image: cartImageUrl,
        slug: product.slug.current,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function prevImage() {
    setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function nextImage() {
    setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div style={{ minHeight: "60vh" }}>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.5rem 1.5rem 0",
          display: "flex",
          gap: "0.5rem",
          fontSize: "0.8rem",
          color: "var(--color-gray)",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ color: "var(--color-gray)", textDecoration: "none" }}>
          Početna
        </Link>
        <span>/</span>
        <Link href="/prodavnica" style={{ color: "var(--color-gray)", textDecoration: "none" }}>
          Prodavnica
        </Link>
        <span>/</span>
        <span style={{ color: "var(--color-dark)" }}>{product.name}</span>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1.5rem 5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          alignItems: "start",
        }}
      >
        {/* ── Image gallery ── */}
        <div>
          {/* Main image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "100%",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: "var(--color-rose-pale)",
              cursor: mainImageUrl ? "zoom-in" : "default",
            }}
            onClick={() => mainImageUrl && setZoomed(true)}
          >
            {mainImageUrl ? (
              <Image
                key={selectedIndex}
                src={mainImageUrl}
                alt={product.name}
                fill
                style={{
                  objectFit: "cover",
                  transition: "opacity 0.25s ease",
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "6rem",
                }}
              >
                🌸
              </div>
            )}

            {/* Zoom hint */}
            {mainImageUrl && (
              <div
                style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  right: "0.75rem",
                  backgroundColor: "rgba(44,26,30,0.55)",
                  color: "white",
                  fontSize: "0.7rem",
                  letterSpacing: "0.06em",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  backdropFilter: "blur(4px)",
                }}
              >
                🔍 Klikni za uvećanje
              </div>
            )}

            {/* Arrow navigation – only if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  aria-label="Prethodna slika"
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.85)",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    transition: "background-color 0.15s",
                    zIndex: 2,
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  aria-label="Sledeća slika"
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.85)",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    transition: "background-color 0.15s",
                    zIndex: 2,
                  }}
                >
                  ›
                </button>

                {/* Dot indicators */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "0.75rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "6px",
                    zIndex: 2,
                  }}
                >
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                      aria-label={`Slika ${i + 1}`}
                      style={{
                        width: i === selectedIndex ? "20px" : "8px",
                        height: "8px",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: i === selectedIndex ? "white" : "rgba(255,255,255,0.5)",
                        transition: "all 0.2s",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(images.length, 5)}, 1fr)`,
                gap: "0.5rem",
                marginTop: "0.75rem",
              }}
            >
              {images.slice(0, 5).map((img, i) => {
                const thumbUrl = urlFor(img).width(200).height(200).fit("crop").url();
                const isActive = i === selectedIndex;
                return (
                  <button
                    key={img._key ?? i}
                    onClick={() => setSelectedIndex(i)}
                    aria-label={`Slika ${i + 1}`}
                    style={{
                      position: "relative",
                      paddingBottom: "100%",
                      borderRadius: "3px",
                      overflow: "hidden",
                      backgroundColor: "var(--color-rose-pale)",
                      border: `2px solid ${isActive ? "var(--color-rose)" : "transparent"}`,
                      cursor: "pointer",
                      padding: 0,
                      transition: "border-color 0.15s",
                      outline: "none",
                    }}
                  >
                    <Image
                      src={thumbUrl}
                      alt={`${product.name} – slika ${i + 1}`}
                      fill
                      style={{
                        objectFit: "cover",
                        opacity: isActive ? 1 : 0.7,
                        transition: "opacity 0.15s",
                      }}
                      sizes="80px"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Product details ── */}
        <div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 300,
              color: "var(--color-dark)",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2rem",
              fontWeight: 400,
              color: "var(--color-rose)",
              marginBottom: "1.5rem",
            }}
          >
            {product.price != null ? `${product.price.toLocaleString("sr-RS")} RSD` : "Cena na upit"}
          </p>

          {product.description && (
            <p
              style={{
                color: "var(--color-gray)",
                lineHeight: 1.8,
                marginBottom: "2rem",
                borderTop: "1px solid var(--color-rose-light)",
                paddingTop: "1.5rem",
              }}
            >
              {product.description}
            </p>
          )}

          {/* Availability */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: product.inStock ? "#4caf50" : "#f44336",
              }}
            />
            <span style={{ fontSize: "0.875rem", color: "var(--color-gray)" }}>
              {product.inStock ? "Na stanju" : "Trenutno nije dostupno"}
            </span>
          </div>

          {product.inStock && (
            <>
              {/* Quantity selector */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-gray)",
                  }}
                >
                  Količina:
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid var(--color-rose-light)",
                    borderRadius: "2px",
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      color: "var(--color-dark)",
                      lineHeight: 1,
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{ width: "36px", textAlign: "center", fontSize: "0.95rem" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      color: "var(--color-dark)",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={handleAddToCart}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: "180px" }}
                >
                  {added ? "✓ Dodato u korpu!" : "Dodaj u korpu"}
                </button>
                <Link
                  href="/korpa"
                  className="btn-outline"
                  style={{ flex: 1, minWidth: "140px", textAlign: "center" }}
                >
                  Pogledaj korpu
                </Link>
              </div>
            </>
          )}

          <div
            style={{
              marginTop: "2rem",
              padding: "1.25rem",
              backgroundColor: "var(--color-rose-pale)",
              borderRadius: "4px",
              fontSize: "0.875rem",
              color: "var(--color-gray)",
              lineHeight: 1.7,
            }}
          >
            🚚 <strong>Dostava</strong> na teritoriji Kragujevca
            <br />
            📞 Pitanja? Pozovite{" "}
            <a href="tel:0656268801" style={{ color: "var(--color-rose)" }}>
              065 626 8801
            </a>
          </div>
        </div>
      </div>

      {/* ── Zoom lightbox ── */}
      {zoomed && zoomedImageUrl && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(20,10,12,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "1rem",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setZoomed(false)}
            aria-label="Zatvori"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              background: "rgba(255,255,255,0.12)",
              border: "none",
              borderRadius: "50%",
              width: "42px",
              height: "42px",
              color: "white",
              fontSize: "1.4rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            ×
          </button>

          {/* Prev / Next in lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                aria-label="Prethodna"
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  color: "white",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                aria-label="Sledeća"
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  color: "white",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ›
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "min(90vw, 900px)",
              maxHeight: "90vh",
              width: "100%",
              aspectRatio: "1",
              cursor: "default",
            }}
          >
            <Image
              src={zoomedImageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
              sizes="90vw"
            />
          </div>

          {/* Counter */}
          {images.length > 1 && (
            <p
              style={{
                position: "absolute",
                bottom: "1.25rem",
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
              }}
            >
              {selectedIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌸</div>
        <p style={{ color: "var(--color-gray)" }}>Učitavanje...</p>
      </div>
    </div>
  );
}
