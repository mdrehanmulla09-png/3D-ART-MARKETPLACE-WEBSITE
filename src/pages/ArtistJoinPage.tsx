import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Palette, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Upload,
  Globe,
  Camera
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Artist } from '../types';

export const ArtistJoinPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerArtist } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    artistName: '',
    username: '',
    email: '',
    password: '',
    discipline: 'Contemporary Oil Painting',
    location: '',
    bio: '',
    statement: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80',
    agreedToTerms: false,
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.username) {
      setError('Please provide your name, username, and email address.');
      return;
    }

    if (!formData.agreedToTerms) {
      setError('Please agree to ARTORA Artist Guidelines and Commission Terms to register.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newArtist: Artist = {
        id: `artist-${Date.now()}`,
        username: formData.username.toLowerCase().replace(/\s+/g, '-'),
        name: formData.artistName || formData.name,
        avatar: formData.avatar,
        coverImage: formData.coverImage,
        bio: formData.bio || 'Independent contemporary artist exploring spatial color and texture.',
        statement: formData.statement || 'Art reveals what language cannot articulate.',
        discipline: formData.discipline,
        location: formData.location || 'India',
        artworksCount: 0,
        followersCount: 1,
        isVerified: true,
        socialLinks: {
          instagram: `@${formData.username}`,
        },
      };

      registerArtist(newArtist);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-artora-ivory py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center pb-10 border-b border-artora-warmgrey">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-artora-cobalt/10 text-artora-cobalt text-xs font-semibold uppercase tracking-wider mb-4">
            <Palette className="w-3.5 h-3.5" />
            <span>Join ARTORA Creator Network</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-artora-nearblack">
            Showcase & Sell Your Original Art
          </h1>
          <p className="mt-3 text-sm text-artora-muted max-w-xl mx-auto font-light leading-relaxed">
            Reach international collectors, museum curators, and architects with 3D spatial presentation and zero monthly hosting fees.
          </p>
        </div>

        {/* Form Box */}
        <form onSubmit={handleSubmit} className="mt-10 bg-white rounded-2xl p-6 sm:p-10 border border-artora-warmgrey shadow-sm space-y-8">
          
          {error && (
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          {/* Account Credential */}
          <div>
            <h3 className="font-serif text-xl text-artora-nearblack mb-4 pb-2 border-b border-artora-warmgrey/50">
              1. Studio Account Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-artora-nearblack mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-artora-nearblack mb-1">Artist / Studio Alias</label>
                <input
                  type="text"
                  placeholder="e.g. Studio Rostova (or same as name)"
                  value={formData.artistName}
                  onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-artora-nearblack mb-1">Portfolio Slug / Username</label>
                <div className="flex items-center">
                  <span className="p-2.5 bg-artora-ivory border border-r-0 border-artora-warmgrey rounded-l text-artora-muted text-xs">
                    artora.com/artist/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="elena-rostova"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full p-2.5 border border-artora-warmgrey rounded-r focus:border-artora-cobalt focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-artora-nearblack mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="elena@studio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-artora-nearblack mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Create a secure studio password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Artistic Discipline & Bio */}
          <div>
            <h3 className="font-serif text-xl text-artora-nearblack mb-4 pb-2 border-b border-artora-warmgrey/50">
              2. Artistic Practice
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-artora-nearblack mb-1">Primary Discipline</label>
                <select
                  value={formData.discipline}
                  onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                >
                  <option value="Contemporary Oil Painting">Contemporary Oil Painting</option>
                  <option value="Abstract Expressionism">Abstract Expressionism</option>
                  <option value="Natural Pigments & Mixed Media">Natural Pigments & Mixed Media</option>
                  <option value="Digital Art & Generative Surrealism">Digital Art & Generative Surrealism</option>
                  <option value="Sculpture & Spatial Objects">Sculpture & Spatial Objects</option>
                  <option value="Fine Art Photography & Architecture">Fine Art Photography & Architecture</option>
                  <option value="Illustration & Sumi Ink">Illustration & Sumi Ink</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-artora-nearblack mb-1">Studio Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, India or Berlin, Germany"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-artora-nearblack mb-1">Artist Biography</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your training, cultural influences, materials, and exhibition history..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-artora-nearblack mb-1">Artistic Statement (1-2 sentences)</label>
                <input
                  type="text"
                  placeholder="e.g. The canvas is an altar of stillness where earth pigments whisper forgotten cosmological harmonies."
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Profile Imagery Previews */}
          <div>
            <h3 className="font-serif text-xl text-artora-nearblack mb-4 pb-2 border-b border-artora-warmgrey/50">
              3. Visual Presence
            </h3>
            <div className="flex items-center space-x-6 text-xs">
              <div className="flex items-center space-x-4">
                <img
                  src={formData.avatar}
                  alt="Portrait preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-artora-cobalt shadow"
                />
                <div>
                  <p className="font-medium text-artora-nearblack">Artist Studio Portrait</p>
                  <p className="text-[11px] text-artora-muted">High-res portrait for your verified profile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Agreement */}
          <div className="pt-4 border-t border-artora-warmgrey/50">
            <label className="flex items-start space-x-3 cursor-pointer text-xs text-artora-nearblack/80">
              <input
                type="checkbox"
                required
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                className="mt-0.5 accent-artora-cobalt"
              />
              <span>
                I agree to ARTORA's <Link to="/terms" className="text-artora-cobalt underline">Artist Code of Conduct</Link>, confirming all uploaded artworks are 100% original creations, and I accept the transparent 85/15 creator payout schedule.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-artora-nearblack hover:bg-artora-cobalt text-white text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-md transition-all flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span>Preparing Your Artist Studio...</span>
            ) : (
              <>
                <span>Launch Artist Studio & Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
