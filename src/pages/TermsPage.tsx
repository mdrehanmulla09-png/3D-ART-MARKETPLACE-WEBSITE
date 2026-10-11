import React from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-artora-ivory py-16 selection:bg-artora-cobalt selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-artora-warmgrey pb-8 mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
            Marketplace Protocol
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-artora-nearblack mt-2">
            Terms of Service & Curation Rules
          </h1>
          <p className="text-xs text-artora-muted mt-2">
            Governing Marketplace Transactions, Artist Representations, and Collector Rights
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-artora-warmgrey shadow-sm space-y-8 text-xs text-artora-nearblack/85 leading-relaxed font-light">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-artora-nearblack font-semibold">
              1. Originality and Provenance Warranty
            </h2>
            <p>
              Every artist registered on ARTORA warrants that all displayed works are 100% original creations solely produced by the artist, free of copyright infringements, unauthorized replicas, or undisclosed third-party intellectual property claims. Every physical original must include a signed Certificate of Authenticity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-artora-nearblack font-semibold">
              2. 1-of-1 Unique Artwork Protection
            </h2>
            <p>
              Original works marked as "Unique Original (1 of 1)" exist in a singular edition worldwide. Once an acquisition order is authorized, ARTORA's inventory protocol automatically removes the piece from public availability to prevent duplicate claims.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-artora-nearblack font-semibold">
              3. Curatorial Escrow Settlement
            </h2>
            <p>
              To protect both parties, buyer funds are held in platform escrow upon checkout. The artist receives disbursement after the 14-day collector trial window concludes, ensuring that damage or transport discrepancies are resolved impartially.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-artora-nearblack font-semibold">
              4. 14-Day In-Sanctuary Return Policy
            </h2>
            <p>
              Patrons have 14 calendar days from documented courier delivery to initiate a return if an artwork does not harmonize with their space. Works must be repackaged in their original protective crating.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
