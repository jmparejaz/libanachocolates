export type Product = {
  id: string;
  name: string;
  flavor: string;
  description: string;
  image: string;
  price: number;
  paymentUrl: string;
};

export const products: Product[] = [
  {
    id: "naranja",
    name: "Chocolate Naranja",
    flavor: "Naranja",
    description:
      "Chocolate oscuro de un solo origen con trozos de naranja deshidratada. Cítrico, intenso, puro.",
    image: "/assets/galeria/Naranja-frontal-chocolate.jpg",
    price: 28000,
    paymentUrl: "https://checkout.wompi.co/l/libana-naranja",
  },
  {
    id: "uchuva",
    name: "Chocolate Uchuva",
    flavor: "Uchuva",
    description:
      "Nuestro sabor más colombiano: uchuva deshidratada bañada en chocolate oscuro 70%.",
    image: "/assets/galeria/Frontal-Chocolate-Uchuva.jpg",
    price: 28000,
    paymentUrl: "https://checkout.wompi.co/l/libana-uchuva",
  },
  {
    id: "aji",
    name: "Chocolate Ají",
    flavor: "Ají",
    description:
      "Chocolate oscuro con un toque de ají colombiano. Dulce al principio, picante al final.",
    image: "/assets/galeria/Frontal-Chocolate-Aji.jpg",
    price: 28000,
    paymentUrl: "https://checkout.wompi.co/l/libana-aji",
  },
];

export const site = {
  name: "Líbana",
  tagline: "Sabor intenso y puro",
  description:
    "Chocolate oscuro de un solo origen, hecho con cacao orgánico colombiano.",
};
