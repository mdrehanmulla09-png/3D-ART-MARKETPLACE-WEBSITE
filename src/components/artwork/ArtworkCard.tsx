import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Artwork } from '../../types';
import { useApp } from '../../context/AppContext';

interface ArtworkCardProps {
  artwork: Artwork;
  onQuickView?: (artwork: Artwork) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onQuickView }) => {
  const { 
    formatPrice, 
    toggleWishlist, 
    isWishlisted, 
    addToCart, 
    cart 
  } = useApp();

  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const wishlisted = isWishlisted(artwork.id);
  const isInCart = cart.some((i) => i.artwork.id === artwork.id);
  const isOriginal = artwork.artworkType === 'original';
  const isSoldOut = artwork.inventoryQuantity <= 0;

  // 3D Perspective Tilt on pointer move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle natural tilt (max 9 degrees)
    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col perspective-1000 select-none"
      style={{
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      <div
        className="w-full bg-white rounded-xl overflow-hidden border border-artora-warmgrey/70 transition-all duration-300 flex flex-col justify-between"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isHovered ? 'translateY(-6px) translateZ(12px)' : 'translateY(0) translateZ(0)'
          }`,
          boxShadow: isHovered
            ? '0 25px 45px -12px rgba(23, 23, 23, 0.18), 0 0 1px 1px rgba(23, 23, 23, 0.05)'
            : '0 4px 15px -3px rgba(23, 23, 23, 0.04), 0 0 1px 1px rgba(23, 23, 23, 0.02)',
        }}
      >
        {/* Top Artwork Surface Canvas */}
        <div className="relative aspect-[4/5] bg-artora-cream overflow-hidden">
          <Link to={`/artwork/${artwork.id}`} className="block w-full h-full">
            <img
              src={artwork.images[0]?.url}
              alt={artwork.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {artwork.artworkType === 'original' ? (
              <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-artora-nearblack/90 backdrop-blur-sm text-white rounded-sm shadow-sm">
                Original 1 of 1
              </span>
            ) : artwork.artworkType === 'limited_edition' ? (
              <span className="inline-block text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-artora-cobalt text-white rounded-sm shadow-sm">
                Edition of {artwork.editionSize}
              </span>
            ) : (
              <span className="inline-block text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-white/90 backdrop-blur-sm text-artora-nearblack rounded-sm border border-artora-warmgrey">
                Museum Print
              </span>
            )}

            {artwork.isFeatured && (
              <span className="inline-block text-[9px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-artora-burntorange text-white rounded-sm">
                Curator's Choice
              </span>
            )}

            {isSoldOut && (
              <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-rose-700 text-white rounded-sm">
                Sold Out
              </span>
            )}
          </div>

          {/* Top Right Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(artwork.id);
            }}
            className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-200 shadow-sm ${
              wishlisted
                ? 'bg-white text-rose-500 scale-110'
                : 'bg-white/80 hover:bg-white text-artora-nearblack hover:text-artora-burntorange backdrop-blur-sm'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Actions Hover Overlay */}
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(artwork);
                }}
                className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-artora-nearblack text-[11px] uppercase tracking-wider font-semibold rounded shadow-md backdrop-blur-sm flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </button>
            )}

            {!isSoldOut && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(artwork, 1);
                }}
                disabled={isOriginal && isInCart}
                className={`p-2 rounded shadow-md backdrop-blur-sm transition-colors ${
                  isOriginal && isInCart
                    ? 'bg-emerald-800 text-white cursor-default'
                    : 'bg-artora-nearblack hover:bg-artora-cobalt text-white'
                }`}
                title={isInCart ? 'In collection bag' : 'Add to bag'}
              >
                {isOriginal && isInCart ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <ShoppingBag className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Card Info Details */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
          <div>
            <div className="flex items-center justify-between text-[11px] text-artora-muted mb-1">
              <span className="uppercase tracking-widest font-medium text-[10px] text-artora-cobalt">
                {artwork.category}
              </span>
              <span>{artwork.yearCreated}</span>
            </div>

            <Link
              to={`/artwork/${artwork.id}`}
              className="block group-hover:text-artora-cobalt transition-colors"
            >
              <h3 className="font-serif text-lg sm:text-xl text-artora-nearblack font-normal leading-snug line-clamp-1">
                {artwork.title}
              </h3>
            </Link>

            <Link
              to={`/artist/${artwork.artistUsername}`}
              className="mt-1 text-xs text-artora-nearblack/70 hover:text-artora-nearblack block font-light truncate"
            >
              {artwork.artistName}
            </Link>
          </div>

          <div className="mt-4 pt-3 border-t border-artora-warmgrey/40 flex items-center justify-between">
            <span className="text-sm sm:text-base font-semibold text-artora-nearblack">
              {formatPrice(artwork.price)}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-artora-muted font-medium">
              {artwork.dimensions.split('(')[0].trim()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
