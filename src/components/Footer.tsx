import React from 'react';
import { Zap, ShieldCheck, Mail, Phone, MapPin, ArrowUp, Heart } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatClick = (category: string) => {
    onSelectCategory(category);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Presentation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Zap className="w-5 h-5 fill-white/20" />
              </div>
              <span className="font-['Outfit',sans-serif] text-2xl font-bold text-white tracking-tight">
                Volt<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Tech</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sua loja especializada em eletrônicos de ponta. Tecnologia de última geração, procedência garantida e atendimento dedicado para apaixonados por inovação.
            </p>

            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>(11) 4003-8822 • Seg. a Sex. das 9h às 18h</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>atendimento@volttech.com.br</span>
              </div>
            </div>
          </div>

          {/* Electronic Categories */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white uppercase tracking-wider">
              Categorias
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleCatClick('smartphones')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Smartphones & Dobráveis
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('laptops')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Notebooks & Ultrabooks
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('audio')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Fones ANC & Áudio Hi-Res
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('wearables')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Smartwatches & Pulseiras
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('gamer')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Setup Gamer & Periféricos
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('acessorios')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Docks, Cabos e Hubs
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2">
              <li><a href="#hero-section" className="hover:text-cyan-400 transition-colors">Sobre a VoltTech</a></li>
              <li><a href="#diferenciais-section" className="hover:text-cyan-400 transition-colors">Termos de Garantia Oficial</a></li>
              <li><a href="#faq-section" className="hover:text-cyan-400 transition-colors">Política de Entregas & Frete</a></li>
              <li><a href="#faq-section" className="hover:text-cyan-400 transition-colors">Trocas e Devoluções (CDC)</a></li>
              <li><a href="#newsletter-section" className="hover:text-cyan-400 transition-colors">Clube VIP e Cupons</a></li>
              <li><a href="#faq-section" className="hover:text-cyan-400 transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Security and Certifications */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white uppercase tracking-wider">
              Segurança & Confiança
            </h4>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block text-[11px]">Site Blindado SSL</strong>
                  <span className="text-[10px] text-slate-500">Criptografia 256-Bit</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </div>
                <div>
                  <strong className="text-white block text-[11px]">Reclame Aqui RA1000</strong>
                  <span className="text-[10px] text-slate-500">Nota 9.4 / 10 em Atendimento</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                  ★
                </div>
                <div>
                  <strong className="text-white block text-[11px]">Google Safe Browsing</strong>
                  <span className="text-[10px] text-slate-500">100% Livre de Ameaças</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Payment Methods Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-semibold mr-2">Formas de Pagamento:</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold font-mono">PIX</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200 font-semibold">Visa</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200 font-semibold">Mastercard</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200 font-semibold">Elo</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200 font-semibold">Hipercard</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200 font-semibold">Boleto</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Legal and Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 text-center space-y-1 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} VoltTech Comércio de Eletrônicos Ltda. CNPJ: 45.892.120/0001-94. Todos os direitos reservados.
          </p>
          <p className="text-slate-400">
            Os preços e condições de pagamento são válidos exclusivamente para compras via internet. Fotos meramente ilustrativas.
          </p>
        </div>

      </div>
    </footer>
  );
};
