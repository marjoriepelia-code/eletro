import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Headphones, 
  RotateCcw, 
  Cpu, 
  CreditCard,
  Award,
  Lock
} from 'lucide-react';

export const WhyUs: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: 'Garantia Nacional Oficial',
      description: '100% dos produtos são homologados pela Anatel, com nota fiscal eletrônica e no mínimo 12 meses de garantia direta.',
    },
    {
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      title: 'Envio Prioritário 24h',
      description: 'Logística integrada aos maiores centros de distribuição do país para entregas expressas de 24h a 48h em capitais.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-cyan-400" />,
      title: 'Suporte Técnico Humanizado',
      description: 'Converse com técnicos e especialistas antes e depois da sua compra para tirar dúvidas sobre setup e compatibilidade.',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-cyan-400" />,
      title: 'Troca Rápida Sem Burocracia',
      description: 'Até 7 dias para arrependimento gratuito e 30 dias para substituição imediata em caso de defeito de fabricação.',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-cyan-400" />,
      title: 'Condições Facilitadas',
      description: 'Parcele em até 12x sem juros (ou divida entre dois cartões de crédito) ou aproveite 5% de desconto à vista via PIX.',
    },
    {
      icon: <Lock className="w-6 h-6 text-cyan-400" />,
      title: 'Compra Blindada SSL',
      description: 'Criptografia de ponta e gateways de pagamento auditados internacionalmente para proteger seus dados pessoais.',
    },
  ];

  return (
    <section id="diferenciais-section" className="py-16 bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Compromisso com a Excelência
          </span>
          <h2 className="font-['Outfit',sans-serif] text-3xl font-bold text-white tracking-tight">
            Por que Comprar na VoltTech?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Mais do que vender gadgets de última geração, garantimos a você uma experiência de compra ágil, segura e com pós-venda premiado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-['Outfit',sans-serif] text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats counter strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/30 to-slate-950 border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-['Outfit',sans-serif] text-3xl font-extrabold text-white block">
              +15.000
            </span>
            <span className="text-xs text-slate-400">Eletrônicos Entregues</span>
          </div>
          <div>
            <span className="font-['Outfit',sans-serif] text-3xl font-extrabold text-cyan-400 block">
              99.4%
            </span>
            <span className="text-xs text-slate-400">Entregas no Prazo</span>
          </div>
          <div>
            <span className="font-['Outfit',sans-serif] text-3xl font-extrabold text-white block">
              4.9 / 5.0
            </span>
            <span className="text-xs text-slate-400">Média de Satisfação</span>
          </div>
          <div>
            <span className="font-['Outfit',sans-serif] text-3xl font-extrabold text-cyan-400 block">
              24h
            </span>
            <span className="text-xs text-slate-400">Despacho Expresso</span>
          </div>
        </div>

      </div>
    </section>
  );
};
