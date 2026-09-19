import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  BatteryCharging, 
  Eye, 
  ShoppingCart 
} from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  flagshipProduct: Product;
  onOpenProductModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onExploreCatalog: () => void;
  onExploreDeals: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  flagshipProduct,
  onOpenProductModal,
  onAddToCart,
  onExploreCatalog,
  onExploreDeals,
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  return (
    <section id="hero-section" className="relative overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value proposition, headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-semibold w-fit shadow-lg shadow-cyan-950/40">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>LANÇAMENTO OFICIAL NO BRASIL</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Outfit',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              A Próxima Geração da <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Tecnologia</span> Está Aqui.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Descubra os eletrônicos mais avançados do planeta com certificação oficial, 
              suporte especializado e envio prioritário para todo o Brasil em até 24 horas.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <button
                id="hero-cta-catalog-btn"
                onClick={onExploreCatalog}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-deals-btn"
                onClick={onExploreDeals}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Ofertas da Semana</span>
              </button>
            </div>

            {/* Trust highlights checklist */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>12x Sem Juros no Cartão</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>5% OFF no PIX Imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Garantia de 12 Meses</span>
              </div>
            </div>

            {/* Social proof rating */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                  alt="Cliente VoltTech"
                  referrerPolicy="no-referrer"
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
                  alt="Cliente VoltTech"
                  referrerPolicy="no-referrer"
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" 
                  alt="Cliente VoltTech"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-white ml-1.5">4.9/5</span>
                </div>
                <p className="text-slate-400 mt-0.5">+15.000 clientes satisfeitos em todo o Brasil</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 border border-slate-800 shadow-2xl shadow-cyan-950/30">
              
              {/* Product Badge Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  Destaque da Semana
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
                  Economize R$ 1.100
                </span>
              </div>

              {/* Product Image Frame */}
              <div className="relative group overflow-hidden rounded-xl bg-slate-900/60 aspect-[4/3] flex items-center justify-center border border-slate-800">
                <img
                  src={flagshipProduct.image}
                  alt={flagshipProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                
                {/* Overlay details */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Neural Bionic 4nm</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700">
                    <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                    <span>5.200 mAh</span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      {flagshipProduct.brand} • {flagshipProduct.categoryLabel}
                    </span>
                    <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-white">
                      {flagshipProduct.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs line-through text-slate-500 block">
                      R$ {flagshipProduct.originalPrice?.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-2xl font-black text-white font-['Outfit',sans-serif]">
                      R$ {flagshipProduct.price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {flagshipProduct.tagline}
                </p>

                {/* Color Selector */}
                {flagshipProduct.colors && (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400">Cor: <span className="text-white font-medium">{flagshipProduct.colors[selectedColorIdx].name}</span></span>
                    <div className="flex items-center gap-2">
                      {flagshipProduct.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColorIdx(idx)}
                          className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                            selectedColorIdx === idx ? 'border-cyan-400 scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button
                    id="hero-quickview-btn"
                    onClick={() => onOpenProductModal(flagshipProduct)}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver Detalhes</span>
                  </button>

                  <button
                    id="hero-add-cart-btn"
                    onClick={() => onAddToCart(flagshipProduct)}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Comprar Agora</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Brand Key Highlights Bar below hero */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Envio Rápido</h4>
              <p className="text-xs text-slate-400">Postagem expressa em 24h</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Garantia Nacional</h4>
              <p className="text-xs text-slate-400">12 meses com nota fiscal</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">PIX com 5% OFF</h4>
              <p className="text-xs text-slate-400">Desconto aplicado na hora</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Troca Fácil</h4>
              <p className="text-xs text-slate-400">30 dias para devolução</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
