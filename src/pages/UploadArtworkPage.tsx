import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Image as ImageIcon,
  DollarSign,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Artwork, ArtworkCategory, ArtworkType, Orientation } from '../types';

export const UploadArtworkPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, addArtwork, formatPrice } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Contemporary Painting' as ArtworkCategory,
    medium: 'Oil and raw mineral pigment on Belgian linen',
    materials: 'Extra-fine oils, rabbit skin glue, custom stretcher bars',
    dimensions: '100 x 120 cm (39.4 x 47.2 in)',
    yearCreated: new Date().getFullYear(),
    artworkType: 'original' as ArtworkType,
    price: 75000,
    currency: 'INR',
    inventoryQuantity: 1,
    editionSize: 1,
    isFramed: true,
    orientation: 'portrait' as Orientation,
    description: '',
    provenance: 'Created in artist studio, private inventory.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
    publicationStatus: 'published' as 'published' | 'draft',
  });

  const [imagePreview, setImagePreview] = useState(formData.imageUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample preset art images for rapid testing
  const samplePresets = [
    { name: 'Cobalt Minimalist', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85' },
    { name: 'Ochre & Earth', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85' },
    { name: 'Digital Fluid', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85' },
    { name: 'Raw Basalt Form', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85' },
  ];

  const handleCustomImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, imageUrl: val });
    if (val.startsWith('http')) {
      setImagePreview(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newArtwork: Artwork = {
      id: `art-${Date.now()}`,
      title: formData.title || 'Untitled Composition',
      slug: (formData.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
      artistId: user.artistProfileId || 'artist-1',
      artistName: user.name || 'Elena Rostova',
      artistUsername: 'elena-rostova',
      artistAvatar: user.avatar,
      artistLocation: 'Berlin & Mumbai',
      price: Number(formData.price),
      currency: 'INR',
      category: formData.category,
      medium: formData.medium,
      materials: formData.materials,
      dimensions: formData.dimensions,
      yearCreated: Number(formData.yearCreated),
      artworkType: formData.artworkType,
      inventoryQuantity: formData.artworkType === 'original' ? 1 : Number(formData.inventoryQuantity),
      editionSize: formData.artworkType === 'limited_edition' ? Number(formData.editionSize) : undefined,
      isFramed: formData.isFramed,
      orientation: formData.orientation,
      description: formData.description || 'Original contemporary artwork created with archival materials.',
      provenance: formData.provenance,
      certificateOfAuthenticity: true,
      images: [
        {
          id: `img-${Date.now()}`,
          url: formData.imageUrl,
          alt: formData.title,
          isPrimary: true,
        },
      ],
      publicationStatus: formData.publicationStatus,
      moderationStatus: 'approved',
      isFeatured: true,
      isNewArrival: true,
      viewsCount: 1,
      likesCount: 0,
      createdAt: new Date().toISOString(),
      tags: [formData.category, formData.medium.split(' ')[0]],
    };

    setTimeout(() => {
      addArtwork(newArtwork);
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-artora-ivory py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-artora-muted hover:text-artora-nearblack transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs text-artora-muted">Studio Artwork Cataloging</span>
        </div>

        {/* Title */}
        <div className="border-b border-artora-warmgrey/60 pb-6 mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-artora-nearblack">
            Upload & Publish New Artwork
          </h1>
          <p className="text-xs text-artora-muted mt-1 font-light">
            Once published, this piece will immediately appear in the marketplace, 3D gallery, and your artist profile.
          </p>
        </div>

        {/* Form and Preview Layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* General Information */}
            <div className="bg-white p-6 rounded-2xl border border-artora-warmgrey shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-artora-nearblack border-b border-artora-warmgrey/50 pb-2">
                1. Artwork Overview
              </h3>

              <div>
                <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                  Artwork Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Symphony of Obsidian Horizons"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                    Discipline / Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ArtworkCategory })}
                    className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  >
                    <option value="Contemporary Painting">Contemporary Painting</option>
                    <option value="Abstract Art">Abstract Art</option>
                    <option value="Digital Art">Digital Art</option>
                    <option value="Photography">Photography</option>
                    <option value="Sculpture">Sculpture</option>
                    <option value="Illustration">Illustration</option>
                    <option value="Mixed Media">Mixed Media</option>
                    <option value="Prints and Posters">Prints and Posters</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                    Classification
                  </label>
                  <select
                    value={formData.artworkType}
                    onChange={(e) => setFormData({ ...formData, artworkType: e.target.value as ArtworkType })}
                    className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  >
                    <option value="original">Unique Original (1 of 1)</option>
                    <option value="limited_edition">Numbered Limited Edition</option>
                    <option value="open_edition">Museum Fine Art Print</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                  Curatorial Description & Statement
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Elaborate on the conceptual inspiration, emotional theme, and process..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                />
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white p-6 rounded-2xl border border-artora-warmgrey shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-artora-nearblack border-b border-artora-warmgrey/50 pb-2">
                2. Medium & Dimensions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                    Medium
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.medium}
                    onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                    className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                    Dimensions (Metric & Imperial)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="100 x 120 cm (39.4 x 47.2 in)"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                    Year of Creation
                  </label>
                  <input
                    type="number"
                    value={formData.yearCreated}
                    onChange={(e) => setFormData({ ...formData, yearCreated: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                    Orientation
                  </label>
                  <select
                    value={formData.orientation}
                    onChange={(e) => setFormData({ ...formData, orientation: e.target.value as Orientation })}
                    className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                  >
                    <option value="portrait">Portrait (Vertical)</option>
                    <option value="landscape">Landscape (Horizontal)</option>
                    <option value="square">Square</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="framed"
                  checked={formData.isFramed}
                  onChange={(e) => setFormData({ ...formData, isFramed: e.target.checked })}
                  className="accent-artora-cobalt"
                />
                <label htmlFor="framed" className="text-xs text-artora-nearblack font-medium">
                  Custom museum frame included with artwork
                </label>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="bg-white p-6 rounded-2xl border border-artora-warmgrey shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-artora-nearblack border-b border-artora-warmgrey/50 pb-2">
                3. Pricing & Inventory Controls
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                    Listing Price in INR (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min={1000}
                    step={500}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none font-semibold text-base"
                  />
                  <span className="text-[10px] text-artora-muted mt-1 block">
                    Your 85% Payout: <strong className="text-emerald-700">{formatPrice(Math.round(formData.price * 0.85))}</strong>
                  </span>
                </div>

                {formData.artworkType !== 'original' && (
                  <div>
                    <label className="block text-xs font-semibold text-artora-nearblack uppercase mb-1">
                      Available Stock / Edition Size
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={formData.inventoryQuantity}
                      onChange={(e) => setFormData({ ...formData, inventoryQuantity: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Image Preview & Publish Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Image Upload Box */}
            <div className="bg-white p-6 rounded-2xl border border-artora-warmgrey shadow-sm">
              <h3 className="font-serif text-lg text-artora-nearblack border-b border-artora-warmgrey/50 pb-2 mb-4">
                Artwork Photography
              </h3>

              {/* Live Preview */}
              <div className="aspect-[4/5] bg-artora-cream rounded-xl overflow-hidden border border-artora-warmgrey relative mb-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-artora-muted">
                    <ImageIcon className="w-10 h-10 mb-2" />
                    <span className="text-xs">No artwork image loaded</span>
                  </div>
                )}
                {formData.isFramed && (
                  <span className="absolute bottom-3 left-3 bg-white/90 text-artora-nearblack text-[10px] font-semibold px-2 py-0.5 rounded shadow">
                    Framed Preview
                  </span>
                )}
              </div>

              {/* URL or Upload Input */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-artora-muted font-medium mb-1">
                    Image Asset URL (Direct High-Res Link)
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={handleCustomImageChange}
                    className="w-full p-2 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none text-[11px]"
                  />
                </div>

                {/* Quick presets for rapid demo upload */}
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-artora-muted block mb-1">
                    Quick Sample Presets:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {samplePresets.map((preset) => (
                      <button
                        type="button"
                        key={preset.name}
                        onClick={() => {
                          setFormData({ ...formData, imageUrl: preset.url });
                          setImagePreview(preset.url);
                        }}
                        className="p-1.5 bg-artora-ivory hover:bg-white text-[10px] rounded border border-artora-warmgrey text-artora-nearblack truncate text-left"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Publication Actions */}
            <div className="bg-white p-6 rounded-2xl border border-artora-warmgrey shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-emerald-800 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Ready to be minted into live gallery catalog</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-artora-nearblack hover:bg-artora-cobalt text-white text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-md transition-all flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Publishing to Gallery...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Publish Listing to Marketplace</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, publicationStatus: 'draft' });
                  handleSubmit(new Event('submit') as any);
                }}
                className="w-full py-2.5 border border-artora-warmgrey hover:bg-artora-ivory text-artora-nearblack text-xs uppercase tracking-wider font-semibold rounded transition-colors"
              >
                Save as Private Draft
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
