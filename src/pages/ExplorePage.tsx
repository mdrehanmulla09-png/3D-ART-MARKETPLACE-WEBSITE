import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { ArtworkCard } from '../components/artwork/ArtworkCard';
import { QuickViewModal } from '../components/artwork/QuickViewModal';
import { useApp } from '../context/AppContext';
import { Artwork, ArtworkCategory } from '../types';

export const ExplorePage: React.FC = () => {
  const { artworks, formatPrice } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Sync
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';

  // Local filter states
  const [search, setSearch] = useState(searchParam);
  const [category, setCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [artworkType, setArtworkType] = useState<string>('all');
  const [orientation, setOrientation] = useState<string>('all');
  const [availability, setAvailability] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewArtwork, setQuickViewArtwork] = useState<Artwork | null>(null);

  // Sync state if URL changes
  useEffect(() => {
    if (categoryParam) setCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (searchParam) setSearch(searchParam);
  }, [searchParam]);

  const categories: (ArtworkCategory | 'All')[] = [
    'All',
    'Abstract Art',
    'Contemporary Painting',
    'Digital Art',
    'Photography',
    'Sculpture',
    'Illustration',
    'Mixed Media',
    'Prints and Posters',
  ];

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setPriceRange('all');
    setArtworkType('all');
    setOrientation('all');
    setAvailability('all');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = 
    search !== '' || 
    category !== 'All' || 
    priceRange !== 'all' || 
    artworkType !== 'all' || 
    orientation !== 'all' || 
    availability !== 'all';

  // Filter & Sort Logic
  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        // Search
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = art.title.toLowerCase().includes(q);
          const matchArtist = art.artistName.toLowerCase().includes(q);
          const matchMedium = art.medium.toLowerCase().includes(q);
          const matchTags = art.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchArtist && !matchMedium && !matchTags) return false;
        }

        // Category
        if (category !== 'All' && art.category !== category) return false;

        // Artwork Type
        if (artworkType === 'original' && art.artworkType !== 'original') return false;
        if (artworkType === 'limited_edition' && art.artworkType !== 'limited_edition') return false;
        if (artworkType === 'print' && art.artworkType !== 'open_edition' && art.artworkType !== 'limited_edition') return false;

        // Orientation
        if (orientation !== 'all' && art.orientation !== orientation) return false;

        // Availability
        if (availability === 'in_stock' && art.inventoryQuantity <= 0) return false;

        // Price range (in INR)
        if (priceRange === 'under_10k' && art.price >= 10000) return false;
        if (priceRange === '10k_50k' && (art.price < 10000 || art.price > 50000)) return false;
        if (priceRange === '50k_100k' && (art.price < 50000 || art.price > 100000)) return false;
        if (priceRange === 'above_100k' && art.price <= 100000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'popularity') return b.viewsCount - a.viewsCount;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [artworks, search, category, priceRange, artworkType, orientation, availability, sortBy]);

  return (
    <div className="min-h-screen bg-artora-ivory py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Page Header */}
        <div className="border-b border-artora-warmgrey/60 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
                Permanent Collection & Studios
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-artora-nearblack mt-2">
                Discover Original Art
              </h1>
              <p className="text-xs text-artora-muted mt-2 font-light">
                Showing {filteredArtworks.length} curated artworks across {categories.length - 1} disciplines
              </p>
            </div>

            {/* Top Search & Filter Bar */}
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-artora-muted" />
                <input
                  type="text"
                  placeholder="Search title, artist, medium..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-artora-warmgrey rounded-lg pl-9 pr-8 py-2 text-xs text-artora-nearblack placeholder-artora-muted focus:outline-none focus:border-artora-cobalt"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 top-2.5 text-artora-muted hover:text-artora-nearblack"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort artworks"
                  className="bg-white border border-artora-warmgrey rounded-lg px-3 py-2 text-xs text-artora-nearblack font-medium focus:outline-none focus:border-artora-cobalt w-full sm:w-auto"
                >
                  <option value="featured">Sort: Curators' Featured</option>
                  <option value="newest">Sort: Newest Acquisitions</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popularity">Most Viewed & Collected</option>
                </select>

                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center space-x-1.5 px-3 py-2 bg-white border border-artora-warmgrey rounded-lg text-xs font-semibold text-artora-nearblack"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-artora-warmgrey/40">
              <span className="text-[10px] uppercase tracking-wider text-artora-muted font-semibold mr-1">
                Active Filters:
              </span>

              {category !== 'All' && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] bg-artora-nearblack text-white gap-1.5">
                  Category: {category}
                  <button onClick={() => setCategory('All')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {search && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] bg-artora-nearblack text-white gap-1.5">
                  Search: "{search}"
                  <button onClick={() => setSearch('')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {priceRange !== 'all' && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] bg-artora-cobalt text-white gap-1.5">
                  Price: {priceRange.replace('_', ' ').toUpperCase()}
                  <button onClick={() => setPriceRange('all')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {artworkType !== 'all' && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] bg-artora-burntorange text-white gap-1.5">
                  Type: {artworkType.replace('_', ' ').toUpperCase()}
                  <button onClick={() => setArtworkType('all')}><X className="w-3 h-3" /></button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="inline-flex items-center text-[11px] text-artora-muted hover:text-artora-nearblack underline ml-2"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-8 pr-4">
            
            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-artora-nearblack mb-3">
                Disciplines
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      if (cat !== 'All') {
                        setSearchParams({ category: cat });
                      } else {
                        setSearchParams({});
                      }
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                      category === cat
                        ? 'bg-artora-nearblack text-white font-medium'
                        : 'text-artora-nearblack/75 hover:bg-artora-warmgrey/40'
                    }`}
                  >
                    <span>{cat}</span>
                    {category === cat && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-6 border-t border-artora-warmgrey/60">
              <h3 className="text-xs uppercase tracking-widest font-bold text-artora-nearblack mb-3">
                Price (INR)
              </h3>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Price Tiers' },
                  { id: 'under_10k', label: 'Under ₹10,000 (Archival Works)' },
                  { id: '10k_50k', label: '₹10,000 – ₹50,000' },
                  { id: '50k_100k', label: '₹50,000 – ₹1,00,000' },
                  { id: 'above_100k', label: 'Over ₹1,00,000 (Major Works)' },
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center space-x-2.5 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === tier.id}
                      onChange={() => setPriceRange(tier.id)}
                      className="accent-artora-cobalt"
                    />
                    <span className={priceRange === tier.id ? 'font-semibold text-artora-nearblack' : 'text-artora-nearblack/75'}>
                      {tier.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Artwork Type */}
            <div className="pt-6 border-t border-artora-warmgrey/60">
              <h3 className="text-xs uppercase tracking-widest font-bold text-artora-nearblack mb-3">
                Classification
              </h3>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Formats' },
                  { id: 'original', label: 'Original 1-of-1 Paintings' },
                  { id: 'limited_edition', label: 'Numbered Limited Editions' },
                  { id: 'print', label: 'Museum Prints' },
                ].map((type) => (
                  <label key={type.id} className="flex items-center space-x-2.5 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="artworkType"
                      checked={artworkType === type.id}
                      onChange={() => setArtworkType(type.id)}
                      className="accent-artora-burntorange"
                    />
                    <span className={artworkType === type.id ? 'font-semibold text-artora-nearblack' : 'text-artora-nearblack/75'}>
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div className="pt-6 border-t border-artora-warmgrey/60">
              <h3 className="text-xs uppercase tracking-widest font-bold text-artora-nearblack mb-3">
                Orientation
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {['all', 'portrait', 'landscape', 'square'].map((ori) => (
                  <button
                    key={ori}
                    onClick={() => setOrientation(ori)}
                    className={`py-1.5 px-2 text-[11px] uppercase tracking-wider rounded border text-center transition-all ${
                      orientation === ori
                        ? 'bg-artora-nearblack text-white border-artora-nearblack font-semibold'
                        : 'border-artora-warmgrey text-artora-nearblack/70 hover:border-artora-nearblack'
                    }`}
                  >
                    {ori}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Artwork Grid */}
          <main className="lg:col-span-3">
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredArtworks.map((art) => (
                  <ArtworkCard
                    key={art.id}
                    artwork={art}
                    onQuickView={(item) => setQuickViewArtwork(item)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-20 text-center bg-white rounded-2xl border border-artora-warmgrey p-8 max-w-lg mx-auto">
                <Sparkles className="w-10 h-10 text-artora-muted mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-artora-nearblack">No Artworks Match Your Curation</h3>
                <p className="text-xs text-artora-muted mt-2 leading-relaxed">
                  Try adjusting your price range or clearing active discipline filters to reveal more works from the studio catalog.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-artora-nearblack text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-artora-cobalt transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-artora-ivory h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-artora-warmgrey">
                <span className="font-serif text-lg text-artora-nearblack">Curator Filters</span>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-5 h-5 text-artora-nearblack" />
                </button>
              </div>

              {/* Mobile Filter Options */}
              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-bold text-artora-nearblack mb-2">Category</h4>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`block w-full text-left text-xs py-1.5 px-2 rounded ${
                          category === cat ? 'bg-artora-nearblack text-white' : 'text-artora-nearblack'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-artora-warmgrey">
                  <h4 className="text-xs uppercase font-bold text-artora-nearblack mb-2">Classification</h4>
                  {['all', 'original', 'limited_edition', 'print'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setArtworkType(t)}
                      className={`block w-full text-left text-xs py-1.5 px-2 rounded ${
                        artworkType === t ? 'bg-artora-cobalt text-white' : 'text-artora-nearblack'
                      }`}
                    >
                      {t.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-artora-warmgrey space-y-2">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-artora-nearblack text-white text-xs uppercase tracking-widest font-semibold rounded"
              >
                Apply Filters ({filteredArtworks.length} Results)
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2 text-xs text-artora-muted underline"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        artwork={quickViewArtwork}
        onClose={() => setQuickViewArtwork(null)}
      />

    </div>
  );
};
