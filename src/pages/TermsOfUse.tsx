import React from 'react';
import { motion } from 'motion/react';

export default function TermsOfUse() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 space-y-12 animate-fade-in-up">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Termos de Uso</h1>
        <div className="flex items-center gap-4">
          <span className="h-[1px] w-12 bg-brutamed-primary" />
          <p className="text-brutamed-muted font-black uppercase tracking-[0.3em] text-[10px]">Última atualização: Março 2026</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-brutamed-text/80 font-medium leading-relaxed space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">1. Uso da Plataforma</h2>
          <p>
            Ao acessar o site da BrutaMed, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">2. Responsabilidade do Usuário</h2>
          <p>
            O usuário se compromete a fornecer informações verdadeiras e completas no momento do cadastro e da compra. O uso indevido da plataforma, incluindo tentativas de fraude ou violação de segurança, resultará no bloqueio imediato do acesso.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">3. Informações sobre Pedidos</h2>
          <p>
            Todos os pedidos estão sujeitos à disponibilidade de estoque e confirmação de pagamento. A BrutaMed reserva-se o direito de cancelar pedidos em caso de erros de sistema ou informações incorretas de preços.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">4. Regras de Compra</h2>
          <p>
            As compras são destinadas ao consumidor final. A revenda de produtos BrutaMed sem autorização prévia é estritamente proibida. Os preços exibidos estão em Reais (BRL) e podem ser alterados sem aviso prévio.
          </p>
        </section>
      </div>
    </div>
  );
}
