import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Palette, Globe, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-artora-ivory py-16 selection:bg-artora-cobalt selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center pb-12 border-b border-artora-warmgrey">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
            Our Manifesto & Practice
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-artora-nearblack mt-2">
            Art Beyond the Ordinary.
          </h1>
          <p className="mt-4 text-base text-artora-muted max-w-xl mx-auto font-light leading-relaxed">
            ARTORA was founded to dismantle the sterile barriers between independent artist studios and discerning international collectors.
          </p>
        </div>

        {/* Narrative */}
        <div className="py-12 space-y-12 text-artora-nearblack/85 leading-relaxed text-sm">
          
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-artora-nearblack">
              The Genesis: Spatial Curation Meets Living Paint
            </h2>
            <p className="font-light">
              For decades, acquiring fine art online felt like browsing an ordinary department store catalog: flat 2D jpeg thumbnails stripped of physical presence, architectural light interplay, and tactile brush impasto.
            </p>
            <p className="font-light">
              ARTORA changes this forever. Built on cutting-edge WebGL 3D rendering, our spatial digital gallery allows patrons to experience artwork floating within lit rooms, examine frame depths from multiple angles, and take guided exhibition walks from any device across the globe.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-artora-warmgrey">
            <div className="p-4 bg-white rounded-xl border border-artora-warmgrey">
              <Palette className="w-6 h-6 text-artora-cobalt mb-3" />
              <h3 className="font-serif text-lg text-artora-nearblack">85% to Creators</h3>
              <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                Traditional galleries demand 50% commissions. ARTORA returns 85% of every transaction directly into artist studios.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-artora-warmgrey">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
              <h3 className="font-serif text-lg text-artora-nearblack">Tamper-Evident Provenance</h3>
              <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                Every physical original ships with a signed, serialized certificate of authenticity and tamper-evident holographic seal.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-artora-warmgrey">
              <Globe className="w-6 h-6 text-artora-burntorange mb-3" />
              <h3 className="font-serif text-lg text-artora-nearblack">Global White-Glove</h3>
              <p className="text-xs text-artora-muted mt-1 leading-relaxed">
                Custom wooden crating, insured transit, and 14-day in-room collector trial guarantees complete peace of mind.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-artora-nearblack">
              Rooted in India, Revered Globally
            </h2>
            <p className="font-light">
              While celebrating visionary creators from Berlin to Copenhagen and Tokyo, ARTORA is proud to highlight the rich, organic materiality of the subcontinent—from raw Fort Kochi khadi canvases and Shekhawati indigo to architectural Jaipur silver-gelatin photography.
            </p>
          </div>

          {/* Call to action */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between p-8 bg-artora-charcoal text-white rounded-2xl gap-4">
            <div>
              <h3 className="font-serif text-2xl">Step into the gallery today</h3>
              <p className="text-xs text-white/70 mt-1">Discover original masterworks curated for exceptional interiors.</p>
            </div>
            <Link
              to="/explore"
              className="px-6 py-3 bg-white text-artora-nearblack hover:bg-artora-cobalt hover:text-white rounded text-xs uppercase tracking-widest font-semibold transition-all whitespace-nowrap"
            >
              Explore Artworks
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
