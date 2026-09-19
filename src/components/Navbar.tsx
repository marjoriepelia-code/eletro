import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  Flame
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onNavigateToCatalog,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80">
      {/* Top promotional announcement bar */}
      <div id="top-announcement-bar" className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-600 text-white text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-3 overflow-hidden">
        <span className="flex items-center gap-1.5 font-semibold animate-pulse">
          <Zap className="w-3.5 h-3.5 fill-current text-yellow-300" />
          OFERTA ESPECIAL
        </span>
        <span className="hidden sm:inline text-cyan-100">|</span>
        <span className="truncate">
          Frete Grátis acima de R$ 299 • Use o cupom <span className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold text-yellow-300">TECH10</span> para 10% OFF
        </span>
        <span className="hidden md:inline text-cyan-100">|</span>
        <span className="hidden md:flex items-center gap-1 text-slate-100">
          <CreditCard className="w-3 h-3" /> Até 12x Sem Juros
        </span>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              id="brand-logo"
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-6 h-6 text-white fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Outfit',sans-serif] text-2xl font-bold tracking-tight text-white flex items-center gap-1">
                  Volt<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Tech</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 -mt-1">
                  Next-Gen Electronics
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar smartphones, notebooks, fones, monitores..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-900 border border-slate-700/80 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  id="header-search-clear-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              id="nav-link-ofertas"
              onClick={() => handleNavClick('flash-deals')}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer py-1"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Ofertas Relâmpago
            </button>
            <button
              id="nav-link-catalogo"
              onClick={() => handleNavClick('catalog-section')}
              className="hover:text-cyan-400 transition-colors cursor-pointer py-1"
            >
              Catálogo
            </button>
            <button
              id="nav-link-diferenciais"
              onClick={() => handleNavClick('diferenciais-section')}
              className="hover:text-cyan-400 transition-colors cursor-pointer py-1"
            >
              Vantagens
            </button>
            <button
              id="nav-link-avaliacoes"
              onClick={() => handleNavClick('reviews-section')}
              className="hover:text-cyan-400 transition-colors cursor-pointer py-1"
            >
              Avaliações
            </button>
            <button
              id="nav-link-faq"
              onClick={() => handleNavClick('faq-section')}
              className="hover:text-cyan-400 transition-colors cursor-pointer py-1"
            >
              Dúvidas
            </button>
          </nav>

          {/* Actions: Wishlist & Cart */}
          <div className="flex items-center gap-2.5">
            {/* Wishlist Button */}
            <button
              id="wishlist-toggle-btn"
              onClick={onOpenWishlist}
              title="Lista de Desejos"
              className="relative p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all cursor-pointer group"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold">Meu Carrinho</span>
              <span className="bg-cyan-500 text-slate-950 text-xs font-extrabold rounded-full px-2 py-0.5 min-w-[20px] text-center shadow-sm">
                {totalCartCount}
              </span>
            </button>

            {/* Mobile menu toggle button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (under header) */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar produtos, categorias..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden border-t border-slate-800 bg-slate-950 px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-medium text-slate-300">
            <button
              id="mobile-link-ofertas"
              onClick={() => handleNavClick('flash-deals')}
              className="flex items-center gap-2 text-left py-2 hover:text-cyan-400"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Ofertas Relâmpago
            </button>
            <button
              id="mobile-link-catalogo"
              onClick={() => handleNavClick('catalog-section')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Catálogo de Produtos
            </button>
            <button
              id="mobile-link-diferenciais"
              onClick={() => handleNavClick('diferenciais-section')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Por que a VoltTech?
            </button>
            <button
              id="mobile-link-avaliacoes"
              onClick={() => handleNavClick('reviews-section')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Depoimentos de Clientes
            </button>
            <button
              id="mobile-link-faq"
              onClick={() => handleNavClick('faq-section')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Perguntas Frequentes (FAQ)
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Garantia Nacional
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-cyan-400" />
              Envio Rápido 24h
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
