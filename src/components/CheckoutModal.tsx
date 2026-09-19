import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  QrCode, 
  Barcode, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowLeft,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  onClearCart: () => void;
}

type PaymentMethod = 'pix' | 'credit' | 'boleto';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: 'Marjorie Pelia',
    email: 'marjoriepelia@gmail.com',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    cep: '01310-100',
    street: 'Avenida Paulista, 1000',
    number: '1000',
    complement: 'Apto 42',
    city: 'São Paulo',
    state: 'SP',
    // Card fields
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'MARJORIE PELIA',
    cardExpiry: '12/29',
    cardCvv: '888',
    installments: '12',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 299 ? 0 : 29.90;
  // If pix, 5% extra discount
  const pixExtraDiscount = paymentMethod === 'pix' ? (subtotal * 0.05) : 0;
  const total = Math.max(0, subtotal - discountAmount - pixExtraDiscount + shipping);

  const handleCopyPix = () => {
    navigator.clipboard?.writeText('00020126580014br.gov.bcb.pix0136volttech-checkout-e4c80e6f5204000053039865802BR5920VoltTech Eletronicos6009Sao Paulo62070503***63047D4C');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSuccess(true);
      onClearCart();
    }, 1200);
  };

  return (
    <div 
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="checkout-modal-container"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Outfit',sans-serif] text-base font-bold text-white">
                Finalização de Compra Segura
              </h3>
              <p className="text-[11px] text-slate-400">
                Pagamento processado com segurança bancária ponta a ponta
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Order Success View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Pedido Confirmado com Sucesso!
              </span>
              <h2 className="font-['Outfit',sans-serif] text-2xl font-black text-white">
                Obrigado pela sua compra na VoltTech
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Enviamos os detalhes do pedido e o código de rastreamento para o e-mail: <strong className="text-white">{formData.email}</strong>
              </p>
            </div>

            {/* Order Details Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Número do Pedido:</span>
                <span className="font-mono font-bold text-cyan-400">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Forma de Pagamento:</span>
                <span className="font-semibold text-white uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Endereço de Entrega:</span>
                <span className="text-slate-200 text-right">{formData.street}, {formData.number} - {formData.city}/{formData.state}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span className="text-white">Total Pago:</span>
                <span className="text-emerald-400">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              Continuar Navegando na Loja
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Step 1: Customer Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>1. Dados Pessoais & Entrega</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">E-mail para Rastreamento</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">CPF para Nota Fiscal</label>
                  <input
                    type="text"
                    required
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div>
                  <label className="text-slate-400 block mb-1">CEP</label>
                  <input
                    type="text"
                    required
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <label className="text-slate-400 block mb-1">Endereço</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Número</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Selector */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  2. Método de Pagamento
                </h4>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  PIX ganha 5% OFF extra
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'pix' 
                      ? 'border-cyan-400 bg-cyan-500/10 text-white' 
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold">PIX Imediato</span>
                  <span className="text-[10px] text-emerald-400 font-medium">-5% Extra</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'credit' 
                      ? 'border-cyan-400 bg-cyan-500/10 text-white' 
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-bold">Cartão de Crédito</span>
                  <span className="text-[10px] text-slate-400">Até 12x s/ juros</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'boleto' 
                      ? 'border-cyan-400 bg-cyan-500/10 text-white' 
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Barcode className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold">Boleto Bancário</span>
                  <span className="text-[10px] text-slate-400">Compensação 1 dia</span>
                </button>
              </div>

              {/* Payment Specific Content */}
              {paymentMethod === 'pix' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">QR Code PIX gerado para este pedido:</span>
                    <span className="text-emerald-400 font-bold">5% de Desconto Computado</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center shrink-0">
                      {/* Stylized QR Code placeholder */}
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=00020126580014br.gov.bcb.pix0136volttech-electronics-checkout" 
                        alt="QR Code PIX"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 space-y-2 text-left">
                      <p className="text-slate-300">
                        1. Abra o app do seu banco e escolha <strong>Pagar com PIX</strong>.
                      </p>
                      <p className="text-slate-300">
                        2. Aponte a câmera para o QR Code ao lado ou utilize o código Copia e Cola.
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-medium border border-cyan-500/30 transition-colors cursor-pointer"
                      >
                        {copiedPix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPix ? 'Chave PIX copiada!' : 'Copiar Código PIX Copia e Cola'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'credit' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-slate-400 block mb-1">Número do Cartão</label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Nome Impresso no Cartão</label>
                      <input
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 uppercase"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-slate-400 block mb-1">Validade</label>
                        <input
                          type="text"
                          required
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">CVV</label>
                        <input
                          type="text"
                          required
                          value={formData.cardCvv}
                          onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-slate-400 block mb-1">Opção de Parcelamento</label>
                      <select
                        value={formData.installments}
                        onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                      >
                        <option value="1">1x de R$ {total.toFixed(2).replace('.', ',')} (à vista)</option>
                        <option value="3">3x de R$ {(total / 3).toFixed(2).replace('.', ',')} sem juros</option>
                        <option value="6">6x de R$ {(total / 6).toFixed(2).replace('.', ',')} sem juros</option>
                        <option value="10">10x de R$ {(total / 10).toFixed(2).replace('.', ',')} sem juros</option>
                        <option value="12">12x de R$ {(total / 12).toFixed(2).replace('.', ',')} sem juros</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'boleto' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <p>
                    O boleto bancário será gerado após a confirmação. Você terá até <strong>3 dias úteis</strong> para realizar o pagamento em qualquer banco ou casa lotérica.
                  </p>
                  <p className="text-slate-400">
                    O envio dos produtos ocorrerá logo após a compensação bancária.
                  </p>
                </div>
              )}
            </div>

            {/* Total Summary */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total a Pagar</span>
                <span className="font-['Outfit',sans-serif] text-2xl font-black text-cyan-400">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
                {paymentMethod === 'pix' && (
                  <span className="text-[11px] text-emerald-400 block">Inclui 5% de desconto PIX</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Processando Pedido...' : 'Confirmar e Pagar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
