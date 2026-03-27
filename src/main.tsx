import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { firebaseService } from './services/firebaseService';

const MOCK_PRODUCTS = [
  {
    name: "Camisa Oficial BrutaMed 2026",
    price: 89.90,
    description: "A camisa oficial da maior de todas. Tecido dry-fit de alta performance, escudo bordado e detalhes em silk de alta definição. Perfeita para torcer e praticar esportes.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Camisas",
    sizes: ["P", "M", "G", "GG"],
    stock: 50,
    featured: true
  },
  {
    name: "Moletom Canguru BrutaMed",
    price: 189.90,
    description: "Conforto e estilo para os dias frios. Moletom flanelado de alta gramatura, capuz ajustável e bolso frontal. Estampa exclusiva BrutaMed nas costas.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Moletons",
    sizes: ["P", "M", "G", "GG"],
    stock: 30,
    featured: true
  },
  {
    name: "Shorts Performance BrutaMed",
    price: 69.90,
    description: "Liberdade de movimento para seus treinos. Tecido leve e respirável, com elastano para maior flexibilidade. Ideal para quadra e academia.",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Shorts",
    sizes: ["P", "M", "G", "GG"],
    stock: 40,
    featured: true
  },
  {
    name: "Boné Trucker BrutaMed",
    price: 59.90,
    description: "O acessório que faltava no seu kit. Boné modelo trucker com tela respirável, ajuste snapback e logo BrutaMed em alto relevo.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Acessórios",
    sizes: ["Único"],
    stock: 100,
    featured: true
  },
  {
    name: "Garrafa Térmica BrutaMed",
    price: 79.90,
    description: "Mantenha sua hidratação sempre gelada. Garrafa em aço inox com parede dupla, capacidade de 750ml e bocal esportivo.",
    images: [
      "https://images.unsplash.com/photo-1602143393494-721d0030e1e1?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Acessórios",
    sizes: ["Único"],
    stock: 60,
    featured: false
  }
];

async function init() {
  await firebaseService.testConnection();
  await firebaseService.seedProducts(MOCK_PRODUCTS as any);
}

init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
