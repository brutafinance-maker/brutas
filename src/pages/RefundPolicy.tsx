import React from 'react';
import { motion } from 'motion/react';

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 space-y-12 animate-fade-in-up">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Trocas e Reembolsos</h1>
        <div className="flex items-center gap-4">
          <span className="h-[1px] w-12 bg-brutamed-primary" />
          <p className="text-brutamed-muted font-black uppercase tracking-[0.3em] text-[10px]">Última atualização: Março 2026</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-brutamed-text/80 font-medium leading-relaxed space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">1. Prazo para Troca</h2>
          <p>
            O cliente tem o prazo de até <strong>7 (sete) dias corridos</strong>, a contar da data do recebimento do produto, para solicitar a troca ou devolução por arrependimento, conforme o Código de Defesa do Consumidor.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">2. Condições do Produto</h2>
          <p>
            Para que a troca ou devolução seja aceita, o produto deve estar em perfeitas condições:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sem indícios de uso ou lavagem;</li>
            <li>Com a etiqueta original fixada;</li>
            <li>Na embalagem original ou similar que garanta a integridade do item.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">3. Como Solicitar</h2>
          <p>
            Para iniciar o processo, entre em contato conosco através do nosso WhatsApp oficial ou e-mail, informando o número do pedido e o motivo da solicitação. Nossa equipe responderá em até 48 horas úteis com as instruções.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">4. Custos de Frete</h2>
          <p>
            Em caso de defeito de fabricação ou erro no pedido, o frete de retorno e reenvio é por conta da BrutaMed. Em casos de troca por tamanho ou arrependimento, o custo do frete de retorno é de responsabilidade do cliente.
          </p>
        </section>
      </div>
    </div>
  );
}
