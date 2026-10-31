import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "./fonts/young-serif-latin.woff2",
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://libanachocolates.com"),
  title: "Líbana Chocolates | Chocolate de origen, con propósito",
  description:
    "Chocolate oscuro de un solo origen, hecho con cacao orgánico colombiano. Descubre Naranja, Uchuva y Ají: 60% cacao y 85 g por barra.",
  openGraph: {
    title: "Líbana Chocolates | Chocolate de origen, con propósito",
    description:
      "Chocolate oscuro de un solo origen, hecho con cacao orgánico colombiano. Descubre Naranja, Uchuva y Ají.",
    type: "website",
    locale: "es_CO",
    siteName: "Líbana Chocolates",
    images: [
      {
        url: "/assets/drive-origin/hero-hands-sharing.jpg",
        width: 1068,
        height: 1600,
        alt: "Manos parten una barra de chocolate Líbana para compartir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Líbana Chocolates | Chocolate de origen, con propósito",
    description:
      "Chocolate oscuro de un solo origen, hecho con cacao orgánico colombiano.",
    images: ["/assets/drive-origin/hero-hands-sharing.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
