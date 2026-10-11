import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  Share2, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Maximize2, 
  Check, 
  ArrowLeft, 
  Compass, 
  Sparkles,
  Info,
  Layers,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ArtworkCard } from '../components/artwork/ArtworkCard';

export const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    artworks, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    cart, 
    toggleFollowArtist, 
    isFollowing,
    showToast 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // Find artwork
  const artwork = artworks.find((art) => art.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setIsZoomed(false);
    setInquirySent(false);
  }, [id]);

  if (!artwork) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-artora-ivory text-center">
        <h2 className="font-serif text-3xl text-artora-nearblack">Artwork Not Found</h2>
        <p className="text-xs text-artora-muted mt-2">The requested artwork may have been acquired or moved.</p>
        <Link
          to="/explore"
          className="mt-6 px-6 py-2.5 bg-artora-nearblack text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-artora-cobalt transition-colors"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(artwork.id);
  const isInCart = cart.some((i) => i.artwork.id === artwork.id);
  const isOriginal = artwork.artworkType === 'original';
  const isSoldOut = artwork.inventoryQuantity <= 0;
  const following = isFollowing(artwork.artistId);

  // Related artworks
  const relatedArtworks = artworks
    .filter((a) => a.id !== artwork.id && (a.category === artwork.category || a.artistId === artwork.artistId))
    .slice(0, 4);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryText.trim()) {
      setInquirySent(true);
      showToast(`Inquiry dispatched directly to ${artwork.artistName}'s studio`, 'success');
      setTimeout(() => {
        setInquiryModalOpen(false);
        setInquiryText('');
      }, 1800);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Artwork shareable link copied to clipboard', 'info');
    setShareModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-artora-ivory py-10 selection:bg-artora-cobalt selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link Breadcrumbs */}
        <div className="mb-6 flex items-center justify-between text-xs text-artora-muted">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1.5 hover:text-artora-nearblack transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to catalog</span>
          </button>

          <div className="flex items-center space-x-2">
            <span>{artwork.category}</span>
            <span>/</span>
            <span className="text-artora-nearblack font-medium">{artwork.title}</span>
          </div>
        </div>

        {/* Main Artwork Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: High-Res Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Primary Main Viewport */}
            <div className="relative bg-artora-cream rounded-2xl border border-artora-warmgrey overflow-hidden p-6 sm:p-10 flex items-center justify-center min-h-[460px] sm:min-h-[580px] shadow-sm">
              
              <div 
                className={`relative group max-w-full cursor-zoom-in transition-all duration-300 ${
                  isZoomed ? 'scale-125' : 'scale-100'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={artwork.images[activeImageIndex]?.url || artwork.images[0]?.url}
                  alt={artwork.title}
                  className="max-h-[520px] w-auto max-w-full object-contain rounded shadow-2xl border-4 border-white"
                />
              </div>

              {/* Zoom & 3D Gallery Shortcuts */}
              <div className="absolute bottom-4 right-4 flex items-center space-x-2 z-10">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2.5 rounded-full bg-white/90 hover:bg-white text-artora-nearblack shadow-md backdrop-blur-sm transition-all"
                  title="Toggle Zoom"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <Link
                  to="/gallery"
                  className="px-3.5 py-2 rounded-full bg-artora-nearblack/90 hover:bg-artora-cobalt text-white text-xs font-semibold uppercase tracking-wider shadow-md backdrop-blur-sm flex items-center space-x-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>View in 3D Room</span>
                </Link>
              </div>

              {/* Framed status plaque */}
              {artwork.isFramed && (
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-semibold bg-white/90 text-artora-nearblack px-2.5 py-1 rounded shadow-sm border border-artora-warmgrey">
                  Custom Museum Frame Included
                </div>
              )}
            </div>

            {/* Thumbnail selector if multiple images */}
            {artwork.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {artwork.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-artora-cobalt scale-105 shadow-md'
                        : 'border-artora-warmgrey opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Curatorial Authenticity Seal */}
            <div className="p-6 bg-white rounded-xl border border-artora-warmgrey shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-artora-nearblack">Physical Certificate of Authenticity</h4>
                  <p className="text-artora-muted text-[11px] mt-0.5">
                    Signed and thumbprinted by {artwork.artistName} with serialized tamper-evident hologram.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-artora-burntorange flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-artora-nearblack">Insured White-Glove Transit</h4>
                  <p className="text-artora-muted text-[11px] mt-0.5">
                    Custom wooden crate, climate insulation, and courier tracking to your doorstep.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Metadata, Pricing & Purchase Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Type and Category Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-artora-cobalt">
                  {artwork.category}
                </span>

                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-artora-cream border border-artora-warmgrey text-artora-nearblack">
                  {artwork.artworkType === 'original'
                    ? 'Unique Original (1 of 1)'
                    : artwork.artworkType === 'limited_edition'
                    ? `Limited Edition (${artwork.inventoryQuantity} of ${artwork.editionSize} remaining)`
                    : 'Museum Quality Print'}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl text-artora-nearblack leading-[1.1]">
                {artwork.title}
              </h1>

              {/* Artist Card Header */}
              <div className="mt-4 flex items-center justify-between p-3.5 bg-white rounded-xl border border-artora-warmgrey">
                <Link
                  to={`/artist/${artwork.artistUsername}`}
                  className="flex items-center space-x-3 group"
                >
                  <img
                    src={artwork.artistAvatar}
                    alt={artwork.artistName}
                    className="w-11 h-11 rounded-full object-cover border border-artora-warmgrey group-hover:border-artora-cobalt transition-colors"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-artora-nearblack group-hover:text-artora-cobalt transition-colors">
                      {artwork.artistName}
                    </h3>
                    <p className="text-[11px] text-artora-muted">{artwork.artistLocation}</p>
                  </div>
                </Link>

                <button
                  onClick={() => toggleFollowArtist(artwork.artistId)}
                  className={`px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider border transition-all ${
                    following
                      ? 'bg-artora-nearblack text-white border-artora-nearblack'
                      : 'border-artora-warmgrey text-artora-nearblack hover:bg-artora-ivory'
                  }`}
                >
                  {following ? 'Following' : 'Follow'}
                </button>
              </div>

              {/* Pricing Box */}
              <div className="mt-6 p-6 bg-white rounded-xl border border-artora-warmgrey shadow-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl sm:text-4xl font-semibold text-artora-nearblack">
                    {formatPrice(artwork.price)}
                  </span>
                  <span className="text-xs text-artora-muted">
                    {artwork.price > 50000 ? 'Complimentary Insured Delivery' : '+ ₹2,500 Courier Shipping'}
                  </span>
                </div>

                {/* Purchase Button */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      if (!isSoldOut) {
                        addToCart(artwork, 1);
                      }
                    }}
                    disabled={isSoldOut || (isOriginal && isInCart)}
                    className={`w-full py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-md transition-all flex items-center justify-center space-x-2 ${
                      isSoldOut
                        ? 'bg-artora-warmgrey text-artora-muted cursor-not-allowed'
                        : isOriginal && isInCart
                        ? 'bg-emerald-900 text-white'
                        : 'bg-artora-nearblack hover:bg-artora-cobalt text-white'
                    }`}
                  >
                    {isSoldOut ? (
                      <span>Sold Out / In Private Collection</span>
                    ) : isOriginal && isInCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Artwork In Your Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Acquire Artwork</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(artwork.id)}
                    className={`p-4 rounded border transition-colors ${
                      wishlisted
                        ? 'bg-rose-50 border-rose-300 text-rose-600'
                        : 'bg-white border-artora-warmgrey hover:bg-artora-ivory text-artora-nearblack'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="p-4 rounded bg-white border border-artora-warmgrey hover:bg-artora-ivory text-artora-nearblack transition-colors"
                    aria-label="Share artwork"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Inventory reminder */}
                {isOriginal && (
                  <p className="mt-3 text-[11px] text-artora-burntorange font-medium text-center">
                    Unique piece. Once collected, no duplicate will ever be produced.
                  </p>
                )}
              </div>

              {/* Artwork Specifications Table */}
              <div className="mt-8 space-y-3 bg-white p-6 rounded-xl border border-artora-warmgrey text-xs">
                <h3 className="font-serif text-base text-artora-nearblack mb-4">Artwork Specifications</h3>
                
                <div className="flex justify-between py-1.5 border-b border-artora-warmgrey/40">
                  <span className="text-artora-muted">Medium</span>
                  <span className="font-medium text-right max-w-xs">{artwork.medium}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-artora-warmgrey/40">
                  <span className="text-artora-muted">Dimensions</span>
                  <span className="font-medium">{artwork.dimensions}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-artora-warmgrey/40">
                  <span className="text-artora-muted">Year Created</span>
                  <span className="font-medium">{artwork.yearCreated}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-artora-warmgrey/40">
                  <span className="text-artora-muted">Framing</span>
                  <span className="font-medium">{artwork.isFramed ? 'Custom Framed & Ready to Hang' : 'Unframed / Gallery Wrapped'}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-artora-warmgrey/40">
                  <span className="text-artora-muted">Provenance</span>
                  <span className="font-medium text-right max-w-xs">{artwork.provenance || 'Artist Studio'}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 p-6 bg-white rounded-xl border border-artora-warmgrey">
                <h3 className="font-serif text-base text-artora-nearblack mb-3">Curatorial Statement</h3>
                <p className="text-xs text-artora-nearblack/80 font-light leading-relaxed whitespace-pre-line">
                  {artwork.description}
                </p>
              </div>

              {/* Contact Artist Dialogue Button */}
              <div className="mt-6">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="w-full py-3 px-4 border border-artora-warmgrey hover:border-artora-nearblack rounded bg-white text-xs uppercase tracking-wider font-semibold text-artora-nearblack flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-artora-cobalt" />
                  <span>Inquire or Commission {artwork.artistName}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <div className="mt-24 pt-16 border-t border-artora-warmgrey/60">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-artora-cobalt font-semibold">
                  Curatorial Companions
                </span>
                <h2 className="font-serif text-3xl text-artora-nearblack mt-1">
                  You May Also Appreciate
                </h2>
              </div>
              <Link to="/explore" className="text-xs uppercase tracking-wider font-semibold text-artora-nearblack hover:text-artora-cobalt">
                View All Artworks
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtworks.map((rel) => (
                <ArtworkCard key={rel.id} artwork={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Contact Artist Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-artora-warmgrey">
            <h3 className="font-serif text-2xl text-artora-nearblack">Inquire with {artwork.artistName}</h3>
            <p className="text-xs text-artora-muted mt-1">
              Regarding "{artwork.title}" ({artwork.dimensions})
            </p>

            {inquirySent ? (
              <div className="my-8 text-center py-6 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-serif text-lg text-emerald-950">Inquiry Sent to Artist</h4>
                <p className="text-xs text-emerald-800 mt-1">
                  Elena's studio typically responds within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                    Your Message to Artist
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask about custom framing, artist intention, provenance, or scheduling a private studio call..."
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    className="w-full text-xs p-3 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2 text-xs text-artora-muted hover:text-artora-nearblack"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-artora-nearblack hover:bg-artora-cobalt text-white text-xs uppercase tracking-wider font-semibold rounded"
                  >
                    Dispatch Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-artora-warmgrey text-center">
            <Share2 className="w-8 h-8 text-artora-cobalt mx-auto mb-3" />
            <h3 className="font-serif text-xl text-artora-nearblack">Share Artwork</h3>
            <p className="text-xs text-artora-muted mt-1">
              "{artwork.title}" by {artwork.artistName}
            </p>
            <div className="mt-6 flex flex-col space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 bg-artora-nearblack text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-artora-cobalt transition-colors"
              >
                Copy Link to Clipboard
              </button>
              <button
                onClick={() => setShareModalOpen(false)}
                className="w-full py-2 text-xs text-artora-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
