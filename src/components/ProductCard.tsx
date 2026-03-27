import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isUnavailable = product.status === 'unavailable';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-white transition-all duration-500 border border-gray-100 shadow-sm hover:shadow-md ${isUnavailable ? 'opacity-80' : ''}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        {/* Front Image */}
        <img 
          src={product.images[0]} 
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${product.images[1] ? 'group-hover:opacity-0' : ''}`}
          referrerPolicy="no-referrer"
        />
        
        {/* Back Image (on hover) */}
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} verso`}
            className="w-full h-full object-cover transition-opacity duration-500 absolute inset-0 opacity-0 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
        )}
        
        {/* Status Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          {isUnavailable ? (
            <button 
              disabled
              className="w-full bg-gray-400 text-white py-3 md:py-5 font-black text-[10px] tracking-[0.3em] uppercase cursor-not-allowed"
            >
              INDISPONÍVEL
            </button>
          ) : (
            <Link 
              to={`/produto/${product.id}`}
              className="w-full bg-black text-white py-3 md:py-5 font-black text-[10px] tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-colors block text-center translate-y-full group-hover:translate-y-0 duration-500"
            >
              COMPRAR
            </Link>
          )}
        </div>

        {product.featured && (
          <div className="absolute top-0 left-0 bg-brutamed-primary text-white text-[9px] font-black tracking-[0.2em] px-6 py-3 uppercase z-10">
            DESTAQUE
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 space-y-2">
        <div className="space-y-1">
          <p className="text-[9px] text-brutamed-primary font-black uppercase tracking-[0.3em]">{product.category}</p>
          <h3 className="font-black text-base md:text-lg text-brutamed-text leading-tight uppercase tracking-tighter">
            {product.name}
          </h3>
        </div>
        {!isUnavailable && (
          <div className="flex items-center justify-between">
            <span className="font-black text-lg md:text-xl text-brutamed-text tracking-tighter">R$ {product.price.toFixed(2)}</span>
          </div>
        )}
        {isUnavailable && (
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">EM BREVE</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
