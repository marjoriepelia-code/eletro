import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Zap, 
  Share2,
  Heart
} from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(product.image);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    onClose();
  };

  return (
    <div 
      id="product-detail-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="product-detail-modal-container"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src={selectedImg}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.discountPercent && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                  -{product.discountPercent}% OFF
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImg === img ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Miniatura" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees bar */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>Frete Grátis com rastreio imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>12 meses de garantia de fábrica no Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>7 dias de devolução incondicional grátis</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details and Actions */}
          <div className="flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {product.brand} • {product.categoryLabel}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Compartilhar produto"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copiado!' : 'Compartilhar'}</span>
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      isWishlisted 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                    title="Favoritar"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              <h2 className="font-['Outfit',sans-serif] text-2xl font-bold text-white leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} avaliações de compradores verificados)</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Pricing Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif]">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-slate-500">
                      R$ {product.originalPrice.toLocaleString('pt-BR')}
                    </span>
                  )}
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                    5% OFF no PIX
                  </span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Ou em até 12x de <strong className="text-white">R$ {(product.price / 12).toFixed(2).replace('.', ',')}</strong> sem juros no cartão
                </span>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300">
                    Variação de Cor: <span className="text-white">{selectedColor}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                          selectedColor === c.name 
                            ? 'border-cyan-400 bg-cyan-500/10 text-white' 
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specs List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Especificações Técnicas
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="p-2 rounded bg-slate-950/60 border border-slate-800/80 text-[11px]">
                      <span className="text-slate-400 block">{spec.key}:</span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between border border-slate-700 bg-slate-950 rounded-xl p-1 w-full sm:w-auto">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-base font-bold"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-white min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-base font-bold"
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button
                id="modal-confirm-add-cart-btn"
                onClick={handleAdd}
                className="w-full flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Adicionar ao Carrinho • R$ {(product.price * quantity).toLocaleString('pt-BR')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
