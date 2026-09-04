import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag,
  Trash2, 
  ArrowLeft, 
  ShieldCheck, 
  Scissors, 
  CheckCircle2,
  Lock,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartCheckoutView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalINR,
    formatPrice,
    setCurrentView,
    currency
  } = useStore();

  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'shipping' | 'payment' | 'success'>('bag');
  const [shippingDetails, setShippingDetails] = useState({
    fullName: 'Sunaina Singhania',
    email: 'sunaina@heritagecouture.com',
    phone: '+91 98100 19700',
    address: 'B-42, Anand Niketan, Near Embassy Area',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110021',
    country: 'India',
    isGiftWrapped: true
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCostINR = cartTotalINR > 4999 ? 0 : 500;
  const grandTotalINR = cartTotalINR + shippingCostINR;

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      clearCart();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1500);
  };

  if (checkoutStep === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-fade-in space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-cinzel text-[#C5A059] uppercase tracking-widest font-bold">
            Order Confirmed • Est. 1970 Atelier Shipped
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#5E1A2C]">
            Thank You For Your Patronage
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Your heirloom order <strong>#MB-2026-{Math.floor(100000 + Math.random() * 900000)}</strong> has been received by our South Extension atelier.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#E8DFD8] shadow-sm max-w-md mx-auto text-left text-xs space-y-3">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">Delivery Address:</span>
            <span className="font-medium text-gray-900 text-right">{shippingDetails.address}, {shippingDetails.city}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">Authentication:</span>
            <span className="font-bold text-[#0F3A5D]">Silk Mark Guarantee Seal Included</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">Tailoring Status:</span>
            <span className="font-medium text-[#5E1A2C]">Assigned to Senior Master Tailor</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Dispatch Window:</span>
            <span className="font-medium text-emerald-700">Insured 24-48 Hour Courier</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => {
              setCheckoutStep('bag');
              setCurrentView('home');
            }}
            className="crimson-btn px-8 py-3 rounded text-xs font-cinzel uppercase font-semibold tracking-wider"
          >
            Return to Flagship Boutique
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#FAF7F5] border border-[#C5A059] flex items-center justify-center mx-auto text-[#5E1A2C]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold text-[#1A1718]">Your Luxury Bag Is Empty</h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Discover our 54-year heritage collection of Banarasi silks, handcrafted Zardozi lehengas, and prêt kurtas.
          </p>
        </div>
        <button
          onClick={() => setCurrentView('catalog')}
          className="gold-shimmer-btn px-8 py-3 rounded text-xs font-cinzel uppercase tracking-wider font-semibold shadow"
        >
          Explore Festive Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fade-in space-y-8">
      {/* Checkout Progress Stepper */}
      <div className="max-w-xl mx-auto flex items-center justify-between text-xs font-cinzel font-semibold">
        <button
          onClick={() => setCheckoutStep('bag')}
          className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
            checkoutStep === 'bag' ? 'border-[#5E1A2C] text-[#5E1A2C]' : 'border-transparent text-gray-400'
          }`}
        >
          <span>1. Luxury Bag ({cart.length})</span>
        </button>
        <span className="text-gray-300">→</span>
        <button
          onClick={() => setCheckoutStep('shipping')}
          className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
            checkoutStep === 'shipping' ? 'border-[#5E1A2C] text-[#5E1A2C]' : 'border-transparent text-gray-400'
          }`}
        >
          <span>2. Insured Shipping</span>
        </button>
        <span className="text-gray-300">→</span>
        <button
          onClick={() => setCheckoutStep('payment')}
          className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
            checkoutStep === 'payment' ? 'border-[#5E1A2C] text-[#5E1A2C]' : 'border-transparent text-gray-400'
          }`}
        >
          <span>3. Encrypted Payment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Current Step Content */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-6">
          {checkoutStep === 'bag' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h2 className="font-serif text-xl font-bold text-[#1A1718]">Review Selected Creations</h2>
                <button
                  onClick={() => setCurrentView('catalog')}
                  className="text-xs font-cinzel text-[#5E1A2C] hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Continue Browsing
                </button>
              </div>

              <div className="space-y-4 divide-y divide-gray-100">
                {cart.map((item, idx) => (
                  <div key={`${item.product.id}-${idx}`} className="pt-4 first:pt-0 flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg object-cover border border-[#C5A059]"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif font-bold text-sm text-[#1A1718]">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Remove creation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-500 font-cinzel mt-0.5">
                          Size: <span className="font-semibold text-gray-800">{item.selectedSize || 'Standard'}</span>
                        </p>

                        {item.customBlouseDetails && (
                          <div className="mt-2 p-2 bg-[#FAF7F5] rounded text-[11px] text-[#5E1A2C] border border-[#C5A059]/30 space-y-0.5">
                            <span className="font-bold block flex items-center gap-1">
                              <Scissors className="w-3 h-3" /> Bespoke Atelier Customization:
                            </span>
                            <p>• Neckline: {item.customBlouseDetails.neckline}</p>
                            <p>• Sleeve: {item.customBlouseDetails.sleeve}</p>
                            <p>• Back: {item.customBlouseDetails.backCut} {item.customBlouseDetails.padded ? '(Padded)' : ''}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                            className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                            className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 text-xs"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-serif font-bold text-sm text-[#5E1A2C]">
                          {formatPrice(item.product.priceINR * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="gold-shimmer-btn px-8 py-3 rounded text-xs font-cinzel uppercase tracking-wider font-bold shadow"
                >
                  Proceed to Insured Shipping →
                </button>
              </div>
            </div>
          )}

          {checkoutStep === 'shipping' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#1A1718]">
                Insured Delivery Address & Gift Options
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={shippingDetails.fullName}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F5] border border-gray-300 rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Phone Number (For Tracking Alerts)</label>
                  <input
                    type="tel"
                    value={shippingDetails.phone}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F5] border border-gray-300 rounded"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-gray-700">Shipping Address (House/Street/Apartment)</label>
                  <input
                    type="text"
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F5] border border-gray-300 rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">City</label>
                  <input
                    type="text"
                    value={shippingDetails.city}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F5] border border-gray-300 rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Pincode / Postal Code</label>
                  <input
                    type="text"
                    value={shippingDetails.pincode}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F5] border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#C5A059]/30 text-xs space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shippingDetails.isGiftWrapped}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, isGiftWrapped: e.target.checked })}
                    className="accent-[#5E1A2C] w-4 h-4"
                  />
                  <span className="font-bold text-[#5E1A2C]">Complimentary Royal Gift Packaging with Hand-Poured Wax Seal</span>
                </label>
                <p className="text-[11px] text-gray-500 pl-6">
                  Includes pure unbleached muslin garment bag, aromatic cedar sachet, and personalized handwritten calligraphy note.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCheckoutStep('bag')}
                  className="text-xs font-cinzel text-gray-600 hover:text-gray-900 uppercase"
                >
                  ← Back to Bag
                </button>
                <button
                  onClick={() => setCheckoutStep('payment')}
                  className="gold-shimmer-btn px-8 py-3 rounded text-xs font-cinzel uppercase tracking-wider font-bold shadow"
                >
                  Continue to Secure Payment →
                </button>
              </div>
            </div>
          )}

          {checkoutStep === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#1A1718]">
                  PCI-DSS Level 1 Encrypted Checkout
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded">
                  <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Secure
                </div>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-[#5E1A2C] bg-[#5E1A2C]/5' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#5E1A2C]" /> Credit / Debit Card (Visa, Mastercard, Amex, RuPay)
                    </span>
                    <input type="radio" checked={paymentMethod === 'card'} readOnly className="accent-[#5E1A2C]" />
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <input type="text" placeholder="Card Number" defaultValue="4111 2222 3333 4444" className="col-span-2 p-2.5 bg-white border border-gray-300 rounded" />
                      <input type="text" placeholder="MM / YY" defaultValue="08/29" className="p-2.5 bg-white border border-gray-300 rounded" />
                      <input type="password" placeholder="CVV" defaultValue="123" className="p-2.5 bg-white border border-gray-300 rounded" />
                    </div>
                  )}
                </div>

                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi' ? 'border-[#5E1A2C] bg-[#5E1A2C]/5' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900">UPI Instant Pay (GPay, PhonePe, Paytm)</span>
                    <input type="radio" checked={paymentMethod === 'upi'} readOnly className="accent-[#5E1A2C]" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="text-xs font-cinzel text-gray-600 hover:text-gray-900 uppercase"
                >
                  ← Back to Shipping
                </button>
                <button
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="crimson-btn px-8 py-3 rounded text-xs font-cinzel uppercase tracking-wider font-bold shadow flex items-center gap-2"
                >
                  {isProcessing ? 'Authenticating Order...' : `Pay ${formatPrice(grandTotalINR)} & Confirm`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Trust Guarantee */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-base text-[#5E1A2C] border-b border-gray-100 pb-3">
            Order Investment Summary
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Creations Subtotal:</span>
              <span className="font-medium text-gray-900">{formatPrice(cartTotalINR)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Insured Transit & Handling:</span>
              <span className="font-medium text-emerald-700">
                {shippingCostINR === 0 ? 'Complimentary (Free)' : formatPrice(shippingCostINR)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Atelier Custom Blouse Tailoring:</span>
              <span className="font-medium text-emerald-700">Complimentary</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between text-sm font-bold text-[#5E1A2C]">
              <span>Grand Total ({currency}):</span>
              <span className="font-serif text-lg">{formatPrice(grandTotalINR)}</span>
            </div>
          </div>

          <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#C5A059]/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#0F3A5D] font-bold">
              <ShieldCheck className="w-4 h-4" /> Silk Mark Lab Tested
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Every package is shipped with official holographic certification from the Ministry of Textiles and a 3-day hassle-free exchange window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
