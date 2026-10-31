import { asset } from "./utils";

export type Product = {
  id: string;
  name: string;
  flavor: string;
  description: string;
  image: string;
  price: number;
  compareAtPrice?: number;
};

export const products: Product[] = [
  // Valores observados en el sitio público actual; confirmar vigencia antes de publicar.
  {
    id: "naranja",
    name: "Chocolate Líbana Naranja 60% Cacao",
    flavor: "Naranja",
    description:
      "Chocolate oscuro con trozos de naranja deshidratada: cítrico, intenso y equilibrado.",
    image: asset("/assets/drive-origin/product-naranja.jpg"),
    price: 24900,
    compareAtPrice: 29900,
  },
  {
    id: "uchuva",
    name: "Chocolate Líbana Uchuva 60% Cacao",
    flavor: "Uchuva",
    description:
      "Chocolate oscuro con uchuva deshidratada: fruta colombiana, acidez brillante y final profundo.",
    image: asset("/assets/drive-origin/product-uchuva.jpg"),
    price: 24900,
    compareAtPrice: 29900,
  },
  {
    id: "aji",
    name: "Chocolate Líbana Ají 60% Cacao",
    flavor: "Ají",
    description:
      "Chocolate oscuro con un toque de ají colombiano: dulce al principio, picante al final.",
    image: asset("/assets/drive-origin/product-aji.jpg"),
    price: 24900,
    compareAtPrice: 29900,
  },
];

export const site = {
  name: "Líbana Chocolates",
  tagline: "Sabor intenso y puro",
  description:
    "Chocolate oscuro de un solo origen, hecho con cacao orgánico colombiano.",
  whatsappPhone: "573181247371",
  instagram: "https://www.instagram.com/libana.chocolates/",
  email: "info@libanachocolates.com",
};
