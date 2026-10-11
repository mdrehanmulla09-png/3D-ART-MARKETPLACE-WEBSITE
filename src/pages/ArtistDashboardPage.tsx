import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  Palette, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Eye, 
  DollarSign, 
  Sparkles,
  ArrowUpRight,
  Truck,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ArtistDashboardPage: React.FC = () => {
  const { 
    user, 
    artworks, 
    orders, 
    formatPrice, 
    deleteArtwork, 
    switchUserRole 
  } = useApp();

  // Find artworks belonging to this artist
  const artistArtworks = artworks.filter(
    (a) => a.artistId === user.artistProfileId || a.artistName === user.name
  );

  const publishedCount = artistArtworks.filter((a) => a.publicationStatus === 'published').length;
  const totalInventory = artistArtworks.reduce((acc, a) => acc + a.inventoryQuantity, 0);

  // Demo earnings calculation
  const totalGrossSales = 245000;
  const netArtistEarnings = Math.round(totalGrossSales * 0.85); // 85% creator payout

  // If currently in buyer mode, offer quick switch
  if (user.role !== 'artist') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-artora-ivory text-center">
        <Palette className="w-12 h-12 text-artora-cobalt mb-4" />
        <h2 className="font-serif text-3xl text-artora-nearblack">Artist Studio Portal</h2>
        <p className="text-xs text-artora-muted mt-2 max-w-md">
          You are currently viewing ARTORA in Collector Mode ({user.name}). Switch to your verified artist profile to access sales, inventory, and artwork uploads.
        </p>
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => switchUserRole('artist')}
            className="px-6 py-2.5 bg-artora-nearblack text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-artora-cobalt transition-colors"
          >
            Switch to Artist Profile (Elena Rostova)
          </button>
          <Link
            to="/artist/join"
            className="px-6 py-2.5 border border-artora-warmgrey text-artora-nearblack text-xs uppercase tracking-widest font-semibold rounded hover:bg-artora-ivory transition-colors"
          >
            Register New Artist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-artora-ivory py-10 selection:bg-artora-cobalt selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-artora-warmgrey/60 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
                Studio Management
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                Verified Artist Partner
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-artora-nearblack mt-1">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs text-artora-muted mt-1 font-light">
              Overview of your catalog, order fulfillments, and scheduled bank disbursements.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/dashboard/orders"
              className="px-4 py-2.5 bg-white border border-artora-warmgrey hover:border-artora-nearblack rounded text-xs uppercase tracking-wider font-semibold text-artora-nearblack transition-colors flex items-center space-x-1.5"
            >
              <Truck className="w-4 h-4 text-artora-cobalt" />
              <span>Orders ({orders.length})</span>
            </Link>

            <Link
              to="/dashboard/artworks/new"
              className="px-5 py-2.5 bg-artora-nearblack hover:bg-artora-cobalt text-white rounded text-xs uppercase tracking-widest font-semibold transition-colors flex items-center space-x-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Artwork</span>
            </Link>
          </div>
        </div>

        {/* Demo Analytics Banner */}
        <div className="my-6 p-3.5 bg-artora-cream rounded-xl border border-artora-warmgrey/80 flex items-center justify-between text-xs text-artora-nearblack">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-artora-burntorange" />
            <span>
              <strong>Sample Analytics:</strong> Metrics shown reflect demonstration platform volume and simulated studio sales.
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-artora-muted tracking-wider">
            Payout Cycle: Bi-Weekly
          </span>
        </div>

        {/* Stat KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="bg-white p-5 rounded-xl border border-artora-warmgrey shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-artora-muted font-semibold block mb-1">
              Total Studio Gross
            </span>
            <span className="text-2xl sm:text-3xl font-semibold text-artora-nearblack">
              {formatPrice(totalGrossSales)}
            </span>
            <div className="mt-2 flex items-center text-xs text-emerald-600 font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>+18.4% vs last month</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-artora-warmgrey shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-artora-muted font-semibold block mb-1">
              Net Creator Payout (85%)
            </span>
            <span className="text-2xl sm:text-3xl font-semibold text-artora-cobalt">
              {formatPrice(netArtistEarnings)}
            </span>
            <span className="text-[11px] text-artora-muted block mt-2">
              Next transfer: 15th of the month
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-artora-warmgrey shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-artora-muted font-semibold block mb-1">
              Published Catalog
            </span>
            <span className="text-2xl sm:text-3xl font-semibold text-artora-nearblack">
              {publishedCount}
            </span>
            <span className="text-[11px] text-artora-muted block mt-2">
              {totalInventory} Units in available stock
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-artora-warmgrey shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-artora-muted font-semibold block mb-1">
              Collector Inquiries & Views
            </span>
            <span className="text-2xl sm:text-3xl font-semibold text-artora-nearblack">
              1,420
            </span>
            <div className="mt-2 flex items-center text-xs text-artora-burntorange font-medium">
              <Eye className="w-3.5 h-3.5 mr-1" />
              <span>High engagement this week</span>
            </div>
          </div>
        </div>

        {/* Visual Analytics Chart & Payout Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Sales Performance Chart (2 cols) */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-artora-warmgrey shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-artora-warmgrey/50">
              <div>
                <h3 className="font-serif text-xl text-artora-nearblack">Revenue Velocity (Demo Data)</h3>
                <p className="text-xs text-artora-muted mt-0.5">Monthly gross acquisitions in INR</p>
              </div>
              <span className="text-xs uppercase font-semibold text-artora-cobalt bg-artora-ivory px-2.5 py-1 rounded border border-artora-warmgrey">
                2025 Annual Cycle
              </span>
            </div>

            {/* Simulated Chart Bars */}
            <div className="h-52 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { month: 'Oct', amount: 32000, height: '35%' },
                { month: 'Nov', amount: 48000, height: '52%' },
                { month: 'Dec', amount: 95000, height: '95%' },
                { month: 'Jan', amount: 64000, height: '65%' },
                { month: 'Feb', amount: 82000, height: '82%' },
                { month: 'Mar', amount: 110000, height: '100%' },
              ].map((bar) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center group h-full justify-end">
                  <span className="text-[10px] font-mono font-medium text-artora-muted mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatPrice(bar.amount)}
                  </span>
                  <div
                    className="w-full bg-artora-charcoal group-hover:bg-artora-cobalt transition-all duration-300 rounded-t-md"
                    style={{ height: bar.height }}
                  />
                  <span className="text-xs font-semibold text-artora-nearblack mt-3">
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payout & Studio Status (1 col) */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-artora-warmgrey shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl text-artora-nearblack pb-3 border-b border-artora-warmgrey/50">
                Studio Payout Status
              </h3>
              
              <div className="mt-5 space-y-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-artora-muted">Escrow Account:</span>
                  <span className="font-mono font-semibold text-artora-nearblack">HDFC Bank ··· 9821</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-artora-muted">Disbursement Frequency:</span>
                  <span className="font-semibold text-artora-nearblack">Every 1st & 15th</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-artora-muted">Platform Fee:</span>
                  <span className="font-semibold text-artora-nearblack">15% (All-inclusive)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-artora-muted">Insurance Surcharge:</span>
                  <span className="font-semibold text-emerald-700">Covered by Buyer</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-artora-warmgrey">
              <Link
                to={`/artist/elena-rostova`}
                className="w-full py-2.5 bg-artora-ivory hover:bg-white text-artora-nearblack border border-artora-warmgrey rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Preview Public Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Artworks Management Table */}
        <div className="bg-white rounded-2xl border border-artora-warmgrey shadow-sm overflow-hidden mb-12">
          <div className="p-6 sm:p-8 border-b border-artora-warmgrey flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl text-artora-nearblack">Your Art Listings</h3>
              <p className="text-xs text-artora-muted mt-0.5">Manage live gallery works, pricing, and available editions</p>
            </div>

            <Link
              to="/dashboard/artworks/new"
              className="px-4 py-2 bg-artora-nearblack hover:bg-artora-cobalt text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Listing</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-artora-ivory/60 border-b border-artora-warmgrey text-artora-muted uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4 pl-6">Artwork Piece</th>
                  <th className="p-4">Medium & Classification</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Inventory</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-artora-warmgrey/50">
                {artistArtworks.length > 0 ? (
                  artistArtworks.map((art) => (
                    <tr key={art.id} className="hover:bg-artora-ivory/30 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={art.images[0]?.url}
                            alt={art.title}
                            className="w-12 h-12 rounded object-cover border border-artora-warmgrey flex-shrink-0"
                          />
                          <div>
                            <Link to={`/artwork/${art.id}`} className="font-medium text-artora-nearblack hover:text-artora-cobalt line-clamp-1">
                              {art.title}
                            </Link>
                            <span className="text-[11px] text-artora-muted">{art.dimensions}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="text-artora-nearblack font-medium">{art.category}</span>
                        <span className="text-[11px] text-artora-muted block">{art.artworkType.replace('_', ' ')}</span>
                      </td>

                      <td className="p-4 font-semibold text-artora-nearblack">
                        {formatPrice(art.price)}
                      </td>

                      <td className="p-4">
                        {art.inventoryQuantity > 0 ? (
                          <span className="text-emerald-700 font-semibold">{art.inventoryQuantity} available</span>
                        ) : (
                          <span className="text-rose-600 font-semibold">Sold Out</span>
                        )}
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800">
                          {art.publicationStatus}
                        </span>
                      </td>

                      <td className="p-4 pr-6 text-right space-x-2">
                        <Link
                          to={`/artwork/${art.id}`}
                          className="p-1.5 text-artora-muted hover:text-artora-cobalt inline-block"
                          title="View live in gallery"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteArtwork(art.id)}
                          className="p-1.5 text-artora-muted hover:text-rose-600 inline-block"
                          title="Remove listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-artora-muted">
                      No artworks uploaded yet. Click "Add Listing" to publish your first work!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
