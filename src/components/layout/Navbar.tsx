import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  User, 
  Palette, 
  Globe, 
  ChevronDown,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    wishlist, 
    user, 
    switchUserRole, 
    currency, 
    setCurrency 
  } = useApp();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
    setCurrencyMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Discover', path: '/' },
    { label: 'Explore Art', path: '/explore' },
    { label: 'Artists', path: '/artists' },
    { label: 'Collections', path: '/collections' },
    { 
      label: 'Virtual Gallery', 
      path: '/gallery',
      badge: '3D Room'
    },
  ];

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-artora-ivory/95 backdrop-blur-md shadow-sm border-b border-artora-warmgrey/60 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: ARTORA Wordmark */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="group flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl tracking-tight text-artora-nearblack group-hover:text-artora-cobalt transition-colors font-medium">
                  ARTORA
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-artora-muted -mt-1 font-sans">
                  Art Beyond Ordinary
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-artora-cobalt py-1 flex items-center gap-1.5 ${
                    isCurrent(link.path)
                      ? 'text-artora-nearblack font-semibold'
                      : 'text-artora-nearblack/75'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold bg-artora-cobalt text-white animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {isCurrent(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-artora-nearblack rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right: Actions, Search, Wishlist, Bag, Profile */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              {/* Currency Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                  className="flex items-center space-x-1 text-xs uppercase tracking-wider text-artora-nearblack/70 hover:text-artora-nearblack px-2 py-1 rounded transition-colors"
                  aria-label="Change currency"
                >
                  <Globe className="w-3.5 h-3.5 mr-1" />
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {currencyMenuOpen && (
                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-xl border border-artora-warmgrey/50 py-1 z-50 text-xs">
                    {(['INR', 'USD', 'EUR'] as const).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setCurrencyMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-artora-ivory transition-colors flex items-center justify-between ${
                          currency === curr ? 'font-bold text-artora-cobalt' : 'text-artora-nearblack'
                        }`}
                      >
                        <span>{curr}</span>
                        <span>{curr === 'INR' ? '₹' : curr === 'USD' ? '$' : '€'}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Icon Trigger */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-artora-nearblack/80 hover:text-artora-nearblack transition-colors rounded-full hover:bg-artora-nearblack/5"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/account?tab=wishlist"
                className="p-2 text-artora-nearblack/80 hover:text-artora-nearblack transition-colors rounded-full hover:bg-artora-nearblack/5 relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-artora-burntorange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Link */}
              <Link
                to="/cart"
                className="p-2 text-artora-nearblack/80 hover:text-artora-nearblack transition-colors rounded-full hover:bg-artora-nearblack/5 relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-artora-cobalt text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account / Role Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1.5 p-1 rounded-full hover:bg-artora-nearblack/5 transition-colors border border-artora-warmgrey"
                  aria-label="User profile"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <ChevronDown className="w-3 h-3 text-artora-nearblack/60 hidden sm:block mr-1" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-artora-warmgrey/60 py-2 z-50 text-xs text-artora-nearblack animate-fade-in">
                    <div className="px-4 py-2 border-b border-artora-warmgrey/40">
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-artora-muted text-[11px] truncate">{user.email}</p>
                      <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-artora-ivory border border-artora-warmgrey text-artora-nearblack">
                        Active Role: <span className="ml-1 text-artora-cobalt font-bold">{user.role.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="py-1">
                      {user.role === 'artist' ? (
                        <>
                          <Link
                            to="/dashboard"
                            className="flex items-center px-4 py-2 hover:bg-artora-ivory transition-colors text-artora-cobalt font-medium"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 mr-2" />
                            Artist Studio Dashboard
                          </Link>
                          <Link
                            to={`/artist/elena-rostova`}
                            className="flex items-center px-4 py-2 hover:bg-artora-ivory transition-colors"
                          >
                            <Palette className="w-3.5 h-3.5 mr-2" />
                            View Public Portfolio
                          </Link>
                          <Link
                            to="/dashboard/artworks/new"
                            className="flex items-center px-4 py-2 hover:bg-artora-ivory transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 mr-2" />
                            Upload New Artwork
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/account"
                            className="flex items-center px-4 py-2 hover:bg-artora-ivory transition-colors"
                          >
                            <User className="w-3.5 h-3.5 mr-2" />
                            Buyer Account Overview
                          </Link>
                          <Link
                            to="/account/orders"
                            className="flex items-center px-4 py-2 hover:bg-artora-ivory transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 mr-2" />
                            My Art Orders & Receipts
                          </Link>
                        </>
                      )}
                    </div>

                    {/* Role switcher preview for test drive */}
                    <div className="px-3 pt-2 mt-1 border-t border-artora-warmgrey/40 bg-artora-ivory/50 pb-2">
                      <p className="text-[10px] uppercase tracking-wider text-artora-muted mb-1.5 font-semibold">
                        Role Switcher (Interactive Demo)
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => {
                            switchUserRole('buyer');
                            setUserMenuOpen(false);
                          }}
                          className={`px-2 py-1.5 rounded text-[11px] font-medium border text-center transition-all ${
                            user.role === 'buyer'
                              ? 'bg-artora-nearblack text-white border-artora-nearblack'
                              : 'bg-white border-artora-warmgrey text-artora-nearblack hover:bg-white'
                          }`}
                        >
                          Collector
                        </button>
                        <button
                          onClick={() => {
                            switchUserRole('artist');
                            setUserMenuOpen(false);
                          }}
                          className={`px-2 py-1.5 rounded text-[11px] font-medium border text-center transition-all ${
                            user.role === 'artist'
                              ? 'bg-artora-cobalt text-white border-artora-cobalt'
                              : 'bg-white border-artora-warmgrey text-artora-nearblack hover:bg-white'
                          }`}
                        >
                          Artist
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Prominent "Sell Your Art" CTA */}
              <Link
                to={user.role === 'artist' ? '/dashboard' : '/artist/join'}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-widest font-semibold text-white bg-artora-nearblack hover:bg-artora-cobalt transition-colors duration-200 rounded-sm shadow-sm"
              >
                {user.role === 'artist' ? 'Artist Studio' : 'Sell Your Art'}
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 lg:hidden text-artora-nearblack"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Expandable Search Drawer */}
          {searchOpen && (
            <div className="mt-3 pt-3 border-t border-artora-warmgrey/60 pb-2 animate-fade-in">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                <Search className="w-4 h-4 text-artora-muted" />
                <input
                  type="text"
                  placeholder="Search by artwork title, artist name, medium, or style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-b border-artora-warmgrey focus:border-artora-cobalt py-1.5 text-sm text-artora-nearblack placeholder-artora-muted/80 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs uppercase tracking-wider font-semibold bg-artora-nearblack text-white rounded hover:bg-artora-cobalt transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-xs text-artora-muted hover:text-artora-nearblack"
                >
                  Close
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-artora-ivory border-b border-artora-warmgrey px-4 pt-3 pb-6 shadow-xl space-y-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 text-sm uppercase tracking-wider font-medium rounded ${
                    isCurrent(link.path)
                      ? 'bg-artora-nearblack text-white'
                      : 'text-artora-nearblack hover:bg-artora-warmgrey/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-artora-cobalt text-white px-2 py-0.5 rounded">
                        {link.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-artora-warmgrey flex flex-col space-y-2">
              <div className="flex items-center justify-between text-xs text-artora-muted px-3 py-1">
                <span>Currency:</span>
                <div className="flex space-x-2">
                  {(['INR', 'USD', 'EUR'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-2 py-0.5 rounded text-xs ${
                        currency === curr ? 'bg-artora-nearblack text-white' : 'bg-artora-warmgrey/40'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to={user.role === 'artist' ? '/dashboard' : '/artist/join'}
                className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold bg-artora-cobalt text-white rounded"
              >
                {user.role === 'artist' ? 'Go to Artist Dashboard' : 'Sell Your Art on ARTORA'}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so sticky navbar doesn't cover top content on pages */}
      <div className="h-20" />
    </>
  );
};
