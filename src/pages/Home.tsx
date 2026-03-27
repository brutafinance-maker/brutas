import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ShoppingBag, ArrowRight, Filter } from 'lucide-react';
import { Product } from '../types';
import { firebaseService } from '../services/firebaseService';
import ProductCard from '../components/ProductCard';

import { ALL_PRODUCTS, CATEGORIES } from '../constants/products';
import CategorySection from '../components/sections/CategorySection';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await firebaseService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('produtos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Clean Art Banner */}
      <section 
        className="relative h-[90vh] w-full bg-cover bg-center bg-no-repeat flex items-end justify-center overflow-hidden"
        style={{ backgroundImage: "url('https://raw.githubusercontent.com/brutafinance-maker/brt1/main/WhatsApp%20Image%202026-03-26%20at%2019.43.46.jpeg')" }}
      >
        <div className="pb-16 md:pb-20 z-10">
          <button 
            onClick={scrollToProducts}
            className="bg-black text-white px-10 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-brutamed-primary transition-all duration-300 shadow-xl active:scale-95"
          >
            VER PRODUTOS
          </button>
        </div>
      </section>

      {/* Categories Navigation (Sticky) */}
      <section id="produtos" className="bg-black py-6 sticky top-20 z-40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center gap-4 md:gap-8 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  const el = document.getElementById(cat.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="text-[10px] font-black uppercase tracking-[0.3em] transition-all px-4 py-2 text-gray-500 hover:text-white"
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <div className="bg-white">
        {CATEGORIES.map((cat) => {
          const catProducts = [...ALL_PRODUCTS, ...products].filter(cat.filter);
          return (
            <CategorySection 
              key={cat.id} 
              id={cat.id} 
              title={cat.title} 
              products={catProducts} 
            />
          );
        })}
      </div>

      {/* Newsletter - Minimalist */}
      <section className="bg-black text-white py-32">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            BRUTAMED NÃO SE EXPLICA, SE VIVE
          </h2>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">
            Receba lançamentos e promoções exclusivas da BrutaMed.
          </p>
          <form className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="SEU MELHOR E-MAIL" 
              className="flex-grow bg-white/5 border border-white/10 px-8 py-5 font-black text-[10px] tracking-widest focus:outline-none focus:border-brutamed-primary transition-colors uppercase"
            />
            <button className="btn-primary">
              INSCREVER
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
