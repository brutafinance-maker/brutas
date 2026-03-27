import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../App';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-8 flex items-center justify-between border-b-2 border-black">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} strokeWidth={2.5} />
                <h2 className="text-3xl font-black tracking-tighter uppercase">CARRINHO</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-3 bg-black text-white rounded-none hover:bg-brutamed-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="w-24 h-24 bg-gray-100 rounded-none flex items-center justify-center">
                    <ShoppingBag size={40} className="text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-brutamed-text font-black uppercase tracking-[0.2em] text-sm">Seu carrinho está vazio</p>
                    <p className="text-brutamed-muted text-xs font-medium">Explore nossa coleção e encontre o seu estilo.</p>
                  </div>
                  <Link 
                    to="/produtos" 
                    onClick={() => setIsCartOpen(false)}
                    className="bg-black text-white px-12 py-5 rounded-none font-black text-[11px] tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-all"
                  >
                    Ver Coleção
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 group">
                    <div className="w-24 h-32 bg-gray-100 rounded-none overflow-hidden flex-shrink-0 border border-gray-100">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-black text-sm text-brutamed-text leading-tight uppercase tracking-tight">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="text-gray-300 hover:text-black transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[11px] text-brutamed-muted font-black uppercase tracking-[0.2em]">TAMANHO: {item.selectedSize}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border-2 border-black rounded-none px-3 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                            className="p-1 hover:text-brutamed-primary transition-colors"
                          >
                            <Minus size={12} strokeWidth={3} />
                          </button>
                          <span className="w-8 text-center font-black text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                            className="p-1 hover:text-brutamed-primary transition-colors"
                          >
                            <Plus size={12} strokeWidth={3} />
                          </button>
                        </div>
                        <span className="font-black text-sm text-brutamed-text">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t-2 border-black space-y-6 bg-white">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-brutamed-muted font-black uppercase tracking-[0.3em] text-[11px]">Subtotal</span>
                    <span className="text-2xl font-black text-brutamed-text">R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] text-brutamed-muted font-medium italic">Taxas e frete calculados no checkout.</p>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-black text-white text-center block py-8 rounded-none font-black text-sm tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-all duration-500 shadow-2xl"
                >
                  FINALIZAR COMPRA
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
