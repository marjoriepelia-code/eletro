import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface FlashSaleProps {
  products: Product[];
  onOpenProductModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const FlashSale: React.FC<FlashSaleProps> = ({
  products,
  onOpenProductModal,
  onAddToCart,
}) => {
  const flashProducts = products.filter(p => p.isFlashDeal).slice(0, 4);

  // Real-time countdown timer: 06h : 42m : 18s
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  return (
    <section id="flash-deals" className="py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flash Sale Header with Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-amber-950/30 border border-red-900/30 mb-8 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-red-500/20 animate-pulse">
              <Flame className="w-7 h-7 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Estoque Limitado
                </span>
                <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                  ATÉ 25% OFF
                </span>
              </div>
              <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ofertas Relâmpago ⚡
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Termina em:</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-sm font-bold">
              <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700 text-white min-w-[36px] text-center shadow">
                {formatNumber(timeLeft.hours)}
                <span className="text-[9px] block text-slate-500 font-sans -mt-0.5">HORAS</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700 text-white min-w-[36px] text-center shadow">
                {formatNumber(timeLeft.minutes)}
                <span className="text-[9px] block text-slate-500 font-sans -mt-0.5">MIN</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700 text-amber-400 min-w-[36px] text-center shadow">
                {formatNumber(timeLeft.seconds)}
                <span className="text-[9px] block text-slate-500 font-sans -mt-0.5">SEG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map((product) => {
            const soldPercentage = Math.min(85, Math.max(45, 100 - product.stock * 3));
            return (
              <div
                key={product.id}
                id={`flash-product-card-${product.id}`}
                className="group relative flex flex-col rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-amber-500/10"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] bg-slate-950/60 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                  {/* Discount percentage tag */}
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md">
                    -{product.discountPercent}%
                  </span>

                  {/* Quick View Button on Hover */}
                  <button
                    onClick={() => onOpenProductModal(product)}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                    title="Espiar produto"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <h3 className="font-['Outfit',sans-serif] text-sm font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Stock progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Restam apenas <strong className="text-amber-400">{product.stock}</strong> un.</span>
                      <span>{soldPercentage}% vendido</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full" 
                        style={{ width: `${soldPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <span className="text-xs line-through text-slate-500 block">
                      R$ {product.originalPrice?.toLocaleString('pt-BR')}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold text-white font-['Outfit',sans-serif]">
                        R$ {product.price.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-medium">no PIX</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      ou 12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')} sem juros
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    id={`flash-add-cart-${product.id}`}
                    onClick={() => onAddToCart(product)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Aproveitar Oferta</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
