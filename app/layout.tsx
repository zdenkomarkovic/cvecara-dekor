import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/constants";
import SiteShell from "@/components/layout/SiteShell";
import { CartProvider } from "@/components/cart/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cvećara Dekor – Kragujevac",
    template: "%s | Cvećara Dekor",
  },
  description:
    "Cvećara Dekor – profesionalni aranžmani cveća za sve prilike. Dostava na teritoriji Kragujevca. Pozovite 065 626 8801.",
  keywords: [
    "cvećara Kragujevac",
    "cvecara Kragujevac",
    "cvećara dekor",
    "cvecara dekor",
    "dostava cveća Kragujevac",
    "buket Kragujevac",
    "buketi Kragujevac",
    "aranžmani cveća Kragujevac",
    "cveće Kragujevac",
    "cvece Kragujevac",
    "pokloni cveće Kragujevac",
    "svadbena dekoracija Kragujevac",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: SITE_URL,
    siteName: "Cvećara Dekor",
    images: [
      {
        url: "/1000052585.jpg",
        width: 1200,
        height: 630,
        alt: "Cvećara Dekor – buketi i aranžmani Kragujevac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/1000052585.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
