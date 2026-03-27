import React from 'react';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 space-y-12 animate-fade-in-up">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Privacidade</h1>
        <div className="flex items-center gap-4">
          <span className="h-[1px] w-12 bg-brutamed-primary" />
          <p className="text-brutamed-muted font-black uppercase tracking-[0.3em] text-[10px]">Última atualização: Março 2026</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-brutamed-text/80 font-medium leading-relaxed space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">1. Dados Coletados</h2>
          <p>
            Coletamos apenas as informações necessárias para processar seu pedido e garantir uma boa experiência de compra:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nome completo;</li>
            <li>Telefone / WhatsApp;</li>
            <li>Endereço de entrega;</li>
            <li>Dados do curso (opcional).</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">2. Finalidade da Coleta</h2>
          <p>
            Seus dados são utilizados exclusivamente para o processamento de pedidos, envio de atualizações e comunicações institucionais da BrutaMed. Não utilizamos seus dados para spam ou finalidades não autorizadas.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">3. Segurança dos Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Seus dados são armazenados em servidores seguros e criptografados.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-brutamed-text uppercase">4. Não Compartilhamento</h2>
          <p>
            A BrutaMed não compartilha, vende ou aluga seus dados pessoais a terceiros. Seus dados só serão compartilhados com parceiros logísticos (para entrega) ou quando exigido por lei.
          </p>
        </section>
      </div>
    </div>
  );
}
