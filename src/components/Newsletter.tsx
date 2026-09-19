import React, { useState } from 'react';
import { Mail, Zap, CheckCircle2, Gift } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section id="newsletter-section" className="py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/20 p-8 sm:p-12 shadow-2xl">
          {/* Background glow accent */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Gift className="w-3.5 h-3.5" />
              <span>CUPOM EXCLUSIVO DE BOAS-VINDAS</span>
            </div>

            <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ganhe R$ 50 OFF no Seu Primeiro Pedido
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
              Cadastre seu e-mail no Clube VIP VoltTech e receba promoções secretas antes do público geral, cupons semanais e lançamentos em primeira mão.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Pronto! Seu cupom <strong>VIP50</strong> de R$ 50 foi gerado e enviado para seu e-mail!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu melhor e-mail..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  Quero Meu Cupom
                </button>
              </form>
            )}

            <p className="text-[11px] text-slate-500">
              Respeitamos sua privacidade. Zero spam e cancelamento a qualquer momento com um clique.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
