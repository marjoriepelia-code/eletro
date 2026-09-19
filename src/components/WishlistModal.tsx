import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="wishlist-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="wishlist-modal-container"
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white">
              Lista de Desejos ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-cyan-400 font-semibold uppercase">{product.brand}</span>
                  <h4 className="text-xs font-bold text-white truncate font-['Outfit',sans-serif]">
                    {product.name}
                  </h4>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveWishlist(product);
                    }}
                    className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow"
                    title="Mover para o carrinho"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline">Comprar</span>
                  </button>

                  <button
                    onClick={() => onRemoveWishlist(product)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Remover dos favoritos"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Heart className="w-10 h-10 text-slate-700 mx-auto" />
              <p className="text-xs">Sua lista de desejos está vazia.</p>
              <p className="text-[11px] text-slate-500">Clique no ícone de coração nos produtos para salvá-los aqui.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
