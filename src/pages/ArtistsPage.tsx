import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle2, ArrowRight, Palette, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ArtistsPage: React.FC = () => {
  const { artists, toggleFollowArtist, isFollowing } = useApp();
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');

  const disciplines = ['All', 'Contemporary Oil Painting', 'Natural Pigments & Mixed Media', 'Digital Art & Generative Surrealism', 'Sculpture & Spatial Objects', 'Fine Art Photography & Architecture', 'Abstract Expressionism'];

  const filteredArtists = artists.filter((a) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = a.name.toLowerCase().includes(q);
      const matchLocation = a.location.toLowerCase().includes(q);
      const matchBio = a.bio.toLowerCase().includes(q);
      if (!matchName && !matchLocation && !matchBio) return false;
    }
    if (selectedDiscipline !== 'All' && a.discipline !== selectedDiscipline) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-artora-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-artora-warmgrey/60 pb-8 mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
            Vetted Creators
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-artora-nearblack mt-2">
            Artist Directory
          </h1>
          <p className="mt-3 text-sm text-artora-muted max-w-xl font-light">
            Explore independent artists shaping contemporary visual language across painting, computational media, sculpture, and photography.
          </p>

          {/* Search and Discipline Filter */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-artora-muted" />
              <input
                type="text"
                placeholder="Search by artist name, city, bio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-artora-warmgrey rounded-lg text-xs text-artora-nearblack placeholder-artora-muted focus:outline-none focus:border-artora-cobalt"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {['All', 'Painting', 'Digital Art', 'Sculpture', 'Photography'].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    if (d === 'All') setSelectedDiscipline('All');
                    else {
                      const match = disciplines.find((full) => full.toLowerCase().includes(d.toLowerCase()));
                      if (match) setSelectedDiscipline(match);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    (d === 'All' && selectedDiscipline === 'All') || selectedDiscipline.toLowerCase().includes(d.toLowerCase())
                      ? 'bg-artora-nearblack text-white'
                      : 'bg-white border border-artora-warmgrey text-artora-nearblack/75 hover:bg-artora-ivory'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => {
            const following = isFollowing(artist.id);
            return (
              <div
                key={artist.id}
                className="bg-white rounded-xl overflow-hidden border border-artora-warmgrey shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Header banner */}
                <div className="relative h-44 bg-artora-charcoal overflow-hidden">
                  <img
                    src={artist.coverImage}
                    alt={artist.name}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute -bottom-6 left-6">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="pt-10 p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/artist/${artist.username}`}
                        className="font-serif text-2xl text-artora-nearblack hover:text-artora-cobalt transition-colors"
                      >
                        {artist.name}
                      </Link>
                      {artist.isVerified && (
                        <span className="p-1 rounded-full bg-blue-50 text-artora-cobalt" title="Verified Artist">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs text-artora-muted mt-1">
                      <MapPin className="w-3.5 h-3.5 text-artora-cobalt" />
                      <span>{artist.location}</span>
                      <span>·</span>
                      <span>{artist.artworksCount} Works Cataloged</span>
                    </div>

                    <p className="mt-3 text-xs text-artora-nearblack/75 line-clamp-3 leading-relaxed font-light">
                      {artist.bio}
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
                      {following ? 'Following' : 'Follow'}
                    </button>

                    <Link
                      to={`/artist/${artist.username}`}
                      className="text-xs text-artora-cobalt hover:underline font-medium flex items-center space-x-1"
                    >
                      <span>Explore Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join platform CTA banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-artora-charcoal text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-artora-cobalt font-semibold">
              Independent Creators
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl mt-1">
              Are you an independent artist?
            </h3>
            <p className="text-xs text-white/70 mt-2 max-w-lg font-light">
              Join ARTORA to showcase your original artwork to private patrons and interior designers across the world with 3D spatial fidelity.
            </p>
          </div>

          <Link
            to="/artist/join"
            className="px-6 py-3.5 bg-white text-artora-nearblack hover:bg-artora-cobalt hover:text-white transition-all text-xs uppercase tracking-wider font-semibold rounded whitespace-nowrap"
          >
            Apply to Join as Artist
          </Link>
        </div>

      </div>
    </div>
  );
};
