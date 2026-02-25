"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-dark)",
        color: "white",
        paddingTop: "3rem",
        paddingBottom: "1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: "white",
              }}
            >
              Cvećara Dekor
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--color-rose-light)",
                fontSize: "0.9rem",
              }}
            >
              Cveće za svaku priliku
            </p>
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
            }}
          >
            Profesionalni aranžmani cveća za sve životne trenutke. Dostava na teritoriji Kragujevca.
          </p>
        </div>

        {/* Links */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              marginBottom: "1rem",
              color: "var(--color-rose-light)",
            }}
          >
            Navigacija
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { href: "/", label: "Početna" },
              { href: "/prodavnica", label: "Prodavnica" },
              { href: "/#o-nama", label: "O nama" },
              { href: "/#kontakt", label: "Kontakt" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              marginBottom: "1rem",
              color: "var(--color-rose-light)",
            }}
          >
            Kontakt
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <ContactItem icon="📍" text="Potporucnika Govedarice 15, Kragujevac" />
            <ContactItem icon="📞" text="065 626 8801" href="tel:0656268801" />
            <ContactItem
              icon="📸"
              text="@cvecara_dekor_kg"
              href="https://instagram.com/cvecara_dekor_kg"
            />
            <ContactItem icon="🚚" text="Dostava u Kragujevcu" />
          </div>
        </div>

        {/* Hours */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              marginBottom: "1rem",
              color: "var(--color-rose-light)",
            }}
          >
            Radno vreme
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <WorkHour day="Ponedeljak – Petak" hours="08:00 – 19:00" />
            <WorkHour day="Subota" hours="08:00 – 19:00" />
            <WorkHour day="Nedelja" hours="08:00 – 16:00" />
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.5rem 1.5rem 0",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          © {new Date().getFullYear()} Cvećara Dekor. Sva prava zadržana.
        </p>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Kragujevac, Srbija</p>
      </div>
    </footer>
  );
}

function ContactItem({ icon, text, href }: { icon: string; text: string; href?: string }) {
  const content = (
    <span style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
      <span>{icon}</span>
      <span
        style={{
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.5,
        }}
      >
        {text}
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{ textDecoration: "none" }}
        onMouseEnter={(e) =>
          ((e.currentTarget.querySelector("span > span:last-child") as HTMLElement).style.color =
            "white")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget.querySelector("span > span:last-child") as HTMLElement).style.color =
            "rgba(255,255,255,0.6)")
        }
      >
        {content}
      </a>
    );
  }
  return content;
}

function WorkHour({ day, hours }: { day: string; hours: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        fontSize: "0.875rem",
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.5)" }}>{day}</span>
      <span style={{ color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap" }}>{hours}</span>
    </div>
  );
}
