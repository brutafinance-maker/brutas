import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Minus, Plus } from 'lucide-react';
import { firebaseService } from '../services/firebaseService';
import { Product } from '../types';
import { useCart } from '../App';
import { cn } from '../lib/utils';

import { ALL_PRODUCTS } from '../constants/products';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        // First check hardcoded products
        const hardcodedProduct = ALL_PRODUCTS.find(p => p.id === id);
        if (hardcodedProduct) {
          setProduct(hardcodedProduct);
          if (hardcodedProduct.sizes.length > 0) {
            setSelectedSize(hardcodedProduct.sizes[0]);
          }
          setLoading(false);
          return;
        }

        // Then check Firebase
        try {
          const data = await firebaseService.getProductById(id);
          setProduct(data);
          if (data && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
        <div className="aspect-square bg-gray-100 rounded-none" />
        <div className="space-y-8">
          <div className="h-4 bg-gray-100 rounded-none w-1/4" />
          <div className="h-12 bg-gray-100 rounded-none w-3/4" />
          <div className="h-8 bg-gray-100 rounded-none w-1/3" />
          <div className="h-32 bg-gray-100 rounded-none w-full" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 text-center space-y-6">
        <h1 className="text-5xl font-black tracking-tighter uppercase">PRODUTO NÃO ENCONTRADO</h1>
        <Link to="/produtos" className="bg-black text-white px-12 py-5 rounded-none font-black text-xs tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-all inline-block">Voltar para a Loja</Link>
      </div>
    );
  }

  const isUnavailable = product.status === 'unavailable';

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-32">
      <Link to="/produtos" className="inline-flex items-center gap-2 text-brutamed-muted font-black uppercase tracking-[0.3em] text-[11px] hover:text-brutamed-primary transition-colors mb-12">
        <ChevronLeft size={14} /> Voltar para a coleção
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
        {/* Image Gallery - Left Side (7/12) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/5] bg-[#F5F5F5] rounded-none overflow-hidden relative group border-2 border-gray-100">
            <motion.img 
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {product.images.length > 1 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                {product.images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "w-3 h-3 rounded-none transition-all duration-500",
                      selectedImage === idx ? "bg-brutamed-primary w-10" : "bg-black/20 hover:bg-black/40"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "aspect-square rounded-none overflow-hidden transition-all duration-500 bg-[#F5F5F5] border-2",
                  selectedImage === idx ? "border-black shadow-2xl" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info - Right Side (5/12) */}
        <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-black text-brutamed-primary uppercase tracking-[0.4em]">{product.category}</p>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-brutamed-text uppercase">{product.name}</h1>
            </div>
            
            <div className="flex items-center justify-between border-b-2 border-black pb-8">
              <span className="text-4xl font-black text-brutamed-text">
                {isUnavailable ? 'EM BREVE' : `R$ ${product.price.toFixed(2)}`}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                <span className="text-brutamed-muted text-[11px] font-black ml-3 uppercase tracking-[0.2em]">48 Reviews</span>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <p className="text-brutamed-muted leading-relaxed text-lg font-medium">
              {product.description}
            </p>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-[11px] tracking-[0.3em] uppercase text-brutamed-text">Selecione o Tamanho</h3>
                <button className="text-[11px] font-black text-brutamed-muted underline uppercase tracking-[0.3em] hover:text-brutamed-primary">Guia de Medidas</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-16 rounded-none flex items-center justify-center font-black text-sm transition-all duration-300 border-2",
                      selectedSize === size 
                        ? "border-black bg-black text-white shadow-2xl" 
                        : "border-gray-100 text-brutamed-text hover:border-black"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <button 
                onClick={() => addToCart(product, selectedSize)}
                disabled={isUnavailable || product.stock === 0}
                className="w-full bg-black text-white py-8 rounded-none font-black text-sm tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-all duration-500 shadow-2xl disabled:opacity-50 disabled:bg-gray-400 flex items-center justify-center gap-4"
              >
                <ShoppingBag size={24} />
                {isUnavailable ? 'INDISPONÍVEL' : 'ADICIONAR AO CARRINHO'}
              </button>
              <button className="w-full border-2 border-black text-brutamed-text py-8 rounded-none font-black text-sm tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-500">
                FAVORITAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
