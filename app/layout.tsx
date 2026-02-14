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
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: SITE_URL,
    siteName: "Cvećara Dekor",
  },
  twitter: { card: "summary_large_image" },
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
