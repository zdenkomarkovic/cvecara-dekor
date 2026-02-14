"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";

interface FormData {
  ime: string;
  prezime: string;
  telefon: string;
  email: string;
  adresa: string;
  napomena: string;
  nacinDostave: "dostava" | "licno";
}

const initialForm: FormData = {
  ime: "",
  prezime: "",
  telefon: "",
  email: "",
  adresa: "",
  napomena: "",
  nacinDostave: "dostava",
};

export default function NarudzbinePage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

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
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2rem",
            fontWeight: 300,
            marginBottom: "1rem",
          }}
        >
          Vaša korpa je prazna
        </h1>
        <Link href="/prodavnica" className="btn-primary">
          Idi na prodavnicu
        </Link>
      </div>
    );
  }

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.ime.trim()) e.ime = "Ime je obavezno";
    if (!form.prezime.trim()) e.prezime = "Prezime je obavezno";
    if (!form.telefon.trim()) e.telefon = "Telefon je obavezan";
    if (!form.email.trim()) e.email = "Email je obavezan";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Neispravan email";
    if (form.nacinDostave === "dostava") {
      if (!form.adresa.trim()) e.adresa = "Adresa je obavezna";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, items, total }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Greška pri slanju narudžbine");
      }

      clearCart();
      router.push("/hvala");
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Greška. Pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  }

  function field(
    name: keyof FormData,
    label: string,
    type = "text",
    required = true
  ) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label
          htmlFor={name}
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-dark)",
          }}
        >
          {label} {required && <span style={{ color: "var(--color-rose)" }}>*</span>}
        </label>
        <input
          id={name}
          type={type}
          value={form[name] as string}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          style={{
            padding: "0.65rem 0.85rem",
            border: `1px solid ${errors[name] ? "var(--color-rose)" : "var(--color-rose-light)"}`,
            borderRadius: "2px",
            fontSize: "0.95rem",
            outline: "none",
            backgroundColor: "white",
            color: "var(--color-dark)",
          }}
        />
        {errors[name] && (
          <span style={{ fontSize: "0.8rem", color: "var(--color-rose)" }}>
            {errors[name]}
          </span>
        )}
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
          Narudžbina
        </h1>
        <div className="divider" />
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "3rem 1.5rem 5rem",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.4rem",
              fontWeight: 300,
              marginBottom: "1.5rem",
              color: "var(--color-dark)",
            }}
          >
            Podaci za dostavu
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {field("ime", "Ime")}
            {field("prezime", "Prezime")}
          </div>

          <div style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }}>
            {field("telefon", "Telefon", "tel")}
            {field("email", "Email", "email")}
          </div>

          {/* Nacin dostave */}
          <div style={{ marginBottom: "1rem" }}>
            <p
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-dark)",
                marginBottom: "0.75rem",
              }}
            >
              Način preuzimanja <span style={{ color: "var(--color-rose)" }}>*</span>
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {(["dostava", "licno"] as const).map((val) => (
                <label
                  key={val}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    padding: "0.65rem 1.25rem",
                    border: `1px solid ${form.nacinDostave === val ? "var(--color-rose)" : "var(--color-rose-light)"}`,
                    borderRadius: "2px",
                    backgroundColor: form.nacinDostave === val ? "var(--color-rose-pale)" : "white",
                    transition: "all 0.15s",
                  }}
                >
                  <input
                    type="radio"
                    name="nacinDostave"
                    value={val}
                    checked={form.nacinDostave === val}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, nacinDostave: e.target.value as "dostava" | "licno" }))
                    }
                    style={{ accentColor: "var(--color-rose)" }}
                  />
                  <span style={{ fontSize: "0.9rem" }}>
                    {val === "dostava" ? "🚚 Dostava u Kragujevcu" : "🏪 Lično preuzimanje"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {form.nacinDostave === "dostava" && (
            <div style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }}>
              {field("adresa", "Adresa dostave")}
            </div>
          )}

          {/* Napomena */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "2rem" }}>
            <label
              htmlFor="napomena"
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-dark)",
              }}
            >
              Napomena (opciono)
            </label>
            <textarea
              id="napomena"
              rows={3}
              value={form.napomena}
              onChange={(e) => setForm((f) => ({ ...f, napomena: e.target.value }))}
              placeholder="Posebne želje, poruka na kartici, vreme dostave..."
              style={{
                padding: "0.65rem 0.85rem",
                border: "1px solid var(--color-rose-light)",
                borderRadius: "2px",
                fontSize: "0.95rem",
                resize: "vertical",
                outline: "none",
                backgroundColor: "white",
                color: "var(--color-dark)",
                lineHeight: 1.6,
              }}
            />
          </div>

          {serverError && (
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#fff5f5",
                border: "1px solid var(--color-rose-light)",
                borderRadius: "4px",
                color: "var(--color-rose)",
                fontSize: "0.875rem",
                marginBottom: "1.5rem",
              }}
            >
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Slanje narudžbine..." : "Pošalji narudžbinu"}
          </button>

          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--color-gray)",
              textAlign: "center",
              marginTop: "1rem",
              lineHeight: 1.6,
            }}
          >
            Kontaktiraćemo vas radi potvrde narudžbine i dogovora o plaćanju.
          </p>
        </form>

        {/* Order summary */}
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid var(--color-rose-light)",
            borderRadius: "4px",
            padding: "1.5rem",
            minWidth: "240px",
            position: "sticky",
            top: "90px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.3rem",
              fontWeight: 300,
              marginBottom: "1.25rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--color-rose-light)",
            }}
          >
            Pregled ({items.length} {items.length === 1 ? "stavka" : "stavki"})
          </h2>

          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "0.5rem",
                marginBottom: "0.75rem",
                fontSize: "0.875rem",
              }}
            >
              <span style={{ color: "var(--color-gray)", flex: 1 }}>
                {item.name}{" "}
                <span style={{ color: "var(--color-rose)" }}>×{item.quantity}</span>
              </span>
              <span style={{ whiteSpace: "nowrap", fontWeight: 500 }}>
                {(item.price * item.quantity).toLocaleString("sr-RS")} RSD
              </span>
            </div>
          ))}

          <div
            style={{
              borderTop: "1px solid var(--color-rose-light)",
              paddingTop: "1rem",
              marginTop: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1rem" }}>
              Ukupno
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem",
                fontWeight: 500,
                color: "var(--color-rose)",
              }}
            >
              {total.toLocaleString("sr-RS")} RSD
            </span>
          </div>

          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--color-gray)",
              marginTop: "1rem",
              lineHeight: 1.6,
            }}
          >
            + Dostava (po dogovoru)
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          form + div { position: static !important; min-width: unset !important; }
        }
      `}</style>
    </div>
  );
}
