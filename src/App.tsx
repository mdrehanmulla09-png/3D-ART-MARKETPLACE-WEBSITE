import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ArtworkDetailPage } from './pages/ArtworkDetailPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { ArtistProfilePage } from './pages/ArtistProfilePage';
import { ArtistJoinPage } from './pages/ArtistJoinPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { GalleryPage } from './pages/GalleryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { AccountOrdersPage } from './pages/AccountOrdersPage';
import { ArtistDashboardPage } from './pages/ArtistDashboardPage';
import { UploadArtworkPage } from './pages/UploadArtworkPage';
import { ArtistOrdersPage } from './pages/ArtistOrdersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

// Helper to scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper to hide standard header/footer in full 3D gallery mode
const AppLayout: React.FC = () => {
  const location = useLocation();
  const isGallery = location.pathname === '/gallery';

  return (
    <div className="min-h-screen flex flex-col bg-artora-ivory text-artora-nearblack font-sans">
      {!isGallery && <Navbar />}
      <ScrollToTop />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artist/:username" element={<ArtistProfilePage />} />
          <Route path="/artist/join" element={<ArtistJoinPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/orders" element={<AccountOrdersPage />} />
          <Route path="/dashboard" element={<ArtistDashboardPage />} />
          <Route path="/dashboard/artworks/new" element={<UploadArtworkPage />} />
          <Route path="/dashboard/artworks/:id/edit" element={<UploadArtworkPage />} />
          <Route path="/dashboard/orders" element={<ArtistOrdersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          {/* 404 Catch-All */}
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
                <h1 className="font-serif text-5xl text-artora-nearblack mb-2">404</h1>
                <p className="text-xs text-artora-muted mb-6">The exhibition or gallery wing you are looking for does not exist.</p>
                <a
                  href="/"
                  className="px-6 py-2.5 bg-artora-nearblack text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-artora-cobalt transition-colors"
                >
                  Return to ARTORA Pavilion
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      {!isGallery && <Footer />}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
