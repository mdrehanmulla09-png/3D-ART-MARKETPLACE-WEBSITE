import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  ArrowLeft, 
  Truck, 
  AlertCircle,
  Sparkles,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartShipping, 
    cartTax, 
    cartTotal, 
    formatPrice, 
    createOrder, 
    user 
  } = useApp();

  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user.name || 'Tara Mehta',
    email: user.email || 'tara.mehta@modernart.in',
    phone: '+91 98201 44521',
    street: '72 Maker Towers, Cuffe Parade',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400005',
    country: 'India',
    paymentMethod: 'razorpay' as 'razorpay' | 'stripe' | 'upi',
    specialInstructions: 'Please ring the buzzer for apartment 12B. Fragile artwork crate.',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-artora-ivory text-center">
        <h2 className="font-serif text-3xl text-artora-nearblack">No Items in Checkout</h2>
        <p className="text-xs text-artora-muted mt-2">Your collection bag is empty.</p>
        <Link
          to="/explore"
          className="mt-6 px-6 py-2.5 bg-artora-nearblack text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-artora-cobalt transition-colors"
        >
          Browse Marketplace
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompleteAcquisition = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate verified test-mode order confirmation
    setTimeout(() => {
      const orderItems = cart.map((i) => ({
        id: `ord-item-${Math.random().toString(36).substring(2, 7)}`,
        artworkId: i.artwork.id,
        title: i.artwork.title,
        artistName: i.artwork.artistName,
        imageUrl: i.artwork.images[0]?.url,
        quantity: i.quantity,
        price: i.artwork.price,
        artworkType: i.artwork.artworkType,
      }));

      const newOrder = createOrder({
        buyerId: user.id,
        buyerName: formData.fullName,
        buyerEmail: formData.email,
        items: orderItems,
        subtotal: cartSubtotal,
        shippingFee: cartShipping,
        tax: cartTax,
        total: cartTotal,
        currency: 'INR',
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'paid', // Verified in test mode
        orderStatus: 'confirmed',
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        trackingNumber: `ART-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
        carrier: 'BlueDart Art Logistics',
      });

      setCompletedOrder(newOrder);
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#435BFF', '#D96A45', '#171717', '#F6F2EA'],
        });
      } catch {
        // Confetti fallback
      }
    }, 1800);
  };

  // Order Confirmed Screen
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-artora-ivory py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-artora-warmgrey shadow-lg">
            
            <div className="text-center pb-8 border-b border-artora-warmgrey">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-emerald-800">
                Acquisition Confirmed & Authenticated
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-artora-nearblack mt-2">
                Thank You, {completedOrder.shippingAddress.fullName}
              </h1>
              <p className="text-xs text-artora-muted mt-2 font-light">
                Your order receipt <span className="font-semibold text-artora-nearblack font-mono">{completedOrder.orderNumber}</span> has been confirmed and logged in your buyer ledger.
              </p>

              {/* Sample Test Badge Notice */}
              <div className="mt-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Test Payment Scaffold: Validated via Secure Test Token</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="py-6 border-b border-artora-warmgrey space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-artora-nearblack mb-4">
                Acquired Masterworks
              </h3>
              {completedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-12 h-12 rounded object-cover border border-artora-warmgrey"
                    />
                    <div>
                      <p className="font-medium text-artora-nearblack">{item.title}</p>
                      <p className="text-artora-muted text-[11px]">
                        By {item.artistName} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-artora-nearblack">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery & Logistics */}
            <div className="py-6 border-b border-artora-warmgrey grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <h4 className="font-semibold text-artora-nearblack uppercase tracking-wider text-[11px] mb-2">
                  Delivery Sanctuary
                </h4>
                <p className="text-artora-muted leading-relaxed">
                  {completedOrder.shippingAddress.fullName}<br />
                  {completedOrder.shippingAddress.street}<br />
                  {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} {completedOrder.shippingAddress.postalCode}<br />
                  {completedOrder.shippingAddress.country} · {completedOrder.shippingAddress.phone}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-artora-nearblack uppercase tracking-wider text-[11px] mb-2">
                  Transit & Certificate
                </h4>
                <p className="text-artora-muted leading-relaxed">
                  Carrier: <span className="font-medium text-artora-nearblack">{completedOrder.carrier}</span><br />
                  Tracking: <span className="font-mono text-artora-cobalt font-semibold">{completedOrder.trackingNumber}</span><br />
                  Total Amount Paid: <span className="font-semibold text-artora-nearblack">{formatPrice(completedOrder.total)}</span>
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/account/orders"
                className="w-full sm:w-auto px-6 py-3 bg-artora-nearblack text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-artora-cobalt transition-colors text-center"
              >
                View Order in Account Ledger
              </Link>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 border border-artora-warmgrey text-artora-nearblack text-xs uppercase tracking-wider font-semibold rounded hover:bg-artora-ivory transition-colors flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Certificate Receipt</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-artora-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="mb-8 flex items-center justify-between pb-4 border-b border-artora-warmgrey/60">
          <Link
            to="/cart"
            className="flex items-center space-x-2 text-xs uppercase tracking-wider text-artora-muted hover:text-artora-nearblack transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Collection Bag</span>
          </Link>

          <div className="flex items-center space-x-2 text-xs text-artora-nearblack">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium">256-Bit Encrypted Curatorial Escrow</span>
          </div>
        </div>

        <form onSubmit={handleCompleteAcquisition} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form: Contact & Shipping (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Contact Details */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-artora-warmgrey shadow-sm">
              <h2 className="font-serif text-2xl text-artora-nearblack mb-4">
                1. Collector Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-artora-muted font-medium mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-artora-ivory/30 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-artora-muted font-medium mb-1">Email for Receipts & Certificates</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-artora-ivory/30 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-artora-muted font-medium mb-1">Phone Number (For Courier White-Glove Dispatch)</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-artora-ivory/30 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-artora-warmgrey shadow-sm">
              <h2 className="font-serif text-2xl text-artora-nearblack mb-4">
                2. Shipping & Sanctuary Destination
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-artora-muted font-medium mb-1">Street Address, Suite / Apartment</label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-artora-ivory/30 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-artora-muted font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-artora-ivory/30 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-artora-muted font-medium mb-1">State / Region</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-artora-ivory/30 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-artora-muted font-medium mb-1">Postal / PIN Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-artora-ivory/30 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-artora-muted font-medium mb-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-artora-ivory/30 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  >
                    <option value="India">India (IN - Domestic)</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-artora-muted font-medium mb-1">Crating & Delivery Instructions</label>
                  <textarea
                    name="specialInstructions"
                    rows={2}
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-artora-ivory/30 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Integration Scaffold */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-artora-warmgrey shadow-sm">
              <h2 className="font-serif text-2xl text-artora-nearblack mb-4">
                3. Secure Payment Integration Scaffold
              </h2>
              
              <div className="space-y-3 text-xs mb-6">
                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'razorpay'
                    ? 'border-artora-cobalt bg-artora-cobalt/5 ring-1 ring-artora-cobalt'
                    : 'border-artora-warmgrey'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={formData.paymentMethod === 'razorpay'}
                      onChange={handleInputChange}
                      className="accent-artora-cobalt"
                    />
                    <div>
                      <p className="font-semibold text-artora-nearblack">Razorpay Secure (India & Global)</p>
                      <p className="text-artora-muted text-[11px]">UPI (Google Pay, PhonePe), NetBanking, RuPay & International Cards</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Recommended
                  </span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'stripe'
                    ? 'border-artora-cobalt bg-artora-cobalt/5 ring-1 ring-artora-cobalt'
                    : 'border-artora-warmgrey'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={formData.paymentMethod === 'stripe'}
                      onChange={handleInputChange}
                      className="accent-artora-cobalt"
                    />
                    <div>
                      <p className="font-semibold text-artora-nearblack">Stripe International Payments</p>
                      <p className="text-artora-muted text-[11px]">Visa, Mastercard, Amex, Apple Pay</p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-artora-muted" />
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'border-artora-cobalt bg-artora-cobalt/5 ring-1 ring-artora-cobalt'
                    : 'border-artora-warmgrey'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="accent-artora-cobalt"
                    />
                    <div>
                      <p className="font-semibold text-artora-nearblack">Instant UPI QR & VPA</p>
                      <p className="text-artora-muted text-[11px]">Direct zero-fee bank settlement</p>
                    </div>
                  </div>
                  <Smartphone className="w-5 h-5 text-artora-muted" />
                </label>
              </div>

              {/* Security Guarantee Note */}
              <div className="p-3.5 bg-artora-ivory rounded-lg border border-artora-warmgrey/60 text-[11px] text-artora-nearblack/75 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Escrow Guarantee:</strong> Payment is securely held in platform escrow and disbursed to the artist only after the collector inspects and confirms the artwork delivery within 14 days.
                </span>
              </div>
            </div>

          </div>

          {/* Right Summary Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-artora-warmgrey shadow-sm sticky top-28">
              <h3 className="font-serif text-2xl text-artora-nearblack pb-4 border-b border-artora-warmgrey">
                Order Review
              </h3>

              {/* Items in Checkout */}
              <div className="py-4 space-y-3 max-h-56 overflow-y-auto border-b border-artora-warmgrey">
                {cart.map((item) => (
                  <div key={item.artwork.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.artwork.images[0]?.url}
                        alt={item.artwork.title}
                        className="w-12 h-12 rounded object-cover border border-artora-warmgrey"
                      />
                      <div>
                        <p className="font-medium text-artora-nearblack line-clamp-1">{item.artwork.title}</p>
                        <p className="text-[11px] text-artora-muted">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-artora-nearblack">
                      {formatPrice(item.artwork.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="py-4 space-y-2.5 text-xs border-b border-artora-warmgrey text-artora-nearblack/80">
                <div className="flex justify-between">
                  <span>Artwork Subtotal</span>
                  <span className="font-semibold">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Museum Crating & Shipping</span>
                  <span className="font-semibold">
                    {cartShipping === 0 ? 'Complimentary' : formatPrice(cartShipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Art Tax (12% GST)</span>
                  <span className="font-semibold">{formatPrice(cartTax)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="py-4 flex justify-between items-baseline">
                <span className="text-sm font-semibold text-artora-nearblack">Total Investment</span>
                <span className="text-2xl font-bold text-artora-nearblack">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              {/* Authorize Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-artora-nearblack hover:bg-artora-cobalt text-white text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-md transition-all flex items-center justify-center space-x-2 disabled:bg-artora-warmgrey"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying & Reserving Artwork...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Complete Acquisition ({formatPrice(cartTotal)})</span>
                  </>
                )}
              </button>

              <p className="mt-3 text-[10px] text-center text-artora-muted">
                By acquiring, you accept ARTORA's Collector Terms & In-Sanctuary Trial Policy.
              </p>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
