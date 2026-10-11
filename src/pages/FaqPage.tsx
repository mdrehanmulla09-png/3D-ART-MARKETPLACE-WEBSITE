import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: 'buyers' | 'artists' | 'logistics';
}

const FAQS: FaqItem[] = [
  {
    category: 'buyers',
    q: 'How does ARTORA ensure the authenticity of original artworks?',
    a: 'Every original piece purchased on ARTORA is dispatched directly from the artist studio and comes with a physical, serialized Certificate of Authenticity signed by the artist. For numbered editions, each work features an embossed artist studio seal and numbering in the lower margin.',
  },
  {
    category: 'buyers',
    q: 'What is the 14-day in-room trial policy?',
    a: 'We understand that art must resonate within your private sanctuary. If a piece does not suit your space, notify us within 14 days of delivery for a full refund. We coordinate insured return crating directly from your residence.',
  },
  {
    category: 'buyers',
    q: 'Can I request custom framing or specific glass options?',
    a: 'Yes. Many original works come custom-framed as indicated on their product page. For unframed works, you can request custom conservation framing with Museum Glass UV-reflection barrier by contacting the artist through the inquiry button.',
  },
  {
    category: 'logistics',
    q: 'How are fragile sculptures and large canvases packaged?',
    a: 'We utilize museum-standard transit protocols: high-density shock foam, moisture barriers, and custom wooden crating tailored to the exact dimensions of each sculpture and painting. All shipments are fully insured against loss or damage.',
  },
  {
    category: 'artists',
    q: 'What is the commission split on ARTORA?',
    a: 'Artists retain 85% of their listed price. ARTORA charges a transparent 15% platform commission which covers international payment processing, 3D WebGL hosting, and marketing. Unlike brick-and-mortar galleries that demand 50%, we put creators first.',
  },
  {
    category: 'artists',
    q: 'When and how do artists receive payouts?',
    a: 'Payouts are disbursed automatically every 1st and 15th of the month via direct electronic bank transfer (NEFT/RTGS for India, wire transfer or Stripe for international creators) after the collector delivery confirmation period concludes.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'buyers' | 'artists' | 'logistics'>('all');

  const filteredFaqs = FAQS.filter((f) => activeFilter === 'all' || f.category === activeFilter);

  return (
    <div className="min-h-screen bg-artora-ivory py-16 selection:bg-artora-cobalt selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center pb-10 border-b border-artora-warmgrey mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
            Collector & Artist Clarity
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-artora-nearblack mt-2">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm text-artora-muted max-w-lg mx-auto font-light">
            Answers regarding our 3D spatial curation, certificate guarantees, white-glove shipping, and creator payouts.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex justify-center space-x-2">
            {(['all', 'buyers', 'artists', 'logistics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeFilter === tab
                    ? 'bg-artora-nearblack text-white'
                    : 'bg-white border border-artora-warmgrey text-artora-nearblack hover:bg-artora-ivory'
                }`}
              >
                {tab === 'all' ? 'All Questions' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-artora-warmgrey overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-artora-ivory/30 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-artora-nearblack font-medium">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-full bg-artora-ivory border border-artora-warmgrey text-artora-nearblack flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs text-artora-nearblack/75 leading-relaxed font-light border-t border-artora-warmgrey/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
