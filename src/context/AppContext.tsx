import React, { createContext, useContext, useState, useEffect } from 'react';
import { Artwork, Artist, CartItem, Order, User } from '../types';
import { INITIAL_ARTWORKS, INITIAL_ARTISTS } from '../data/mockData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  user: User;
  switchUserRole: (role: 'buyer' | 'artist') => void;
  artworks: Artwork[];
  artists: Artist[];
  cart: CartItem[];
  wishlist: string[];
  followedArtists: string[];
  orders: Order[];
  toasts: ToastState[];
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (amountInINR: number) => string;
  addToCart: (artwork: Artwork, quantity?: number) => boolean;
  removeFromCart: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (artworkId: string) => void;
  isWishlisted: (artworkId: string) => boolean;
  toggleFollowArtist: (artistId: string) => void;
  isFollowing: (artistId: string) => boolean;
  addArtwork: (artwork: Artwork) => void;
  updateArtwork: (id: string, updated: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
  registerArtist: (artist: Artist) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], trackingNumber?: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  cartCount: number;
  cartSubtotal: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
}

const DEFAULT_BUYER: User = {
  id: 'usr-buyer-1',
  name: 'Tara Mehta',
  email: 'tara.mehta@modernart.in',
  role: 'buyer',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
};

const DEFAULT_ARTIST_USER: User = {
  id: 'usr-artist-1',
  name: 'Elena Rostova',
  email: 'elena@rostova.studio',
  role: 'artist',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  artistProfileId: 'artist-1',
};

const INITIAL_DEMO_ORDER: Order = {
  id: 'ord-8921',
  orderNumber: 'ART-2025-8921',
  buyerId: 'usr-buyer-1',
  buyerName: 'Tara Mehta',
  buyerEmail: 'tara.mehta@modernart.in',
  items: [
    {
      id: 'itm-1',
      artworkId: 'art-5',
      title: 'The Silent Arcade: Jaipur Mornings',
      artistName: 'Priya Sharma',
      imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=600&q=85',
      quantity: 1,
      price: 24000,
      artworkType: 'limited_edition',
    },
  ],
  subtotal: 24000,
  shippingFee: 2500,
  tax: 2880,
  total: 29380,
  currency: 'INR',
  paymentMethod: 'razorpay',
  paymentStatus: 'paid',
  orderStatus: 'shipped',
  shippingAddress: {
    fullName: 'Tara Mehta',
    street: '72 Maker Towers, Cuffe Parade',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400005',
    country: 'India',
    phone: '+91 98201 44521',
  },
  trackingNumber: 'BLUEDART-882910471',
  carrier: 'BlueDart Art Courier Express',
  createdAt: '2025-02-14T14:32:00Z',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('artora_user');
    return saved ? JSON.parse(saved) : DEFAULT_BUYER;
  });

  const [currency, setCurrency] = useState<string>('INR');

  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const saved = localStorage.getItem('artora_artworks');
    return saved ? JSON.parse(saved) : INITIAL_ARTWORKS;
  });

  const [artists, setArtists] = useState<Artist[]>(() => {
    const saved = localStorage.getItem('artora_artists');
    return saved ? JSON.parse(saved) : INITIAL_ARTISTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('artora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('artora_wishlist');
    return saved ? JSON.parse(saved) : ['art-1', 'art-3'];
  });

  const [followedArtists, setFollowedArtists] = useState<string[]>(() => {
    const saved = localStorage.getItem('artora_followed');
    return saved ? JSON.parse(saved) : ['artist-1'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('artora_orders');
    return saved ? JSON.parse(saved) : [INITIAL_DEMO_ORDER];
  });

  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Persist state
  useEffect(() => {
    localStorage.setItem('artora_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('artora_artworks', JSON.stringify(artworks));
  }, [artworks]);

  useEffect(() => {
    localStorage.setItem('artora_artists', JSON.stringify(artists));
  }, [artists]);

  useEffect(() => {
    localStorage.setItem('artora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('artora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('artora_followed', JSON.stringify(followedArtists));
  }, [followedArtists]);

  useEffect(() => {
    localStorage.setItem('artora_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const switchUserRole = (role: 'buyer' | 'artist') => {
    if (role === 'buyer') {
      setUser(DEFAULT_BUYER);
      showToast('Switched to Collector Profile (Tara Mehta)', 'info');
    } else {
      setUser(DEFAULT_ARTIST_USER);
      showToast('Switched to Artist Profile (Elena Rostova)', 'info');
    }
  };

  const formatPrice = (amountInINR: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(amountInINR / 86);
      return `$${usd.toLocaleString('en-US')}`;
    }
    if (currency === 'EUR') {
      const eur = Math.round(amountInINR / 93);
      return `€${eur.toLocaleString('de-DE')}`;
    }
    return `₹${amountInINR.toLocaleString('en-IN')}`;
  };

  const addToCart = (artwork: Artwork, quantity: number = 1): boolean => {
    // Check if item is already in cart
    const existingIndex = cart.findIndex((item) => item.artwork.id === artwork.id);

    // If it's a 1-of-1 unique original artwork, only 1 can be purchased
    if (artwork.artworkType === 'original') {
      if (existingIndex > -1) {
        showToast(`"${artwork.title}" is a 1-of-1 original piece already in your cart.`, 'error');
        return false;
      }
      setCart((prev) => [...prev, { artwork, quantity: 1 }]);
      showToast(`Added original artwork "${artwork.title}" to collection bag`, 'success');
      return true;
    }

    // For edition prints or multi-quantity items
    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      const newQty = currentQty + quantity;
      if (newQty > artwork.inventoryQuantity) {
        showToast(`Edition limit reached. Only ${artwork.inventoryQuantity} available.`, 'error');
        return false;
      }
      const updated = [...cart];
      updated[existingIndex].quantity = newQty;
      setCart(updated);
      showToast(`Updated quantity of "${artwork.title}" in collection bag`, 'success');
      return true;
    } else {
      setCart((prev) => [...prev, { artwork, quantity }]);
      showToast(`Added "${artwork.title}" to collection bag`, 'success');
      return true;
    }
  };

  const removeFromCart = (artworkId: string) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId));
    showToast('Artwork removed from bag', 'info');
  };

  const updateQuantity = (artworkId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(artworkId);
      return;
    }
    const targetItem = cart.find((i) => i.artwork.id === artworkId);
    if (!targetItem) return;

    // Disallow increasing quantity if original 1 of 1
    if (targetItem.artwork.artworkType === 'original' && quantity > 1) {
      showToast('Unique original artwork cannot have more than 1 quantity', 'error');
      return;
    }

    if (quantity > targetItem.artwork.inventoryQuantity) {
      showToast(`Limited edition: only ${targetItem.artwork.inventoryQuantity} available`, 'error');
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.artwork.id === artworkId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (artworkId: string) => {
    if (wishlist.includes(artworkId)) {
      setWishlist((prev) => prev.filter((id) => id !== artworkId));
      showToast('Removed from curated wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, artworkId]);
      showToast('Saved to your private wishlist', 'success');
    }
  };

  const isWishlisted = (artworkId: string) => wishlist.includes(artworkId);

  const toggleFollowArtist = (artistId: string) => {
    if (followedArtists.includes(artistId)) {
      setFollowedArtists((prev) => prev.filter((id) => id !== artistId));
      showToast('Unfollowed artist', 'info');
    } else {
      setFollowedArtists((prev) => [...prev, artistId]);
      showToast('Now following artist. You will receive studio updates.', 'success');
    }
  };

  const isFollowing = (artistId: string) => followedArtists.includes(artistId);

  const addArtwork = (artwork: Artwork) => {
    setArtworks((prev) => [artwork, ...prev]);
    showToast(`"${artwork.title}" successfully published to ARTORA gallery!`, 'success');
  };

  const updateArtwork = (id: string, updated: Partial<Artwork>) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updated } : art))
    );
    showToast('Artwork listing successfully updated', 'success');
  };

  const deleteArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((art) => art.id !== id));
    showToast('Listing removed from gallery', 'info');
  };

  const registerArtist = (newArtist: Artist) => {
    setArtists((prev) => [newArtist, ...prev]);
    // Also switch user to this artist
    setUser({
      id: `usr-${newArtist.id}`,
      name: newArtist.name,
      email: `${newArtist.username}@artist.artora.com`,
      role: 'artist',
      avatar: newArtist.avatar,
      artistProfileId: newArtist.id,
    });
    showToast(`Welcome to ARTORA, ${newArtist.name}! Your studio is ready.`, 'success');
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `ART-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Deduct inventory quantities for the purchased artworks
    setArtworks((prev) =>
      prev.map((art) => {
        const purchasedItem = orderData.items.find((item) => item.artworkId === art.id);
        if (purchasedItem) {
          const remaining = Math.max(0, art.inventoryQuantity - purchasedItem.quantity);
          return {
            ...art,
            inventoryQuantity: remaining,
          };
        }
        return art;
      })
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus'], trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              orderStatus: status,
              trackingNumber: trackingNumber || order.trackingNumber,
            }
          : order
      )
    );
    showToast(`Order status updated to "${status.toUpperCase()}"`, 'success');
  };

  // Cart summary calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.artwork.price * item.quantity, 0);
  const cartShipping = cart.length > 0 ? (cartSubtotal > 50000 ? 0 : 2500) : 0; // Complimentary white-glove delivery above ₹50,000
  const cartTax = Math.round(cartSubtotal * 0.12); // 12% GST for art works
  const cartTotal = cartSubtotal + cartShipping + cartTax;

  return (
    <AppContext.Provider
      value={{
        user,
        switchUserRole,
        artworks,
        artists,
        cart,
        wishlist,
        followedArtists,
        orders,
        toasts,
        currency,
        setCurrency,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        toggleFollowArtist,
        isFollowing,
        addArtwork,
        updateArtwork,
        deleteArtwork,
        registerArtist,
        createOrder,
        updateOrderStatus,
        showToast,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartTax,
        cartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
