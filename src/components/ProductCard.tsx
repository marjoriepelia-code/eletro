import React from 'react';
import { Heart, ShoppingCart, Eye, Star, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenProductModal,
  onAddToCart,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-cyan-500/10"
    >
      {/* Top Media Frame */}
      <div className="relative aspect-[4/3] bg-slate-950/60 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-40" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isNew && (
            <span className="bg-cyan-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-md tracking-wider">
              Novo
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isWishlisted 
              ? 'bg-rose-500 text-white' 
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
          }`}
          title={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Card Hover */}
        <button
          id={`quickview-btn-${product.id}`}
          onClick={() => onOpenProductModal(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg cursor-pointer whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Visualização Rápida</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Category Label */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold text-cyan-400 uppercase tracking-wider">{product.brand}</span>
            <span>{product.categoryLabel}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onOpenProductModal(product)}
            className="font-['Outfit',sans-serif] text-base font-bold text-white hover:text-cyan-400 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-white">{product.rating}</span>
            <span className="text-slate-500">({product.reviewCount})</span>
          </div>

          {/* Mini Specs chips */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {product.specs.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60 truncate max-w-[140px]"
                title={`${spec.key}: ${spec.value}`}
              >
                {spec.value}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and Purchase Action */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <div>
            {product.originalPrice && (
              <span className="text-xs line-through text-slate-500 block">
                R$ {product.originalPrice.toLocaleString('pt-BR')}
              </span>
            )}
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-white font-['Outfit',sans-serif]">
                R$ {product.price.toLocaleString('pt-BR')}
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">à vista no PIX</span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              ou 12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')} sem juros
            </span>
          </div>

          {/* Action Buttons */}
          <button
            id={`add-to-cart-${product.id}`}
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-cyan-500 font-bold text-xs transition-all duration-200 cursor-pointer shadow-sm group/btn"
          >
            <ShoppingCart className="w-4 h-4 text-cyan-400 group-hover/btn:text-slate-950 transition-colors" />
            <span>Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>
    </div>
  );
};
