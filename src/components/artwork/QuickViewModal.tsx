import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Artwork } from '../../types';
import { useApp } from '../../context/AppContext';

interface QuickViewModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ artwork, onClose }) => {
  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    cart 
  } = useApp();

  if (!artwork) return null;

  const isInCart = cart.some((i) => i.artwork.id === artwork.id);
  const wishlisted = isWishlisted(artwork.id);
  const isOriginal = artwork.artworkType === 'original';
  const isSoldOut = artwork.inventoryQuantity <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-artora-charcoal/70 backdrop-blur-md animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-artora-warmgrey z-10 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-artora-nearblack rounded-full shadow-md transition-colors"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Artwork Image Preview */}
        <div className="md:w-1/2 bg-artora-cream flex items-center justify-center p-6 sm:p-8 relative overflow-hidden">
          <div className="relative group max-h-[380px] md:max-h-[500px] w-full flex items-center justify-center">
            <img
              src={artwork.images[0]?.url}
              alt={artwork.title}
              className="max-h-[380px] md:max-h-[460px] w-auto max-w-full object-contain rounded-md shadow-2xl border border-artora-warmgrey"
            />
            {artwork.isFramed && (
              <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider font-semibold bg-white/90 text-artora-nearblack px-2 py-0.5 rounded shadow">
                Custom Framed
              </span>
            )}
          </div>
        </div>

        {/* Right: Artwork Metadata & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-artora-cobalt">
                {artwork.category}
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-artora-ivory border border-artora-warmgrey text-artora-nearblack font-semibold">
                {artwork.artworkType === 'original'
                  ? 'Original 1 of 1'
                  : artwork.artworkType === 'limited_edition'
                  ? `Edition of ${artwork.editionSize}`
                  : 'Museum Print'}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-artora-nearblack leading-tight">
              {artwork.title}
            </h2>

            <Link
              to={`/artist/${artwork.artistUsername}`}
              onClick={onClose}
              className="inline-flex items-center space-x-2 mt-2 group"
            >
              <img
                src={artwork.artistAvatar}
                alt={artwork.artistName}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-xs text-artora-nearblack font-medium group-hover:text-artora-cobalt transition-colors">
                {artwork.artistName}
              </span>
              <span className="text-[11px] text-artora-muted">· {artwork.artistLocation}</span>
            </Link>

            {/* Price */}
            <div className="mt-4 pb-4 border-b border-artora-warmgrey/50">
              <div className="text-2xl font-semibold text-artora-nearblack">
                {formatPrice(artwork.price)}
              </div>
              <p className="text-[11px] text-artora-muted mt-0.5">
                Taxes calculated at checkout · Free insured courier shipping above ₹50,000
              </p>
            </div>

            {/* Specifications */}
            <div className="py-4 space-y-2 text-xs border-b border-artora-warmgrey/50">
              <div className="flex justify-between">
                <span className="text-artora-muted">Medium</span>
                <span className="font-medium text-right max-w-[240px] truncate">{artwork.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-artora-muted">Dimensions</span>
                <span className="font-medium">{artwork.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-artora-muted">Year Created</span>
                <span className="font-medium">{artwork.yearCreated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-artora-muted">Authenticity</span>
                <span className="font-medium flex items-center gap-1 text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" /> Certificate included
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-artora-nearblack/75 line-clamp-3 leading-relaxed">
              {artwork.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (!isSoldOut) {
                    addToCart(artwork, 1);
                  }
                }}
                disabled={isSoldOut || (isOriginal && isInCart)}
                className={`flex-1 py-3 px-4 rounded text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 transition-all ${
                  isSoldOut
                    ? 'bg-artora-warmgrey text-artora-muted cursor-not-allowed'
                    : isOriginal && isInCart
                    ? 'bg-emerald-900 text-white'
                    : 'bg-artora-nearblack hover:bg-artora-cobalt text-white shadow'
                }`}
              >
                {isSoldOut ? (
                  <span>Sold Out</span>
                ) : isOriginal && isInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>In Your Collection Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(artwork.id)}
                className={`p-3 rounded border transition-colors ${
                  wishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'border-artora-warmgrey text-artora-nearblack hover:bg-artora-ivory'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              to={`/artwork/${artwork.id}`}
              onClick={onClose}
              className="w-full py-2.5 text-center text-xs text-artora-nearblack hover:text-artora-cobalt font-medium flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>View Full Artwork Details & High-Res Zoom</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
