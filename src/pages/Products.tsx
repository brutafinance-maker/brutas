import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { firebaseService } from '../services/firebaseService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { cn } from '../lib/utils';

import { ALL_PRODUCTS, CATEGORIES } from '../constants/products';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryIdParam = searchParams.get('category') || 'todos';
  
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await firebaseService.getProducts();
        setDbProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const allAvailableProducts = [...ALL_PRODUCTS, ...dbProducts];
    let result = allAvailableProducts;
    
    if (categoryIdParam !== 'todos') {
      const category = CATEGORIES.find(c => c.id === categoryIdParam);
      if (category) {
        result = result.filter(category.filter);
      }
    }
    
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Remove duplicates if a product matches multiple criteria (though filter logic should handle it)
    const uniqueProducts = Array.from(new Map(result.map(p => [p.id || p.name, p])).values());
    
    setFilteredProducts(uniqueProducts);
  }, [dbProducts, categoryIdParam, searchTerm]);

  const handleCategoryChange = (catId: string) => {
    if (catId === 'todos') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const activeCategoryTitle = categoryIdParam === 'todos' 
    ? 'PRODUTOS' 
    : CATEGORIES.find(c => c.id === categoryIdParam)?.title || 'PRODUTOS';

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-brutamed-text uppercase">
            {activeCategoryTitle}
          </h1>
          <div className="flex items-center gap-4">
            <span className="h-[2px] w-16 bg-brutamed-primary" />
            <p className="text-brutamed-muted font-black uppercase tracking-[0.4em] text-[11px]">
              {filteredProducts.length} ITENS ENCONTRADOS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brutamed-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="BUSCAR..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-none pl-14 pr-8 py-5 focus:ring-0 focus:border-brutamed-primary transition-all text-xs font-black tracking-widest uppercase placeholder:text-gray-300"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-5 bg-black text-white rounded-none hover:bg-brutamed-primary transition-all md:hidden"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-20">
        {/* Sidebar Filters */}
        <aside className="hidden md:block w-72 space-y-12 sticky top-32 h-fit">
          <div className="space-y-8">
            <h3 className="font-black text-[11px] tracking-[0.4em] uppercase text-brutamed-text border-b-2 border-black pb-4">CATEGORIAS</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleCategoryChange('todos')}
                className={cn(
                  "text-left px-6 py-4 rounded-none font-black text-xs tracking-widest transition-all uppercase group flex items-center justify-between border-2",
                  categoryIdParam === 'todos' 
                    ? "bg-black text-white border-black" 
                    : "text-brutamed-text/40 border-transparent hover:border-black hover:text-black hover:translate-x-2"
                )}
              >
                TODOS
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    "text-left px-6 py-4 rounded-none font-black text-xs tracking-widest transition-all uppercase group flex items-center justify-between border-2",
                    categoryIdParam === cat.id 
                      ? "bg-black text-white border-black" 
                      : "text-brutamed-text/40 border-transparent hover:border-black hover:text-black hover:translate-x-2"
                  )}
                >
                  {cat.title}
                  {categoryIdParam !== cat.id && (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Overlay */}
        <div className={cn(
          "fixed inset-0 bg-white z-[100] p-10 transition-transform duration-500 md:hidden",
          isFilterOpen ? "translate-y-0" : "translate-y-full"
        )}>
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-5xl font-black tracking-tighter uppercase">FILTROS</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-4 bg-black text-white rounded-none">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="font-black text-[11px] tracking-[0.4em] uppercase text-brutamed-muted">CATEGORIAS</h3>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => {
                    handleCategoryChange('todos');
                    setIsFilterOpen(false);
                  }}
                  className={cn(
                    "py-6 px-8 rounded-none font-black text-xs tracking-widest uppercase text-left transition-all border-2",
                    categoryIdParam === 'todos' 
                      ? "bg-black text-white border-black" 
                      : "bg-white border-gray-100 text-brutamed-text/40"
                  )}
                >
                  TODOS
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      handleCategoryChange(cat.id);
                      setIsFilterOpen(false);
                    }}
                    className={cn(
                      "py-6 px-8 rounded-none font-black text-xs tracking-widest uppercase text-left transition-all border-2",
                      categoryIdParam === cat.id 
                        ? "bg-black text-white border-black" 
                        : "bg-white border-gray-100 text-brutamed-text/40"
                    )}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-4 md:space-y-6 animate-pulse">
                  <div className="aspect-[4/5] bg-gray-100 rounded-none" />
                  <div className="space-y-2 md:space-y-3">
                    <div className="h-2 md:h-3 bg-gray-100 rounded-none w-1/3" />
                    <div className="h-4 md:h-5 bg-gray-100 rounded-none w-3/4" />
                    <div className="h-3 md:h-4 bg-gray-100 rounded-none w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-32 text-center space-y-8">
              <div className="w-24 h-24 bg-gray-100 rounded-none flex items-center justify-center mx-auto">
                <Search size={40} className="text-gray-300" />
              </div>
              <div className="space-y-2">
                <p className="text-brutamed-text font-black uppercase tracking-[0.2em] text-sm">Nenhum produto encontrado</p>
                <p className="text-brutamed-muted text-xs font-medium">Tente ajustar seus filtros ou busca.</p>
              </div>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  handleCategoryChange('Todos');
                }}
                className="bg-black text-white px-12 py-5 rounded-none font-black text-[11px] tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-all"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id || idx} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
