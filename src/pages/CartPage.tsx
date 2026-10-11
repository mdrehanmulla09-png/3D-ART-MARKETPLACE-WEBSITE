import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  ShoppingBag,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    formatPrice, 
    cartSubtotal, 
    cartShipping, 
    cartTax, 
    cartTotal,
    clearCart 
  } = useApp();

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-artora-ivory text-center">
        <div className="w-20 h-20 rounded-full bg-artora-cream border border-artora-warmgrey flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-artora-muted" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-artora-nearblack">Your Collection Bag is Empty</h2>
        <p className="text-xs text-artora-muted mt-2 max-w-md font-light leading-relaxed">
          You haven't reserved any artworks yet. Explore our curated catalog of original paintings, sculptures, and museum editions.
        </p>
        <Link
          to="/explore"
          className="mt-8 px-8 py-3.5 bg-artora-nearblack text-white text-xs uppercase tracking-[0.2em] font-semibold rounded hover:bg-artora-cobalt transition-colors shadow-sm"
        >
          Explore Curated Works
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-artora-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-artora-warmgrey/60 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
              Collector Reservation
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-artora-nearblack mt-1">
              Your Collection Bag
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-artora-muted hover:text-rose-600 transition-colors"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => {
              const isOriginal = item.artwork.artworkType === 'original';
              return (
                <div
                  key={item.artwork.id}
                  className="bg-white rounded-xl p-5 border border-artora-warmgrey shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center space-x-4 flex-1">
                    <Link
                      to={`/artwork/${item.artwork.id}`}
                      className="w-24 h-24 rounded-lg overflow-hidden bg-artora-cream flex-shrink-0 border border-artora-warmgrey"
                    >
                      <img
                        src={item.artwork.images[0]?.url}
                        alt={item.artwork.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-artora-cobalt">
                        {item.artwork.category}
                      </span>
                      <Link
                        to={`/artwork/${item.artwork.id}`}
                        className="font-serif text-lg text-artora-nearblack hover:text-artora-cobalt transition-colors block line-clamp-1"
                      >
                        {item.artwork.title}
                      </Link>
                      <p className="text-xs text-artora-muted">By {item.artwork.artistName}</p>
                      
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-artora-ivory border border-artora-warmgrey text-artora-nearblack">
                          {isOriginal ? 'Unique 1 of 1' : 'Limited Edition Print'}
                        </span>
                        {item.artwork.isFramed && (
                          <span className="text-[10px] text-artora-muted">· Custom Framed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity controls & Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-artora-warmgrey/40">
                    <span className="text-base font-semibold text-artora-nearblack">
                      {formatPrice(item.artwork.price * item.quantity)}
                    </span>

                    {/* Quantity controls: strictly disabled if unique original */}
                    <div className="flex items-center space-x-2">
                      {isOriginal ? (
                        <span className="text-[11px] text-artora-muted italic">
                          Qty: 1 (Original Unique)
                        </span>
                      ) : (
                        <div className="flex items-center border border-artora-warmgrey rounded">
                          <button
                            onClick={() => updateQuantity(item.artwork.id, item.quantity - 1)}
                            className="p-1 hover:bg-artora-ivory text-artora-nearblack"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.artwork.id, item.quantity + 1)}
                            className="p-1 hover:bg-artora-ivory text-artora-nearblack"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => removeFromCart(item.artwork.id)}
                        className="p-1.5 text-artora-muted hover:text-rose-600 transition-colors ml-2"
                        title="Remove artwork"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/explore"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-artora-nearblack hover:text-artora-cobalt transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Discovering Art</span>
              </Link>
            </div>
          </div>

          {/* Right Summary Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-artora-warmgrey shadow-sm sticky top-28">
              <h3 className="font-serif text-2xl text-artora-nearblack pb-4 border-b border-artora-warmgrey">
                Acquisition Summary
              </h3>

              <div className="py-5 space-y-3.5 text-xs border-b border-artora-warmgrey text-artora-nearblack/80">
                <div className="flex justify-between">
                  <span>Artwork Subtotal</span>
                  <span className="font-semibold text-artora-nearblack">{formatPrice(cartSubtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Insured Museum Shipping</span>
                  <span className="font-semibold text-artora-nearblack">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-700 font-bold">Complimentary (Over ₹50,000)</span>
                    ) : (
                      formatPrice(cartShipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (12% Art GST)</span>
                  <span className="font-semibold text-artora-nearblack">{formatPrice(cartTax)}</span>
                </div>
              </div>

              <div className="pt-5 pb-6 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-semibold text-artora-nearblack block">Total Investment</span>
                  <span className="text-[11px] text-artora-muted">Includes certificates, crate & transit insurance</span>
                </div>
                <span className="text-2xl sm:text-3xl font-semibold text-artora-nearblack">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-artora-nearblack hover:bg-artora-cobalt text-white text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-md transition-colors flex items-center justify-center space-x-2"
              >
                <span>Proceed to Secure Acquisition</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 pt-6 border-t border-artora-warmgrey/60 space-y-3 text-xs text-artora-muted">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-medium text-[11px]">100% Authenticity & Escrow Protection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span className="text-[11px]">Direct dispatch from artist studios within 3 business days</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
