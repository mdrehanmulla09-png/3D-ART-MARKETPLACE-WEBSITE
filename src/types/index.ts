export type ArtworkType = 'original' | 'limited_edition' | 'open_edition' | 'digital';
export type Orientation = 'portrait' | 'landscape' | 'square';
export type ArtworkCategory = 
  | 'Abstract Art'
  | 'Contemporary Painting'
  | 'Digital Art'
  | 'Photography'
  | 'Sculpture'
  | 'Illustration'
  | 'Mixed Media'
  | 'Prints and Posters';

export interface ArtworkImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  artistId: string;
  artistName: string;
  artistUsername: string;
  artistAvatar: string;
  artistLocation: string;
  price: number; // in INR
  currency: string;
  category: ArtworkCategory;
  medium: string;
  materials: string;
  dimensions: string; // e.g., "90 x 120 cm (35.4 x 47.2 in)"
  yearCreated: number;
  artworkType: ArtworkType;
  inventoryQuantity: number;
  editionSize?: number;
  editionNumber?: number;
  isFramed: boolean;
  orientation: Orientation;
  description: string;
  provenance?: string;
  certificateOfAuthenticity: boolean;
  images: ArtworkImage[];
  publicationStatus: 'published' | 'draft' | 'archived';
  moderationStatus: 'approved' | 'pending' | 'rejected';
  isFeatured?: boolean;
  isNewArrival?: boolean;
  viewsCount: number;
  likesCount: number;
  createdAt: string;
  tags: string[];
}

export interface Artist {
  id: string;
  username: string;
  name: string;
  avatar: string;
  coverImage: string;
  bio: string;
  statement: string;
  discipline: string;
  location: string;
  artworksCount: number;
  followersCount: number;
  isVerified: boolean;
  exhibitions?: string[];
  socialLinks: {
    instagram?: string;
    website?: string;
    twitter?: string;
  };
}

export interface CuratedCollection {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  coverImage: string;
  curatorName: string;
  artworkIds: string[];
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
  selectedFrame?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'artist' | 'admin';
  avatar: string;
  artistProfileId?: string;
}

export interface OrderItem {
  id: string;
  artworkId: string;
  title: string;
  artistName: string;
  imageUrl: string;
  quantity: number;
  price: number;
  artworkType: ArtworkType;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  currency: string;
  paymentMethod: 'stripe' | 'razorpay' | 'upi';
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderStatus: 'confirmed' | 'in_preparation' | 'shipped' | 'delivered';
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  trackingNumber?: string;
  carrier?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  artworkTitle: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}
