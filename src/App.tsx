/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Heart, ShoppingBag, X } from 'lucide-react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CategoryId } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FlashSale } from './components/FlashSale';
import { ProductCatalog } from './components/ProductCatalog';
import { WhyUs } from './components/WhyUs';
import { ReviewsSection } from './components/ReviewsSection';
import { Newsletter } from './components/Newsletter';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  // Store State
  const [products] = useState<Product[]>(PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // AeroPhone 16 Pro Max
      quantity: 1,
      selectedColor: 'Titânio Grafite',
    },
    {
      product: PRODUCTS[2], // SoundPulse Studio ANC Pro
      quantity: 1,
      selectedColor: 'Preto Matte',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set([PRODUCTS[1].id, PRODUCTS[3].id]));
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // Discounts and Coupons
  const [couponCode, setCouponCode] = useState<string>('TECH10');
  
  // Toast Alert Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; icon?: 'cart' | 'heart' } | null>(null);

  const showToast = (text: string, icon: 'cart' | 'heart' = 'cart') => {
    setToastMessage({ text, icon });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, color?: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        if (color) updated[existingIdx].selectedColor = color;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedColor: color || product.colors?.[0]?.name,
          },
        ];
      }
    });
    showToast(`"${product.name}" adicionado ao carrinho!`, 'cart');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(product.id)) {
        updated.delete(product.id);
        showToast(`Removido da lista de desejos`, 'heart');
      } else {
        updated.add(product.id);
        showToast(`"${product.name}" salvo nos favoritos!`, 'heart');
      }
      return updated;
    });
  };

  // Coupon handling
  const handleApplyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'TECH10') {
      setCouponCode('TECH10');
      return { success: true, message: 'Cupom de 10% OFF aplicado com sucesso!' };
    }
    if (formatted === 'VIP50') {
      setCouponCode('VIP50');
      return { success: true, message: 'Cupom VIP de R$ 50 aplicado com sucesso!' };
    }
    return { success: false, message: 'Cupom inválido ou expirado. Tente TECH10.' };
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = couponCode === 'TECH10' 
    ? cartSubtotal * 0.10 
    : couponCode === 'VIP50' 
      ? Math.min(50, cartSubtotal) 
      : 0;

  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));
  const flagshipProduct = products[0]; // AeroPhone 16 Pro Max

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDeals = () => {
    const el = document.getElementById('flash-deals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div 
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/50 text-white text-xs font-semibold shadow-2xl shadow-cyan-950/80 animate-in slide-in-from-bottom-5 duration-300"
        >
          {toastMessage.icon === 'heart' ? (
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          )}
          <span>{toastMessage.text}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header / Navbar */}
      <Navbar
        cartItems={cartItems}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateToCatalog={scrollToCatalog}
      />

      {/* Main Landing Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          flagshipProduct={flagshipProduct}
          onOpenProductModal={(p) => setModalProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onExploreCatalog={scrollToCatalog}
          onExploreDeals={scrollToDeals}
        />

        {/* Category Selector */}
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Flash Sale Offers with Countdown Timer */}
        <FlashSale
          products={products}
          onOpenProductModal={(p) => setModalProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
        />

        {/* Interactive Products Catalog */}
        <ProductCatalog
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onOpenProductModal={(p) => setModalProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
        />

        {/* Brand Value Pillars / Why Us */}
        <WhyUs />

        {/* Verified Customer Testimonials */}
        <ReviewsSection />

        {/* VIP Club Newsletter */}
        <Newsletter />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={(cat) => setSelectedCategory(cat)} />

      {/* Quick View Product Modal */}
      <ProductModal
        product={modalProduct}
        isOpen={!!modalProduct}
        isWishlisted={modalProduct ? wishlistIds.has(modalProduct.id) : false}
        onClose={() => setModalProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        couponCode={couponCode}
        onApplyCoupon={handleApplyCoupon}
        discountAmount={discountAmount}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Simulator Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={discountAmount}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
