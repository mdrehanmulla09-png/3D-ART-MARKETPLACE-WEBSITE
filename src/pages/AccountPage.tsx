import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  ExternalLink,
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ArtworkCard } from '../components/artwork/ArtworkCard';

export const AccountPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'following'>(
    initialTab === 'wishlist' ? 'wishlist' : 'orders'
  );

  const { 
    user, 
    orders, 
    wishlist, 
    artworks, 
    artists, 
    followedArtists, 
    formatPrice, 
    toggleFollowArtist 
  } = useApp();

  const wishlistedArtworks = artworks.filter((a) => wishlist.includes(a.id));
  const followedArtistList = artists.filter((a) => followedArtists.includes(a.id));

  return (
    <div className="min-h-screen bg-artora-ivory py-12 selection:bg-artora-cobalt selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Profile Bar */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-artora-warmgrey shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-10">
          <div className="flex items-center space-x-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-artora-cobalt shadow-md"
            />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-artora-ivory border border-artora-warmgrey text-artora-nearblack">
                Private Collector
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-artora-nearblack mt-1">
                {user.name}
              </h1>
              <p className="text-xs text-artora-muted">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-center text-xs">
            <div>
              <span className="font-serif text-2xl text-artora-nearblack block font-semibold">
                {orders.length}
              </span>
              <span className="text-artora-muted uppercase tracking-wider text-[10px]">Acquisitions</span>
            </div>
            <div className="h-8 w-px bg-artora-warmgrey" />
            <div>
              <span className="font-serif text-2xl text-artora-nearblack block font-semibold">
                {wishlist.length}
              </span>
              <span className="text-artora-muted uppercase tracking-wider text-[10px]">Saved Works</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-6 border-b border-artora-warmgrey pb-3 mb-8 text-xs uppercase tracking-widest font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-artora-nearblack text-artora-nearblack'
                : 'border-transparent text-artora-muted hover:text-artora-nearblack'
            }`}
          >
            Orders & Certificates ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'wishlist'
                ? 'border-artora-nearblack text-artora-nearblack'
                : 'border-transparent text-artora-muted hover:text-artora-nearblack'
            }`}
          >
            Wishlist ({wishlist.length})
          </button>

          <button
            onClick={() => setActiveTab('following')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'following'
                ? 'border-artora-nearblack text-artora-nearblack'
                : 'border-transparent text-artora-muted hover:text-artora-nearblack'
            }`}
          >
            Followed Studios ({followedArtistList.length})
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'addresses'
                ? 'border-artora-nearblack text-artora-nearblack'
                : 'border-transparent text-artora-muted hover:text-artora-nearblack'
            }`}
          >
            Delivery Sanctuaries
          </button>
        </div>

        {/* Tab Content: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-artora-warmgrey shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-artora-warmgrey gap-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm font-bold text-artora-nearblack">
                          {order.orderNumber}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          order.orderStatus === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.orderStatus.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-artora-muted mt-1">
                        Acquired on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="font-semibold text-lg text-artora-nearblack block">
                        {formatPrice(order.total)}
                      </span>
                      <span className="text-[11px] text-emerald-700">Payment Confirmed via Escrow</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="py-6 border-b border-artora-warmgrey space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 h-16 rounded-lg object-cover border border-artora-warmgrey"
                          />
                          <div>
                            <Link to={`/artwork/${item.artworkId}`} className="font-medium text-sm text-artora-nearblack hover:text-artora-cobalt">
                              {item.title}
                            </Link>
                            <p className="text-artora-muted text-[11px] mt-0.5">
                              Artist: {item.artistName} · Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-artora-nearblack">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tracking info */}
                  <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center space-x-2 text-artora-muted">
                      <Truck className="w-4 h-4 text-artora-cobalt" />
                      <span>
                        Carrier: <strong className="text-artora-nearblack">{order.carrier || 'BlueDart Art Courier'}</strong>
                        {order.trackingNumber && <> · Tracking: <strong className="text-artora-nearblack font-mono">{order.trackingNumber}</strong></>}
                      </span>
                    </div>

                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 border border-artora-warmgrey hover:bg-artora-ivory text-artora-nearblack rounded text-[11px] font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View Official Certificate Receipt</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center bg-white rounded-2xl border border-artora-warmgrey p-8">
                <ShoppingBag className="w-10 h-10 text-artora-muted mx-auto mb-3" />
                <h3 className="font-serif text-xl">No Artworks in Order Ledger</h3>
                <p className="text-xs text-artora-muted mt-1">Discover original masterworks and numbered editions in our catalog.</p>
                <Link to="/explore" className="mt-4 inline-block px-6 py-2.5 bg-artora-nearblack text-white rounded text-xs uppercase font-semibold">
                  Explore Art
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistedArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlistedArtworks.map((art) => (
                  <ArtworkCard key={art.id} artwork={art} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-white rounded-2xl border border-artora-warmgrey p-8">
                <Heart className="w-10 h-10 text-artora-muted mx-auto mb-3" />
                <h3 className="font-serif text-xl">Your Wishlist is Empty</h3>
                <p className="text-xs text-artora-muted mt-1">Click the heart icon on any artwork card to curate your private selection.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Followed Studios */}
        {activeTab === 'following' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {followedArtistList.map((artist) => (
              <div key={artist.id} className="bg-white p-6 rounded-2xl border border-artora-warmgrey shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={artist.avatar} alt={artist.name} className="w-12 h-12 rounded-full object-cover border" />
                  <div>
                    <Link to={`/artist/${artist.username}`} className="font-serif text-base text-artora-nearblack hover:text-artora-cobalt font-semibold">
                      {artist.name}
                    </Link>
                    <p className="text-[11px] text-artora-muted">{artist.discipline}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFollowArtist(artist.id)}
                  className="px-3 py-1 bg-artora-ivory border border-artora-warmgrey rounded text-[11px] font-semibold text-artora-nearblack hover:bg-artora-nearblack hover:text-white transition-colors"
                >
                  Unfollow
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-artora-warmgrey shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Primary Residence
              </span>
              <h4 className="font-semibold text-sm text-artora-nearblack mt-3">Tara Mehta</h4>
              <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                72 Maker Towers, Cuffe Parade<br />
                Mumbai, Maharashtra 400005<br />
                India · +91 98201 44521
              </p>
              <div className="mt-4 pt-3 border-t border-artora-warmgrey/50 flex space-x-3 text-xs text-artora-cobalt">
                <button className="hover:underline">Edit Delivery Sanctuary</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
