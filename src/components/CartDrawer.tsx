import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenCheckout: () => void;
  couponCode: string;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  couponCode,
  onApplyCoupon,
  discountAmount,
}) => {
  if (!isOpen) return null;

  const [inputCoupon, setInputCoupon] = useState(couponCode);
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    couponCode ? { type: 'success', text: 'Cupom de 10% OFF ativo!' } : null
  );

  // CEP shipping calculator simulation
  const [cepInput, setCepInput] = useState('');
  const [shippingResult, setShippingResult] = useState<{ type: string; price: number; days: string } | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 299;
  const shippingCost = isFreeShipping ? 0 : (shippingResult ? shippingResult.price : 29.90);
  const finalTotal = Math.max(0, subtotal - discountAmount + (subtotal > 0 ? shippingCost : 0));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const result = onApplyCoupon(inputCoupon);
    if (result.success) {
      setCouponMessage({ type: 'success', text: result.message });
    } else {
      setCouponMessage({ type: 'error', text: result.message });
    }
  };

  const handleCalcCep = (e: React.FormEvent) => {
    e.preventDefault();
    if (cepInput.replace(/\D/g, '').length >= 8) {
      if (isFreeShipping) {
        setShippingResult({ type: 'Expresso VoltTech', price: 0, days: '1 a 2 dias úteis' });
      } else {
        setShippingResult({ type: 'Sedex Convencional', price: 29.90, days: '2 a 4 dias úteis' });
      }
    }
  };

  return (
    <div 
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="cart-drawer-container"
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl text-slate-100 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white">
              Carrinho de Compras
            </h3>
            <span className="bg-slate-800 text-xs text-slate-300 font-semibold px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 text-xs">
          {subtotal >= 299 ? (
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Parabéns! Você ganhou <strong>Frete Grátis</strong> para todo o Brasil!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Faltam <strong>R$ {(299 - subtotal).toFixed(2).replace('.', ',')}</strong> para Frete Grátis</span>
                <span className="text-cyan-400 font-bold">{Math.round((subtotal / 299) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 299) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-800/80">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-bold text-white truncate font-['Outfit',sans-serif]">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer p-1"
                      title="Remover item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.selectedColor && (
                    <span className="text-[11px] text-slate-400 block">
                      Cor: {item.selectedColor}
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-2.5">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-700 bg-slate-950 rounded-lg p-0.5 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white rounded transition-colors cursor-pointer font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-white min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white rounded transition-colors cursor-pointer font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-xs font-bold text-white">
                      R$ {(item.product.price * item.quantity).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">Seu carrinho está vazio</p>
              <p className="text-xs text-slate-500">Explore os eletrônicos da loja e adicione seus favoritos!</p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                Voltar às compras
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary and Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
            
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                    placeholder="Cupom de Desconto (ex: TECH10)"
                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs uppercase tracking-wider text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[11px] flex items-center gap-1 ${
                  couponMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {couponMessage.type === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {couponMessage.text}
                </p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-900">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-slate-200 font-medium">R$ {subtotal.toLocaleString('pt-BR')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Desconto aplicado:</span>
                  <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frete para o Brasil:</span>
                <span className={isFreeShipping ? 'text-emerald-400 font-semibold' : 'text-slate-200'}>
                  {isFreeShipping ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total:</span>
                <div className="text-right">
                  <span className="font-['Outfit',sans-serif] text-xl text-cyan-400">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-normal">
                    ou 12x de R$ {(finalTotal / 12).toFixed(2).replace('.', ',')} s/ juros
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              id="cart-checkout-btn"
              onClick={onOpenCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <span>Finalizar Compra</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Ambiente de pagamento seguro com criptografia 256-bit
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
