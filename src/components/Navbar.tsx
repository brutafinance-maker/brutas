import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../App';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-700 px-6 md:px-12",
        isScrolled ? "top-0 bg-white/90 backdrop-blur-2xl py-4 border-b border-gray-100 shadow-sm" : "top-0 bg-transparent py-8"
      )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 font-black text-[10px] uppercase tracking-[0.3em] text-brutamed-text/40">
          <Link to="/produtos" className="hover:text-black transition-colors relative group">
            PRODUTOS
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brutamed-primary transition-all group-hover:w-full" />
          </Link>
          <Link to="/produtos?category=Camisas" className="hover:text-black transition-colors relative group">
            CAMISAS
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brutamed-primary transition-all group-hover:w-full" />
          </Link>
          <Link to="/produtos?category=Moletons" className="hover:text-black transition-colors relative group">
            MOLETONS
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brutamed-primary transition-all group-hover:w-full" />
          </Link>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="flex items-center gap-3 group absolute left-1/2 -translate-x-1/2">
          <img 
            src="https://raw.githubusercontent.com/brutafinance-maker/brt1/main/Brutamed.png" 
            alt="BrutaMed Logo" 
            className="h-8 md:h-12 w-auto object-contain transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <span className="font-black text-xl md:text-3xl tracking-tighter text-brutamed-text uppercase">
            BRUTAMED
          </span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 md:gap-4">
          <button className="hidden md:flex p-3 rounded-full transition-all hover:bg-gray-100 text-brutamed-text">
            <Search size={20} strokeWidth={2.5} />
          </button>
          <button className="hidden md:flex p-3 rounded-full transition-all hover:bg-gray-100 text-brutamed-text">
            <User size={20} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 rounded-full transition-all hover:bg-gray-100 text-brutamed-text group"
          >
            <ShoppingBag size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 bg-black text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-full transition-all hover:bg-gray-100 text-brutamed-text"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col p-10 pt-32"
          >
            <div className="flex flex-col gap-8 font-black text-5xl md:text-7xl tracking-tighter text-brutamed-text uppercase">
              <Link to="/" className="hover:text-brutamed-primary transition-colors">HOME</Link>
              <Link to="/produtos" className="hover:text-brutamed-primary transition-colors">PRODUTOS</Link>
              <Link to="/produtos?category=Camisas" className="hover:text-brutamed-primary transition-colors">CAMISAS</Link>
              <Link to="/produtos?category=Moletons" className="hover:text-brutamed-primary transition-colors">MOLETONS</Link>
              <Link to="/produtos?category=Acessórios" className="hover:text-brutamed-primary transition-colors">ACESSÓRIOS</Link>
            </div>
            
            <div className="mt-auto space-y-8">
              <div className="h-[1px] bg-gray-100 w-full" />
              <div className="flex flex-col gap-4 font-black text-[10px] tracking-[0.3em] uppercase text-brutamed-muted">
                <p>MINHA CONTA</p>
                <p>RASTREAR PEDIDO</p>
                <p>AJUDA</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}
