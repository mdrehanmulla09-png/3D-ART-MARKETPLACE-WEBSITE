import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing to ARTORA curations', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-artora-charcoal text-[#E5DFD5] pt-20 pb-12 border-t border-artora-charcoal/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Guarantees Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/10 text-xs">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-white/5 border border-white/10 text-artora-cobalt">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white tracking-wide uppercase text-[11px]">Certificate of Authenticity</h4>
              <p className="text-white/60 text-[11px] mt-0.5">Every original piece is signed & serialized directly by the artist.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-white/5 border border-white/10 text-artora-burntorange">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white tracking-wide uppercase text-[11px]">White-Glove Art Logistics</h4>
              <p className="text-white/60 text-[11px] mt-0.5">Museum-grade crating & climate-monitored insured delivery.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-white/5 border border-white/10 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white tracking-wide uppercase text-[11px]">14-Day In-Room Trial</h4>
              <p className="text-white/60 text-[11px] mt-0.5">Experience the artwork in your sanctuary with full buyer protection.</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
              Curated Editorial Dispatch
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white mt-2 leading-tight">
              A Little More Art in Your Inbox.
            </h3>
            <p className="text-sm text-white/70 mt-3 font-light leading-relaxed">
              Bi-weekly essays on emerging contemporary movements, collector studio visits, and early access to numbered releases.
            </p>

            {subscribed ? (
              <div className="mt-6 flex items-center space-x-2 text-emerald-400 text-sm font-medium bg-emerald-950/30 border border-emerald-800/60 p-3 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>You are on the list. Expect thoughtful beauty in your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border border-white/20 rounded px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-artora-cobalt flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-artora-nearblack hover:bg-artora-cobalt hover:text-white transition-colors duration-200 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 rounded"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 text-xs border-b border-white/10">
          
          <div className="col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl text-white tracking-tight">ARTORA</span>
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/50 -mt-1">
                Art Beyond the Ordinary
              </p>
            </Link>
            <p className="text-white/60 text-xs mt-4 leading-relaxed max-w-sm font-light">
              An immersive contemporary marketplace bridging the sacred space of artist studios with private collectors worldwide. Designed with 3D spatial fidelity.
            </p>
            <div className="mt-6 flex items-center space-x-4 text-white/60">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <span>·</span>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter (X)</a>
              <span>·</span>
              <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Behance</a>
              <span>·</span>
              <a href="https://threads.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Threads</a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-white/60 font-light">
              <li><Link to="/explore" className="hover:text-white transition-colors">All Artworks</Link></li>
              <li><Link to="/explore?category=Abstract+Art" className="hover:text-white transition-colors">Abstract Art</Link></li>
              <li><Link to="/explore?category=Contemporary+Painting" className="hover:text-white transition-colors">Paintings</Link></li>
              <li><Link to="/explore?category=Sculpture" className="hover:text-white transition-colors">Sculptures</Link></li>
              <li><Link to="/explore?category=Digital+Art" className="hover:text-white transition-colors">Digital Surrealism</Link></li>
              <li><Link to="/gallery" className="hover:text-artora-cobalt font-medium transition-colors">3D Virtual Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
              For Artists
            </h4>
            <ul className="space-y-2.5 text-white/60 font-light">
              <li><Link to="/artist/join" className="hover:text-white transition-colors">Apply to Sell</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Artist Dashboard</Link></li>
              <li><Link to="/artists" className="hover:text-white transition-colors">Artist Directory</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Artist Guidelines</Link></li>
              <li><span className="text-white/40">Commission Rates: 15%</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Support & Legal
            </h4>
            <ul className="space-y-2.5 text-white/60 font-light">
              <li><Link to="/about" className="hover:text-white transition-colors">About ARTORA</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Curators</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Collector FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Demo Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} ARTORA Inc. All original artworks copyrighted by respective artists.</p>
          <p className="mt-2 sm:mt-0 italic">
            Demo Experience — Currency defaults to INR (₹) with international multi-currency support.
          </p>
        </div>

      </div>
    </footer>
  );
};
