import { Product } from '../types';

export const ALL_PRODUCTS: Product[] = [
  // Kit Uniforme Masculino
  {
    id: 'uniforme-titular-2025',
    name: "Uniforme Titular 2025",
    price: 99.90,
    description: "Uniforme oficial titular da BrutaMed para a temporada 2025.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/titular%2025%20frente.png",
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/titular%2025%20costa.png"
    ],
    category: "Kit Uniforme Masculino",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  {
    id: 'uniforme-reserva-2025',
    name: "Uniforme Reserva 2025",
    price: 99.90,
    description: "Uniforme oficial reserva da BrutaMed para a temporada 2025.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/reserva%2025%20frente.png",
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/reserva%2025%20costa.png"
    ],
    category: "Kit Uniforme Masculino",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  {
    id: 'calcao-masculino-2025',
    name: "Short Masculino 2025",
    price: 79.90,
    description: "Short oficial da BrutaMed para a temporada 2025.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/cal%C3%A7%C3%A3o%2024%20frente.png",
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/cal%C3%A7%C3%A3o%2025%20costa.png"
    ],
    category: "Kit Uniforme Masculino",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  // Kit Uniforme Feminino
  {
    id: 'uniforme-titular-feminino-2025',
    name: "Uniforme Titular Feminino 2025",
    price: 99.90,
    description: "Uniforme oficial titular feminino da BrutaMed para a temporada 2025.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/titular%2025%20F.png",
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/titular%2025%20F%20costa.png"
    ],
    category: "Kit Uniforme Feminino",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  {
    id: 'uniforme-reserva-feminino-2025',
    name: "Uniforme Reserva Feminino 2025",
    price: 99.90,
    description: "Uniforme oficial reserva feminino da BrutaMed para a temporada 2025.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/reserva%2025%20F.png",
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/reserva%2025%20f%20Costa.png"
    ],
    category: "Kit Uniforme Feminino",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  {
    id: 'short-feminino-2025',
    name: "Short Feminino 2025",
    price: 79.90,
    description: "Short oficial feminino da BrutaMed para a temporada 2025.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/Short%20frente.png",
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/Short%20costa.png"
    ],
    category: "Kit Uniforme Feminino",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  // Jerseys
  {
    id: 'regata-basquete-2025',
    name: "Regata Basquete 2025",
    price: 135.00,
    description: "Regata oficial de basquete da BrutaMed.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/basquete%20frente.png",
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/costa.png",
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/diagonal%20direito.png",
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/diagonal%20esquerdo.png"
    ],
    category: "Jerseys",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  {
    id: 'jersey-baseball-2025',
    name: "Jersey Baseball 2025",
    price: 160.00,
    description: "Jersey oficial de baseball da BrutaMed.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/Jersey%20Baseball%20Brutamed%202025.jpg"
    ],
    category: "Jerseys",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  {
    id: 'jersey-nfl-2025',
    name: "Jersey NFL 2025",
    price: 138.00,
    description: "Jersey oficial de futebol americano (NFL) da BrutaMed.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/Jersey%20NFL.jpg"
    ],
    category: "Jerseys",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  // Calças
  {
    id: 'calca-cargo-2025',
    name: "Calça Cargo 2025",
    price: 122.00,
    description: "Calça cargo oficial da BrutaMed.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/Cal%C3%A7a%20Cargo.jpg"
    ],
    category: "Calças",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  // Top Amarração
  {
    id: 'top-amarracao-2025',
    name: "Top Amarração 2025",
    price: 78.00,
    description: "Top amarração oficial da BrutaMed.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/Top%20Amarra%C3%A7%C3%A3o.jpg"
    ],
    category: "Top Amarração",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  },
  // Body BrutaMed
  {
    id: 'body-brutamed-2025',
    name: "Body BrutaMed 2025",
    price: 78.00,
    description: "Body oficial da BrutaMed.",
    images: [
      "https://raw.githubusercontent.com/brutafinance-maker/brt1/main/Body%20Brutamed%202025.jpg"
    ],
    category: "Body BrutaMed",
    sizes: ["P", "M", "G", "GG"],
    stock: 0,
    status: 'unavailable'
  }
];

export const CATEGORIES = [
  { id: 'kit-masculino', title: "Kit Uniforme Masculino", filter: (p: Product) => p.category === "Kit Uniforme Masculino" },
  { id: 'kit-feminino', title: "Kit Uniforme Feminino", filter: (p: Product) => p.category === "Kit Uniforme Feminino" },
  { id: 'jerseys', title: "Jerseys", filter: (p: Product) => p.category === "Jerseys" },
  { id: 'calcas', title: "Calças", filter: (p: Product) => p.category === "Calças" },
  { id: 'top-amarracao', title: "Top Amarração", filter: (p: Product) => p.category === "Top Amarração" },
  { id: 'body-brutamed', title: "Body BrutaMed", filter: (p: Product) => p.category === "Body BrutaMed" }
];
