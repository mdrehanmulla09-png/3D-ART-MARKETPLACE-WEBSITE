import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Heart, 
  Share2, 
  MessageSquare, 
  Globe, 
  ExternalLink,
  Camera,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ArtworkCard } from '../components/artwork/ArtworkCard';
import { QuickViewModal } from '../components/artwork/QuickViewModal';
import { Artwork } from '../types';

export const ArtistProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { 
    artists, 
    artworks, 
    toggleFollowArtist, 
    isFollowing, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'available' | 'all' | 'statement'>('available');
  const [quickViewArtwork, setQuickViewArtwork] = useState<Artwork | null>(null);

  // Find artist
  const artist = artists.find((a) => a.username === username);

  if (!artist) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-artora-ivory text-center">
        <h2 className="font-serif text-3xl text-artora-nearblack">Artist Not Found</h2>
        <p className="text-xs text-artora-muted mt-2">The requested artist profile does not exist.</p>
        <Link
          to="/artists"
          className="mt-6 px-6 py-2.5 bg-artora-nearblack text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-artora-cobalt transition-colors"
        >
          View All Artists
        </Link>
      </div>
    );
  }

  const following = isFollowing(artist.id);

  // Artist artworks from state
  const artistArtworks = artworks.filter(
    (art) => art.artistId === artist.id || art.artistUsername === artist.username
  );

  const availableArtworks = artistArtworks.filter((art) => art.inventoryQuantity > 0);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast(`Copied ${artist.name}'s portfolio link to clipboard`, 'info');
  };

  return (
    <div className="min-h-screen bg-artora-ivory pb-20 selection:bg-artora-cobalt selection:text-white">
      
      {/* Cover Artwork Banner */}
      <div className="relative h-72 sm:h-96 w-full bg-artora-charcoal overflow-hidden">
        <img
          src={artist.coverImage}
          alt={artist.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-artora-ivory via-black/20 to-black/40" />
      </div>

      {/* Main Profile Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10">
        
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-artora-warmgrey shadow-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-artora-warmgrey">
            
            {/* Avatar & Main Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-4 border-white shadow-xl object-cover flex-shrink-0"
              />

              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-serif text-3xl sm:text-4xl text-artora-nearblack font-medium">
                    {artist.name}
                  </h1>
                  {artist.isVerified && (
                    <span className="p-1 rounded-full bg-blue-50 text-artora-cobalt" title="Verified Artist">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                  )}
                </div>

                <p className="text-xs uppercase tracking-widest font-semibold text-artora-cobalt mt-1">
                  {artist.discipline}
                </p>

                <div className="flex items-center space-x-4 text-xs text-artora-muted mt-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-artora-burntorange" />
                    <span>{artist.location}</span>
                  </div>
                  <span>·</span>
                  <span>{artistArtworks.length} Pieces Cataloged</span>
                  <span>·</span>
                  <span>{artist.followersCount + (following ? 1 : 0)} Collectors Following</span>
                </div>
              </div>
            </div>

            {/* Profile CTA Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleFollowArtist(artist.id)}
                className={`px-6 py-3 rounded text-xs uppercase tracking-wider font-semibold border transition-all ${
                  following
                    ? 'bg-artora-nearblack text-white border-artora-nearblack shadow'
                    : 'border-artora-warmgrey hover:border-artora-nearblack text-artora-nearblack'
                }`}
              >
                {following ? 'Following Artist' : 'Follow Studio'}
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded border border-artora-warmgrey hover:bg-artora-ivory text-artora-nearblack transition-colors"
                title="Share portfolio"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Social links & Bio */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs">
            <div className="lg:col-span-2">
              <h3 className="font-serif text-lg text-artora-nearblack mb-2">Biography</h3>
              <p className="text-artora-nearblack/80 leading-relaxed font-light whitespace-pre-line text-sm">
                {artist.bio}
              </p>

              {/* Statement */}
              <div className="mt-6 p-4 rounded-xl bg-artora-ivory/60 border border-artora-warmgrey/70">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-artora-muted block mb-1">
                  Artistic Manifesto
                </span>
                <p className="font-serif text-base italic text-artora-nearblack">
                  "{artist.statement}"
                </p>
              </div>
            </div>

            {/* Exhibitions & Socials */}
            <div className="space-y-6 lg:border-l lg:border-artora-warmgrey lg:pl-8">
              {artist.exhibitions && artist.exhibitions.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-artora-nearblack mb-2">
                    Key Exhibitions
                  </h4>
                  <ul className="space-y-1.5 text-artora-muted">
                    {artist.exhibitions.map((ex, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-artora-cobalt font-bold">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-artora-nearblack mb-2">
                  Studio Channels
                </h4>
                <div className="flex flex-col space-y-2 text-artora-cobalt">
                  {artist.socialLinks.instagram && (
                    <a href="#" className="flex items-center space-x-2 hover:underline">
                      <Camera className="w-4 h-4" />
                      <span>{artist.socialLinks.instagram}</span>
                    </a>
                  )}
                  {artist.socialLinks.website && (
                    <a href="#" className="flex items-center space-x-2 hover:underline">
                      <Globe className="w-4 h-4" />
                      <span>Official Studio Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Portfolio Tabs & Artwork Grid */}
        <div className="mt-16">
          <div className="flex items-center space-x-8 border-b border-artora-warmgrey pb-4 mb-8">
            <button
              onClick={() => setActiveTab('available')}
              className={`text-xs uppercase tracking-widest font-semibold pb-2 border-b-2 transition-all ${
                activeTab === 'available'
                  ? 'border-artora-nearblack text-artora-nearblack'
                  : 'border-transparent text-artora-muted hover:text-artora-nearblack'
              }`}
            >
              Available Masterworks ({availableArtworks.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`text-xs uppercase tracking-widest font-semibold pb-2 border-b-2 transition-all ${
                activeTab === 'all'
                  ? 'border-artora-nearblack text-artora-nearblack'
                  : 'border-transparent text-artora-muted hover:text-artora-nearblack'
              }`}
            >
              Complete Archive ({artistArtworks.length})
            </button>
          </div>

          {/* Grid */}
          {artistArtworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeTab === 'available' ? availableArtworks : artistArtworks).map((art) => (
                <ArtworkCard
                  key={art.id}
                  artwork={art}
                  onQuickView={(item) => setQuickViewArtwork(item)}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-artora-warmgrey p-8">
              <p className="text-sm text-artora-muted">
                No published artworks yet in this catalog. Check back soon for new studio drops.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        artwork={quickViewArtwork}
        onClose={() => setQuickViewArtwork(null)}
      />

    </div>
  );
};
