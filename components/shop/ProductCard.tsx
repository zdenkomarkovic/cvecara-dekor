"use client";

import Image from "next/image";
import Link from "next/link";
import type { SanityProduct } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "@/components/cart/CartContext";

interface ProductCardProps {
  product: SanityProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const imageUrl =
    product.images?.[0]
      ? urlFor(product.images[0]).width(600).height(600).fit("crop").url()
      : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: imageUrl ?? undefined,
      slug: product.slug.current,
    });
  }

  return (
    <Link href={`/prodavnica/${product.slug.current}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "4px",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 30px rgba(200,80,106,0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "100%",
            backgroundColor: "var(--color-rose-pale)",
            overflow: "hidden",
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
              }}
            >
              🌸
            </div>
          )}

          {!product.inStock && (
            <div
              style={{
                position: "absolute",
                top: "0.75rem",
                left: "0.75rem",
                backgroundColor: "rgba(44,26,30,0.75)",
                color: "white",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.25rem 0.6rem",
                borderRadius: "2px",
              }}
            >
              Nije dostupno
            </div>
          )}

          {product.featured && (
            <div
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                backgroundColor: "var(--color-rose)",
                color: "white",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.25rem 0.6rem",
                borderRadius: "2px",
              }}
            >
              Istaknuto
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "1rem" }}>
          {product.category && (
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-gray)",
                marginBottom: "0.25rem",
              }}
            >
              {product.category.name}
            </p>
          )}

          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              fontWeight: 400,
              color: "var(--color-dark)",
              marginBottom: "0.5rem",
              lineHeight: 1.3,
            }}
            className="line-clamp-2"
          >
            {product.name}
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "0.75rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem",
                fontWeight: 500,
                color: "var(--color-rose)",
              }}
            >
              {product.price.toLocaleString("sr-RS")} RSD
            </p>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{
                backgroundColor: product.inStock ? "var(--color-rose)" : "var(--color-gray)",
                color: "white",
                border: "none",
                borderRadius: "2px",
                padding: "0.4rem 0.9rem",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: product.inStock ? "pointer" : "not-allowed",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (product.inStock)
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--color-rose-hover)";
              }}
              onMouseLeave={(e) => {
                if (product.inStock)
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-rose)";
              }}
            >
              + Korpa
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
