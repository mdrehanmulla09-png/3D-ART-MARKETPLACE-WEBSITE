import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CURATED_COLLECTIONS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ArtworkCard } from '../components/artwork/ArtworkCard';

export const CollectionsPage: React.FC = () => {
  const { artworks } = useApp();

  return (
    <div className="min-h-screen bg-artora-ivory py-12 selection:bg-artora-cobalt selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-artora-warmgrey/60 pb-8 mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
            Thematic Suites
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-artora-nearblack mt-2">
            Curated Collections
          </h1>
          <p className="mt-3 text-sm text-artora-muted max-w-xl font-light">
            Editorial groupings assembled by our curatorial council to help patrons discover works linked by architectural mood, historical lineage, or aesthetic philosophy.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-24">
          {CURATED_COLLECTIONS.map((col, index) => {
            const collectionArtworks = artworks.filter((a) => col.artworkIds.includes(a.id));
            const isReversed = index % 2 === 1;

            return (
              <section key={col.id} id={col.slug} className="scroll-mt-24 pt-4 border-t border-artora-warmgrey/40 first:border-0 first:pt-0">
                
                {/* Collection Feature Banner */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}>
                  
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                    <span className="text-[10px] uppercase tracking-widest text-artora-burntorange font-semibold block mb-1">
                      Curated by {col.curatorName}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-artora-nearblack">
                      {col.title}
                    </h2>
                    <p className="text-sm text-artora-cobalt font-medium mt-1">
                      {col.subtitle}
                    </p>
                    <p className="mt-4 text-xs text-artora-nearblack/75 leading-relaxed font-light">
                      {col.description}
                    </p>
                    <div className="mt-6">
                      <Link
                        to={`/explore`}
                        className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-artora-nearblack hover:text-artora-cobalt transition-colors group"
                      >
                        <span>Acquire From This Suite</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-artora-warmgrey shadow-md relative">
                      <img
                        src={col.coverImage}
                        alt={col.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-artora-charcoal/50 to-transparent" />
                    </div>
                  </div>

                </div>

                {/* Collection Artworks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {collectionArtworks.map((art) => (
                    <ArtworkCard key={art.id} artwork={art} />
                  ))}
                </div>

              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
};
