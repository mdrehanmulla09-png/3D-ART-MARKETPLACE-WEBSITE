import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  UserCheck, 
  ShieldCheck, 
  Package, 
  TrendingUp, 
  Palette,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { HeroScene3D } from '../components/3d/HeroScene3D';
import { ArtworkCard } from '../components/artwork/ArtworkCard';
import { QuickViewModal } from '../components/artwork/QuickViewModal';
import { 
  CATEGORIES_DATA, 
  CURATED_COLLECTIONS, 
  TESTIMONIALS 
} from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Artwork } from '../types';

export const HomePage: React.FC = () => {
  const { artworks, artists, toggleFollowArtist, isFollowing } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [quickViewArtwork, setQuickViewArtwork] = useState<Artwork | null>(null);

  // Filter artworks for the curated section
  const filteredCuratedArtworks = artworks.filter((art) => {
    if (selectedCategory !== 'All' && art.category !== selectedCategory) return false;
    if (selectedType !== 'all') {
      if (selectedType === 'original' && art.artworkType !== 'original') return false;
      if (selectedType === 'print' && art.artworkType !== 'limited_edition' && art.artworkType !== 'open_edition') return false;
    }
    return true;
  }).slice(0, 8);

  const categoryFilterList = ['All', 'Abstract Art', 'Contemporary Painting', 'Digital Art', 'Sculpture', 'Photography'];

  return (
    <div className="min-h-screen bg-artora-ivory text-artora-nearblack selection:bg-artora-cobalt selection:text-white">
      
      {/* 1. Signature 3D Hero Section */}
      <HeroScene3D />

      {/* 2. Featured Editorial Categories */}
      <section className="py-24 border-t border-artora-warmgrey/60 bg-artora-cream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
                Curated Disciplines
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-artora-nearblack mt-2">
                Explore by Artistic Medium
              </h2>
            </div>
            <Link
              to="/explore"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-artora-nearblack hover:text-artora-cobalt transition-colors group"
            >
              <span>View All 8 Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES_DATA.map((cat) => (
              <Link
                key={cat.name}
                to={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-artora-charcoal flex flex-col justify-end p-5 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-artora-charcoal/90 via-artora-charcoal/30 to-transparent" />
                
                <div className="relative z-10 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-white/70 block mb-1">
                    {cat.count} Curated Pieces
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-artora-cream transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-white/70 line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Curated Artwork Collection: "Collected With Intention" */}
      <section className="py-24 border-t border-artora-warmgrey/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-artora-burntorange font-semibold">
                Curator's Spotlight
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-artora-nearblack mt-2">
                Collected With Intention.
              </h2>
              <p className="mt-3 text-sm text-artora-muted max-w-xl font-light">
                Original expressions and numbered museum prints hand-selected by our advisory board for conceptual integrity and physical craft.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="mt-6 lg:mt-0 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-artora-warmgrey">
                {categoryFilterList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-artora-nearblack text-white shadow-sm'
                        : 'text-artora-nearblack/70 hover:text-artora-nearblack'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-artora-warmgrey">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedType === 'all'
                      ? 'bg-artora-cobalt text-white shadow-sm'
                      : 'text-artora-nearblack/70 hover:text-artora-nearblack'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedType('original')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedType === 'original'
                      ? 'bg-artora-cobalt text-white shadow-sm'
                      : 'text-artora-nearblack/70 hover:text-artora-nearblack'
                  }`}
                >
                  Originals (1 of 1)
                </button>
                <button
                  onClick={() => setSelectedType('print')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedType === 'print'
                      ? 'bg-artora-cobalt text-white shadow-sm'
                      : 'text-artora-nearblack/70 hover:text-artora-nearblack'
                  }`}
                >
                  Editions & Prints
                </button>
              </div>
            </div>
          </div>

          {/* Artwork Grid with 3D Tilt Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredCuratedArtworks.map((art) => (
              <ArtworkCard
                key={art.id}
                artwork={art}
                onQuickView={(item) => setQuickViewArtwork(item)}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/explore"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-artora-nearblack text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-artora-cobalt transition-colors shadow-gallery"
            >
              <span>Explore Complete Marketplace Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Immersive Virtual Gallery Feature Spotlight */}
      <section className="py-24 bg-artora-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#435BFF_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-artora-cobalt text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-white">Spatial WebGL Engine</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl text-white leading-tight">
                Step Inside the Art.
              </h2>

              <p className="mt-6 text-base text-white/75 font-light leading-relaxed">
                Experience our virtual exhibition hall where physical scale, brushwork impasto, and directional studio light reflect in real time. Take a curated guided tour or wander freely with spatial acoustics.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/gallery"
                  className="w-full sm:w-auto px-8 py-4 bg-artora-cobalt hover:bg-blue-600 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-lg transition-all flex items-center justify-center space-x-2 group"
                >
                  <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  <span>Enter the Gallery</span>
                </Link>

                <span className="text-xs text-white/50 tracking-wider">
                  No VR headset needed · Runs in standard web browsers
                </span>
              </div>
            </div>

            {/* Visual 3D Miniature Gallery Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"
                alt="3D Virtual Gallery Pavilion Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-artora-charcoal via-transparent to-black/30" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-white">Spring Pavilion Exhibition</p>
                  <p className="text-white/60 text-[11px]">8 Curated Masterworks in Spatial 3D</p>
                </div>
                <Link
                  to="/gallery"
                  className="px-3 py-1.5 bg-white text-artora-nearblack font-semibold rounded text-[11px] uppercase tracking-wider hover:bg-artora-cobalt hover:text-white transition-colors"
                >
                  Launch Room
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Featured Artists: "Meet the Minds Behind the Art" */}
      <section className="py-24 border-t border-artora-warmgrey/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
                Visionaries
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-artora-nearblack mt-2">
                Meet the Minds Behind the Art.
              </h2>
              <p className="mt-3 text-sm text-artora-muted max-w-xl font-light">
                Discover the biographies, cultural lineages, and studio practices of our vetted international artists.
              </p>
            </div>
            
            <Link
              to="/artists"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-artora-nearblack hover:text-artora-cobalt transition-colors group"
            >
              <span>Explore Artist Directory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artists.slice(0, 3).map((artist) => {
              const following = isFollowing(artist.id);
              return (
                <div
                  key={artist.id}
                  className="bg-white rounded-xl overflow-hidden border border-artora-warmgrey/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Artist Cover & Portrait */}
                  <div className="relative h-44 bg-artora-charcoal overflow-hidden">
                    <img
                      src={artist.coverImage}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute -bottom-6 left-6 flex items-end space-x-3">
                      <img
                        src={artist.avatar}
                        alt={artist.name}
                        className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="pt-10 p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Link
                            to={`/artist/${artist.username}`}
                            className="font-serif text-2xl text-artora-nearblack hover:text-artora-cobalt transition-colors block"
                          >
                            {artist.name}
                          </Link>
                          <span className="text-[11px] text-artora-muted block">
                            {artist.discipline} · {artist.location}
                          </span>
                        </div>
                        {artist.isVerified && (
                          <span className="p-1 rounded-full bg-blue-50 text-artora-cobalt" title="Verified Artist">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </div>

                      <p className="mt-4 text-xs text-artora-nearblack/75 line-clamp-3 leading-relaxed font-light italic">
                        "{artist.statement}"
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-artora-warmgrey/40 flex items-center justify-between">
                      <button
                        onClick={() => toggleFollowArtist(artist.id)}
                        className={`px-4 py-1.5 rounded text-xs uppercase tracking-wider font-semibold border transition-all ${
                          following
                            ? 'bg-artora-nearblack text-white border-artora-nearblack'
                            : 'border-artora-warmgrey hover:border-artora-nearblack text-artora-nearblack'
                        }`}
                      >
                        {following ? 'Following' : 'Follow Artist'}
                      </button>

                      <Link
                        to={`/artist/${artist.username}`}
                        className="text-xs text-artora-cobalt hover:underline font-medium flex items-center space-x-1"
                      >
                        <span>View Portfolio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Curated Editorial Collections */}
      <section className="py-24 bg-artora-cream/70 border-t border-artora-warmgrey/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14">
            <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
              Thematic Dialogues
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-artora-nearblack mt-2">
              Curated Collections
            </h2>
            <p className="mt-3 text-sm text-artora-muted max-w-xl font-light">
              Cohesive suites of artworks gathered around architectural mood, historical technique, and price points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURATED_COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                to={`/collections#${col.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[16/11] bg-artora-charcoal flex flex-col justify-end p-6 shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={col.coverImage}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-artora-charcoal via-artora-charcoal/40 to-transparent" />
                
                <div className="relative z-10 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-artora-burntorange font-semibold block mb-1">
                    Curated by {col.curatorName}
                  </span>
                  <h3 className="font-serif text-2xl text-white group-hover:text-artora-cream transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-1 line-clamp-2 font-light">
                    {col.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 7. How ARTORA Works (For Collectors & Artists) */}
      <section className="py-24 border-t border-artora-warmgrey/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
              Transparent Ecosystem
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-artora-nearblack mt-2">
              How ARTORA Works
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* For Buyers */}
            <div className="bg-white p-8 rounded-2xl border border-artora-warmgrey shadow-sm">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-artora-cobalt mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>For Collectors & Patrons</span>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4">
                  <span className="w-8 h-8 rounded-full bg-artora-ivory border border-artora-warmgrey font-serif text-sm flex items-center justify-center font-bold text-artora-nearblack flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-artora-nearblack">Discover & Inspect in 3D</h4>
                    <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                      Examine canvas brush strokes, lighting reflections, and true dimensions in our spatial 3D rooms.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <span className="w-8 h-8 rounded-full bg-artora-ivory border border-artora-warmgrey font-serif text-sm flex items-center justify-center font-bold text-artora-nearblack flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-artora-nearblack">Direct Studio Dialogue</h4>
                    <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                      Connect directly with artists, inquire about custom commissions, and understand artwork provenance.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <span className="w-8 h-8 rounded-full bg-artora-ivory border border-artora-warmgrey font-serif text-sm flex items-center justify-center font-bold text-artora-nearblack flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-artora-nearblack">Insured White-Glove Acquisition</h4>
                    <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                      Guaranteed physical certificates of authenticity, museum wooden crating, and 14-day in-home protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Artists */}
            <div className="bg-white p-8 rounded-2xl border border-artora-warmgrey shadow-sm">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-artora-burntorange mb-6">
                <Palette className="w-4 h-4" />
                <span>For Independent Artists</span>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4">
                  <span className="w-8 h-8 rounded-full bg-artora-ivory border border-artora-warmgrey font-serif text-sm flex items-center justify-center font-bold text-artora-nearblack flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-artora-nearblack">Create Your Digital Portfolio</h4>
                    <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                      Build an editorial studio profile highlighting your artistic statement, CV exhibitions, and mediums.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <span className="w-8 h-8 rounded-full bg-artora-ivory border border-artora-warmgrey font-serif text-sm flex items-center justify-center font-bold text-artora-nearblack flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-artora-nearblack">Upload & Price Originals or Prints</h4>
                    <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                      Set your pricing in INR and international currencies. Maintain 85% artist share with transparent fees.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <span className="w-8 h-8 rounded-full bg-artora-ivory border border-artora-warmgrey font-serif text-sm flex items-center justify-center font-bold text-artora-nearblack flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-artora-nearblack">Manage Global Sales Seamlessly</h4>
                    <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                      Receive instant collector orders, generate prepaid shipping labels, and track direct bank payouts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Artist Recruitment Section: "Your Art Deserves to Be Seen" */}
      <section className="py-24 bg-artora-charcoal text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
            Open Call for Creators
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-white mt-3 leading-tight max-w-3xl mx-auto">
            Your Art Deserves to Be Seen.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl mx-auto font-light leading-relaxed">
            Build your presence, showcase your vision in 3D spaces, and connect with people who truly value your original voice.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/artist/join"
              className="px-8 py-4 bg-white text-artora-nearblack hover:bg-artora-cobalt hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-xl"
            >
              Start Selling Your Art
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded border border-white/20 transition-colors"
            >
              Read Artist Guidelines
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Tasteful Demonstration Testimonials */}
      <section className="py-24 border-t border-artora-warmgrey/60 bg-artora-cream/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-artora-muted font-semibold">
              Collector & Artist Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-artora-nearblack mt-2">
              Voices From Our Community
            </h2>
            <p className="text-[11px] text-artora-muted mt-2 italic">
              Demonstration testimonials reflecting collector & partner satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-8 rounded-2xl border border-artora-warmgrey shadow-sm flex flex-col justify-between"
              >
                <p className="text-sm text-artora-nearblack/80 font-light italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-8 pt-4 border-t border-artora-warmgrey/40 flex items-center space-x-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-artora-warmgrey"
                  />
                  <div>
                    <h5 className="font-serif text-sm text-artora-nearblack font-semibold">{t.author}</h5>
                    <p className="text-[11px] text-artora-muted">{t.role} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        artwork={quickViewArtwork}
        onClose={() => setQuickViewArtwork(null)}
      />

    </div>
  );
};
