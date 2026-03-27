import React from 'react';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="https://raw.githubusercontent.com/brutafinance-maker/brt1/main/Brutamed.png" 
              alt="BrutaMed Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <span className="font-black text-2xl tracking-tighter uppercase">BRUTAMED</span>
          </Link>
          <p className="text-gray-400 text-xs font-medium leading-relaxed uppercase tracking-widest">
            Santarém - Pará<br />
            Atlética de Medicina do Oeste do Pará
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brutamed-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brutamed-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brutamed-primary transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-[10px] tracking-[0.3em] uppercase text-white">LINKS ÚTEIS</h3>
          <ul className="space-y-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/produtos" className="hover:text-white transition-colors">Todos os Produtos</Link></li>
            <li><Link to="/produtos?category=Camisas" className="hover:text-white transition-colors">Camisas</Link></li>
            <li><Link to="/produtos?category=Acessórios" className="hover:text-white transition-colors">Acessórios</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-[10px] tracking-[0.3em] uppercase text-white">INSTITUCIONAL</h3>
          <ul className="space-y-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
            <li><Link to="/trocas" className="hover:text-white transition-colors">Política de Troca</Link></li>
            <li><Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            <li><Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-[10px] tracking-[0.3em] uppercase text-white">CONTATO</h3>
          <ul className="space-y-4 text-gray-400 text-[10px] font-bold tracking-widest uppercase">
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-brutamed-primary" />
              <span>(93) 99999-9999</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-brutamed-primary" />
              <span>contato@brutamed.com.br</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={14} className="text-brutamed-primary" />
              <span>Santarém, PA - Brasil</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase text-center md:text-left space-y-1">
          <p>© {new Date().getFullYear()} BRUTAMED - SANTARÉM, PARÁ</p>
          <p>ASSOCIAÇÃO ATLÉTICA ACADÊMICA DE MEDICINA DO OESTE DO PARÁ</p>
        </div>
        <div className="flex gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix.png" alt="Pix" className="h-6 grayscale opacity-50 hover:opacity-100 transition-opacity" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 grayscale opacity-50 hover:opacity-100 transition-opacity" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 grayscale opacity-50 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </footer>
  );
}
