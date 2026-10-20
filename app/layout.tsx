import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title:
    "Líbana Chocolates: Cacao orgánico de un solo origen | Líbana Chocolates",
  description:
    "Compra cacao orgánico y chocolate oscuro de un solo origen. Calidad, sabor intenso y una experiencia que te conecta con tu propósito. Cada barra de chocolates aporta a fundaciones de rescate animal en Colombia. Siente una conexión y dale una intención a tu consumo de cacao de ritual.",
  openGraph: {
    title: "Líbana Chocolates: Cacao orgánico de un solo origen",
    description:
      "Chocolate artesanal de un solo origen. Cada barra aporta a fundaciones de rescate animal en Colombia.",
    type: "website",
    locale: "es_CO",
    siteName: "Líbana Chocolates",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
