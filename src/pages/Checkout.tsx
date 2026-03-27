import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ArrowLeft, Phone, User, GraduationCap, CreditCard, QrCode } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../App';
import { firebaseService } from '../services/firebaseService';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinishOrder = async () => {
    setLoading(true);
    try {
      const orderId = await firebaseService.createOrder({
        customer: formData,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize
        })),
        total: cartTotal,
        paymentMethod: 'pix'
      });

      if (orderId) {
        setStep(3);
        clearCart();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 text-center space-y-8">
        <div className="w-24 h-24 bg-gray-100 rounded-none flex items-center justify-center mx-auto">
          <CreditCard size={40} className="text-brutamed-primary" />
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-brutamed-text uppercase">SEU CARRINHO ESTÁ VAZIO</h1>
        <Link to="/produtos" className="bg-black text-white px-12 py-5 rounded-none font-black text-xs tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-all inline-block">Voltar para a Loja</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Main Content */}
        <div className="lg:col-span-7 space-y-16">
          {/* Steps Indicator */}
          {step !== 3 && (
            <div className="flex items-center justify-between max-w-md mx-auto">
              <StepIndicator number={1} title="INFO" active={step >= 1} completed={step > 1} />
              <div className="h-[2px] bg-gray-100 flex-grow mx-4 rounded-none relative overflow-hidden">
                <div className={cn("absolute inset-0 bg-black transition-all duration-700 ease-out", step > 1 ? 'w-full' : 'w-0')} />
              </div>
              <StepIndicator number={2} title="PAGAMENTO" active={step >= 2} completed={step > 2} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-brutamed-text uppercase">SUAS INFORMAÇÕES</h2>
                  <div className="flex items-center gap-4">
                    <span className="h-[2px] w-16 bg-brutamed-primary" />
                    <p className="text-brutamed-muted font-black uppercase tracking-[0.4em] text-[11px]">DADOS PARA ENTREGA</p>
                  </div>
                </div>

                <form onSubmit={handleSubmitInfo} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField 
                      label="NOME COMPLETO" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      icon={<User size={18} />} 
                      required 
                      placeholder="DIGITE SEU NOME"
                    />
                    <InputField 
                      label="WHATSAPP" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      icon={<Phone size={18} />} 
                      required 
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <InputField 
                    label="CURSO (OPCIONAL)" 
                    name="course" 
                    value={formData.course} 
                    onChange={handleInputChange} 
                    icon={<GraduationCap size={18} />} 
                    placeholder="EX: MEDICINA"
                  />
                  <button type="submit" className="w-full bg-black text-white py-8 rounded-none font-black text-sm tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-all duration-500 shadow-2xl">
                    CONTINUAR PARA PAGAMENTO
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-brutamed-text uppercase">PAGAMENTO</h2>
                  <div className="flex items-center gap-4">
                    <span className="h-[2px] w-16 bg-brutamed-primary" />
                    <p className="text-brutamed-muted font-black uppercase tracking-[0.4em] text-[11px]">PIX COPIA E COLA</p>
                  </div>
                </div>

                <div className="bg-[#F5F5F5] rounded-none p-10 space-y-10 border-2 border-black">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-black rounded-none flex items-center justify-center text-white shadow-2xl">
                      <QrCode size={32} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-2xl tracking-tight text-brutamed-text uppercase">PIX SEGURO</h3>
                      <p className="text-brutamed-muted text-xs font-medium">Confirmação instantânea e processamento imediato.</p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-none border-2 border-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm group">
                    <code className="text-[11px] font-mono break-all text-brutamed-muted flex-grow">
                      00020126580014BR.GOV.BCB.PIX013645892345-4589-4589-4589-458945894589520400005303986540510.005802BR5913BRUTAMED LOJA6009SAO PAULO62070503***6304E2B1
                    </code>
                    <button className="px-10 py-5 bg-black text-white rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-brutamed-primary transition-all whitespace-nowrap shadow-xl">
                      COPIAR CÓDIGO
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <button 
                      onClick={() => setStep(1)} 
                      className="px-12 py-8 rounded-none font-black text-sm tracking-widest bg-white text-brutamed-text border-2 border-black hover:bg-gray-50 transition-all flex items-center justify-center gap-3 uppercase"
                    >
                      <ArrowLeft size={18} /> VOLTAR
                    </button>
                    <button 
                      onClick={handleFinishOrder} 
                      disabled={loading}
                      className="flex-grow bg-black text-white py-8 rounded-none font-black text-sm tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-all duration-500 shadow-2xl flex items-center justify-center gap-4"
                    >
                      {loading ? 'PROCESSANDO...' : 'FINALIZAR PEDIDO'}
                      {!loading && <ChevronRight size={20} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-16 rounded-none border-4 border-black shadow-2xl text-center space-y-10 max-w-2xl mx-auto"
              >
                <div className="w-32 h-32 bg-green-50 text-green-500 rounded-none flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={64} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-6xl font-black tracking-tighter text-brutamed-text uppercase">PEDIDO REALIZADO</h2>
                  <p className="text-brutamed-muted font-medium max-w-md mx-auto leading-relaxed">
                    Obrigado por escolher a BrutaMed. Seu pedido foi processado com sucesso e em breve entraremos em contato via WhatsApp.
                  </p>
                </div>
                <div className="p-8 bg-[#F5F5F5] rounded-none inline-block border-2 border-black">
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brutamed-muted mb-2">NÚMERO DO PEDIDO</p>
                  <p className="text-4xl font-black text-brutamed-text tracking-tighter">#BM-{Math.floor(Math.random() * 10000)}</p>
                </div>
                <button 
                  onClick={() => navigate('/')} 
                  className="w-full bg-black text-white py-8 rounded-none font-black text-sm tracking-[0.3em] uppercase hover:bg-brutamed-primary transition-all duration-500 shadow-xl"
                >
                  VOLTAR PARA O INÍCIO
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        {step !== 3 && (
          <div className="lg:col-span-5">
            <div className="bg-[#F5F5F5] rounded-none p-10 sticky top-32 space-y-10 border-2 border-black">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-[11px] tracking-[0.4em] text-brutamed-muted uppercase">RESUMO DO PEDIDO</h3>
                <span className="bg-black text-white px-4 py-2 rounded-none font-black text-[11px]">{cart.length} ITENS</span>
              </div>
              
              <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 group">
                    <div className="w-20 h-24 bg-white rounded-none overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center space-y-1">
                      <h4 className="font-black text-sm text-brutamed-text uppercase tracking-tight">{item.name}</h4>
                      <p className="text-[11px] text-brutamed-muted font-black uppercase tracking-[0.2em]">TAM: {item.selectedSize} | QTD: {item.quantity}</p>
                      <p className="font-black text-base text-brutamed-text">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t-2 border-black space-y-4">
                <div className="flex justify-between text-[11px] font-black text-brutamed-muted uppercase tracking-[0.3em]">
                  <span>SUBTOTAL</span>
                  <span className="text-brutamed-text">R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black text-brutamed-muted uppercase tracking-[0.3em]">
                  <span>FRETE</span>
                  <span className="text-brutamed-primary">GRÁTIS</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t-2 border-black">
                  <span className="font-black text-[11px] uppercase tracking-[0.4em] text-brutamed-muted pb-1">TOTAL</span>
                  <span className="font-black text-5xl text-brutamed-text tracking-tighter">R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-6 bg-white/50 backdrop-blur-sm rounded-none border border-black/10">
                <p className="text-[11px] text-brutamed-muted font-medium leading-relaxed">
                  Ao finalizar o pedido, você concorda com nossos termos de serviço e política de privacidade.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({ number, title, active, completed }: { number: number, title: string, active: boolean, completed: boolean }) {
  return (
    <div className={cn(
      "flex flex-col items-center gap-2 transition-all",
      active ? "opacity-100" : "opacity-30"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-none flex items-center justify-center font-black text-sm transition-all border-2",
        completed ? "bg-brutamed-primary border-brutamed-primary text-white shadow-lg" : active ? "bg-black border-black text-white shadow-lg" : "bg-white border-gray-100 text-gray-400"
      )}>
        {completed ? <CheckCircle2 size={20} /> : number}
      </div>
      <span className="font-black text-[11px] uppercase tracking-widest text-brutamed-text/60 hidden sm:inline">{title}</span>
    </div>
  );
}

function InputField({ label, icon, ...props }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[11px] font-black uppercase tracking-widest text-brutamed-text/40 ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brutamed-text/30">
          {icon}
        </div>
        <input 
          {...props}
          className="w-full bg-white border-2 border-gray-100 rounded-none pl-14 pr-6 py-5 focus:ring-0 focus:border-black transition-all font-black text-xs uppercase tracking-widest placeholder:text-gray-200"
        />
      </div>
    </div>
  );
}
