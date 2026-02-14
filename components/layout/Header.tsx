"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid var(--color-rose-light)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 8px rgba(200,80,106,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image
            src="/logo.png"
            alt="Cvećara Dekor"
            height={52}
            width={70}
            style={{ objectFit: "contain", objectPosition: "center" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            gap: "2.5rem",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          <NavLink href="/">Početna</NavLink>
          <NavLink href="/prodavnica">Prodavnica</NavLink>
          <NavLink href="/#o-nama">O nama</NavLink>
          <NavLink href="/#kontakt">Kontakt</NavLink>
        </nav>

        {/* Cart & mobile */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/korpa" style={{ position: "relative", textDecoration: "none" }}>
            <span style={{ fontSize: "1.4rem" }}>🛒</span>
            {itemCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  backgroundColor: "var(--color-rose)",
                  color: "white",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "0.65rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: "5px",
              padding: "4px",
            }}
            className="hamburger"
            aria-label="Meni"
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                backgroundColor: "var(--color-dark)",
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                backgroundColor: "var(--color-dark)",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                backgroundColor: "var(--color-dark)",
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          style={{
            backgroundColor: "white",
            borderTop: "1px solid var(--color-rose-light)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          className="mobile-nav"
        >
          <MobileLink href="/" onClick={() => setMenuOpen(false)}>
            Početna
          </MobileLink>
          <MobileLink href="/prodavnica" onClick={() => setMenuOpen(false)}>
            Prodavnica
          </MobileLink>
          <MobileLink href="/#o-nama" onClick={() => setMenuOpen(false)}>
            O nama
          </MobileLink>
          <MobileLink href="/#kontakt" onClick={() => setMenuOpen(false)}>
            Kontakt
          </MobileLink>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.85rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--color-dark)",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-rose)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-dark)")}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "1rem",
        letterSpacing: "0.05em",
        color: "var(--color-dark)",
        textDecoration: "none",
        padding: "0.5rem 0",
        borderBottom: "1px solid var(--color-rose-light)",
      }}
    >
      {children}
    </Link>
  );
}
