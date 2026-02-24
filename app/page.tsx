import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, type SanityProduct } from "@/sanity/lib/fetch";
import ProductCard from "@/components/shop/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const revalidate = 60; // osvježi svakih 60s

export const metadata: Metadata = {
  title: "Cvećara Dekor Kragujevac – Bukveti, Aranžmani i Dostava Cveća",
  description:
    "Cvećara Dekor – vaša cvećara u Kragujevcu. Bukveti, ruže, aranžmani i dekorativno cveće za sve prilike. Dostava na teritoriji Kragujevca. Pozovite 065 626 8801.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Cvećara Dekor Kragujevac – Bukveti i Aranžmani",
    description:
      "Vaša cvećara u Kragujevcu – bukveti, ruže, aranžmani i pokloni. Dostava na teritoriji Kragujevca.",
    url: SITE_URL,
    images: [
      {
        url: "/1000052585.jpg",
        width: 1200,
        height: 630,
        alt: "Cvećara Dekor Kragujevac – buketi i aranžmani",
      },
    ],
  },
};

const localImages = [
  "/1000052585.jpg",
  "/1000052587.jpg",
  "/1000052593.jpg",
  "/1000052595.jpg",
  "/1000052607.jpg",
  "/1000052609.jpg",
  "/1000052633.jpg",
  "/1000052635.jpg",
  "/1000052637.jpg",
  "/1000052639.jpg",
  "/1000052643.jpg",
  "/1000052682.jpg",
  "/1000052688.jpg",
  "/1000052694.jpg",
  "/1000052789.jpg",
  "/1000052790.jpg",
  "/1000055642.jpg",
];

export default async function HomePage() {
  let featuredProducts: SanityProduct[] = [];
  try {
    featuredProducts = await getFeaturedProducts();
  } catch {
    // Sanity nije konfigurisan – koristimo lokalne slike
  }

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: "Cvećara Dekor",
    image: `${SITE_URL}/1000052585.jpg`,
    logo: `${SITE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Potporucnika Govedarice 15",
      addressLocality: "Kragujevac",
      postalCode: "34000",
      addressCountry: "RS",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.0165,
      longitude: 20.9114,
    },
    telephone: "+381656268801",
    url: SITE_URL,
    priceRange: "$$",
    servesCuisine: "Cveće i aranžmani",
    areaServed: {
      "@type": "City",
      name: "Kragujevac",
    },
    sameAs: ["https://instagram.com/cvecara_dekor_kg"],
  };

  return (
    <>
      <JsonLd data={localBusinessData} />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "var(--color-rose-pale)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/1000052585.jpg"
            alt="Cvećara Dekor – buketi i aranžmani"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(44,26,30,0.65) 0%, rgba(44,26,30,0.3) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "4rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "var(--color-rose-light)",
              letterSpacing: "0.08em",
            }}
          >
            Kragujevac, Srbija
          </p>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              fontWeight: 300,
              color: "white",
              lineHeight: 1.05,
              maxWidth: "700px",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "0.5rem",
              }}
            >
              Cvećara Dekor · Kragujevac
            </span>
            Cveće za svaki
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-rose-light)" }}>
              poseban trenutak
            </em>
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.85)",
              maxWidth: "480px",
              lineHeight: 1.8,
            }}
          >
            Profesionalni aranžmani, sveže cveće i prigodni buketi.
            Dostava na teritoriji Kragujevca.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <Link href="/prodavnica" className="btn-primary">
              Pogledaj prodavnicu
            </Link>
            <Link
              href="/#kontakt"
              className="btn-outline"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.6)" }}
            >
              Kontaktiraj nas
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              marginTop: "1rem",
              flexWrap: "wrap",
            }}
          >
            <HeroStat number="10+" label="Godina iskustva" />
            <HeroStat number="∞" label="Svežih aranžmana" />
            <HeroStat number="🚚" label="Dostava u Kragujevcu" />
          </div>
        </div>
      </section>

      {/* CATEGORIJE / USLUGE */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <p className="section-subtitle">Naše usluge</p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 300,
              marginBottom: "0.75rem",
            }}
          >
            Cveće za svaku priliku
          </h2>
          <div className="divider" />
          <p
            style={{
              color: "var(--color-gray)",
              maxWidth: "500px",
              margin: "1rem auto 3rem",
              lineHeight: 1.8,
            }}
          >
            Cvećara Dekor u Kragujevcu – od romantičnih buketa do svečanih aranžmana, sve radimo
            sa ljubavlju i pažnjom.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {categories.map((cat) => (
              <CategoryCard key={cat.title} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS ili GALERIJA */}
      {featuredProducts.length > 0 ? (
        <section style={{ padding: "5rem 1.5rem", backgroundColor: "var(--color-cream)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p className="section-subtitle">Naša ponuda</p>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 300,
                }}
              >
                Istaknuti proizvodi
              </h2>
              <div className="divider" />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {featuredProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/prodavnica" className="btn-primary">
                Vidi sve proizvode
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* Galerija sa lokalnim slikama dok Sanity nije popunjen */
        <section style={{ padding: "5rem 1.5rem", backgroundColor: "var(--color-cream)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p className="section-subtitle">Naša ponuda</p>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 300,
                }}
              >
                Iz naše cvećare
              </h2>
              <div className="divider" />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {localImages.map((src, i) => (
                <div
                  key={src}
                  style={{
                    position: "relative",
                    paddingBottom: "100%",
                    borderRadius: "4px",
                    overflow: "hidden",
                    backgroundColor: "var(--color-rose-pale)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Cvećara Dekor – aranžman ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/prodavnica" className="btn-primary">
                Pogledaj prodavnicu
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* O NAMA */}
      <section
        id="o-nama"
        style={{
          padding: "5rem 1.5rem",
          backgroundColor: "white",
          scrollMarginTop: "80px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <p className="section-subtitle">O nama</p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 300,
                marginBottom: "1.5rem",
              }}
            >
              Vaša lokalna cvećara
              <br />
              <em style={{ fontStyle: "italic", color: "var(--color-rose)" }}>u Kragujevcu</em>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                color: "var(--color-gray)",
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
              <p>
                Cvećara Dekor je vaša pouzdana adresa za sveže cveće i prigodne aranžmane u
                Kragujevcu. Nudimo bukete, dekoracije i poklone za sve životne prilike.
              </p>
              <p>
                Kao cvećara u Kragujevcu sa dugogodišnjim iskustvom, posvećeni smo kvalitetu i
                zadovoljstvu naših kupaca. Svaki aranžman pravimo sa pažnjom i ljubavlju,
                koristeći najsvežije cveće.
              </p>
            </div>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <InfoRow icon="📍" text="Potporucnika Govedarice 15, Kragujevac" />
              <InfoRow icon="📞" text="065 626 8801" href="tel:0656268801" />
              <InfoRow
                icon="📸"
                text="@cvecara_dekor_kg"
                href="https://instagram.com/cvecara_dekor_kg"
              />
              <InfoRow icon="🚚" text="Dostava na teritoriji Kragujevca" />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
            }}
          >
            {["/1000052637.jpg", "/1000052639.jpg", "/1000052643.jpg", "/1000052682.jpg"].map(
              (src, i) => (
                <div
                  key={src}
                  style={{
                    position: "relative",
                    paddingBottom: "100%",
                    borderRadius: "4px",
                    overflow: "hidden",
                    backgroundColor: "var(--color-rose-pale)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Cvećara Dekor ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 50vw, 250px"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section
        id="kontakt"
        style={{
          padding: "5rem 1.5rem",
          backgroundColor: "var(--color-rose-pale)",
          scrollMarginTop: "80px",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p className="section-subtitle">Stupite u kontakt</p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 300,
              marginBottom: "1rem",
            }}
          >
            Tu smo za vas
          </h2>
          <div className="divider" />
          <p
            style={{
              color: "var(--color-gray)",
              lineHeight: 1.8,
              marginTop: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            Imate pitanje ili posebnu narudžbinu? Cvećara Dekor Kragujevac je tu za vas –
            slobodno nas kontaktirajte, odgovaramo brzo!
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <ContactCard icon="📞" title="Telefon" value="065 626 8801" href="tel:0656268801" />
            <ContactCard
              icon="📸"
              title="Instagram"
              value="@cvecara_dekor_kg"
              href="https://instagram.com/cvecara_dekor_kg"
            />
            <ContactCard icon="📍" title="Adresa" value="Potporucnika Govedarice 15" />
          </div>

          <Link href="/prodavnica" className="btn-primary">
            Naruči online
          </Link>
        </div>
      </section>
    </>
  );
}

const categories = [
  { icon: "💐", title: "Bukveti", desc: "Sveži i mirisni bukveti za sve prilike" },
  { icon: "🌹", title: "Ruže", desc: "Crvene, bijele, pink – sve boje ljubavi" },
  { icon: "🎀", title: "Pokloni", desc: "Cvetni aranžmani u kutijama i vazama" },
  { icon: "💍", title: "Svadbe", desc: "Dekoracije i ukrasi za vjenčanja" },
  { icon: "🏠", title: "Dekoracije", desc: "Ukrašavanje prostora za sve prilike" },
];

function CategoryCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      className="hover-lift-border"
      style={{
        padding: "2rem 1.5rem",
        textAlign: "center",
        borderRadius: "4px",
        border: "1px solid var(--color-rose-light)",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{icon}</div>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.2rem",
          fontWeight: 400,
          marginBottom: "0.4rem",
          color: "var(--color-dark)",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.875rem", color: "var(--color-gray)", lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function HeroStat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.8rem",
          fontWeight: 300,
          color: "white",
          lineHeight: 1,
        }}
      >
        {number}
      </p>
      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>
        {label}
      </p>
    </div>
  );
}

function InfoRow({ icon, text, href }: { icon: string; text: string; href?: string }) {
  const content = (
    <span style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <span>{icon}</span>
      <span style={{ fontSize: "0.95rem", color: "var(--color-gray)" }}>{text}</span>
    </span>
  );
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{ textDecoration: "none" }}
      >
        {content}
      </a>
    );
  }
  return content;
}

function ContactCard({
  icon,
  title,
  value,
  href,
}: {
  icon: string;
  title: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div
      className="hover-lift"
      style={{
        backgroundColor: "white",
        padding: "1.5rem 1rem",
        borderRadius: "4px",
        textAlign: "center",
        border: "1px solid var(--color-rose-light)",
      }}
    >
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>
      <p
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-gray)",
          marginBottom: "0.25rem",
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1rem",
          color: "var(--color-dark)",
        }}
      >
        {value}
      </p>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{ textDecoration: "none" }}
      >
        {inner}
      </a>
    );
  }
  return inner;
}
