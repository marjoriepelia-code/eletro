import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/products';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-16 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-['Outfit',sans-serif] text-3xl font-bold text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Tudo o que você precisa saber sobre compras, segurança e entregas na VoltTech
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-colors overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-900 border-cyan-500/40' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40 uppercase">
                      {faq.category}
                    </span>
                    <span className="font-['Outfit',sans-serif] text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact help card */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Ainda tem alguma dúvida técnica?</h4>
              <p className="text-xs text-slate-400">Nossa equipe de especialistas em eletrônicos atende em minutos.</p>
            </div>
          </div>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white border border-slate-700 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
          >
            Falar no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
