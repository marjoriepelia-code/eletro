import React from 'react';
import { Star, CheckCircle2, ThumbsUp, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Opinião de Quem Comprou
            </span>
            <h2 className="font-['Outfit',sans-serif] text-3xl font-bold text-white tracking-tight">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Avaliações reais de clientes com pedidos confirmados e entregues
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div className="text-xs">
              <strong className="text-white">4.9 / 5.0</strong>
              <span className="text-slate-400 ml-1">(Mais de 3.400 reviews)</span>
            </div>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Compra Verificada
                    </span>
                  )}
                </div>

                {/* Title and Comment */}
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                  "{review.title}"
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-white truncate">{review.author}</h5>
                  <p className="text-[10px] text-slate-400">{review.location} • {review.date}</p>
                  <p className="text-[10px] text-cyan-400 font-medium truncate mt-0.5">
                    Item: {review.productName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
