import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-artora-ivory py-16 selection:bg-artora-cobalt selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-artora-warmgrey pb-8 mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
            Trust & Discretion
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-artora-nearblack mt-2">
            Privacy Policy & Data Ethics
          </h1>
          <p className="text-xs text-artora-muted mt-2">
            Effective Date: March 2025 · Last Updated for Global Curatorial Operations
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-artora-warmgrey shadow-sm space-y-8 text-xs text-artora-nearblack/85 leading-relaxed font-light">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-artora-nearblack font-semibold">
              1. Our Foundational Commitment
            </h2>
            <p>
              ARTORA operates with the discretion expected of high-end international art galleries. We do not sell, rent, or trade collector acquisition records, artist identities, or personal financial information to third-party data brokers or advertising networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-artora-nearblack font-semibold">
              2. Financial Data and Payment Processing
            </h2>
            <p>
              ARTORA does not store or process raw credit card numbers or banking secrets on application servers. All financial transactions are tokenized via PCI-DSS Level 1 compliant processors (Stripe Inc. and Razorpay Software Private Ltd.) via end-to-end TLS 1.3 encryption.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-artora-nearblack font-semibold">
              3. Delivery Sanctuary Discretion
            </h2>
            <p>
              Delivery addresses and contact numbers provided during checkout are strictly shared with authorized white-glove art logistics partners solely for executing insured custom crating and direct delivery of your artwork.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-artora-nearblack font-semibold">
              4. 3D Spatial Rendering & Device Metrics
            </h2>
            <p>
              Our WebGL 3D virtual gallery inspects local device GPU capabilities strictly to select optimal geometry levels of detail (LOD) and shader lighting. No device fingerprints or biometric facial telemetry are recorded.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
