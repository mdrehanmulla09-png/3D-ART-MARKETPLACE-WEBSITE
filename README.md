# ARTORA — Art Beyond the Ordinary
### Contemporary 3D Art Marketplace

**Live Public Access URL:** [https://tray-flying-integrity-jon.trycloudflare.com](https://tray-flying-integrity-jon.trycloudflare.com)  
**Local Network (Wi-Fi):** `http://10.238.213.90:5173/`  
**Local Machine:** `http://localhost:5173/`

---

## 1. Overview & Brand Identity

**ARTORA** is an immersive, editorial-first contemporary art marketplace that bridges the sacred physical presence of artist studios with private collectors, architects, and institutions worldwide. 

Rather than adopting a generic e-commerce template, ARTORA blends an editorial digital publication with interactive **WebGL 3D experiences**:
- **3D Spatial Hero:** Floating framed canvases with dynamic studio lighting and mouse-pointer parallax.
- **Interactive 3D Artwork Cards:** Perspective tilt and natural shadow elevation upon pointer hover.
- **3D Virtual Exhibition Pavilion (`/gallery`):** A spatial exhibition room with wooden parquet floors, spotlighting, four-wall gallery curation, guided camera tours, and click-to-inspect physical plaques.

---

## 2. Design System Tokens

- **Background:** Warm Ivory (`#F6F2EA`)
- **Primary Text:** Near-Black (`#171717`)
- **Secondary Background:** Charcoal (`#20201F`)
- **Accent:** Vivid Cobalt Blue (`#435BFF`)
- **Secondary Accent:** Burnt Orange (`#D96A45`)
- **Subtle Borders:** Warm Grey (`#D9D3C9`)
- **Surface Cards:** Pure White (`#FFFFFF`) & Cream (`#FAF7F2`)
- **Typography:** *Playfair Display* (Editorial Serif) paired with *Inter* (Clean Sans-Serif).

---

## 3. Implemented Routes & Architecture

| Route | Page | Key Features |
|---|---|---|
| `/` | **Homepage** | 3D Hero, Curated Disciplines, "Collected With Intention", Virtual Gallery preview, Featured Artists, Editorial Collections, How it Works, Testimonials, Dispatch newsletter |
| `/explore` | **Marketplace Catalog** | Multi-tier category filters, price tiers in ₹, original vs print classification, orientation, search, sorting, empty states, and 3D cards |
| `/artwork/:id` | **Artwork Detail** | High-res gallery preview, zoom, 3D room shortcut, specifications, provenance, Certificate of Authenticity badge, inquiry modal, share modal, related artworks |
| `/artists` | **Artist Directory** | Search by name/discipline, location tags, studio biographies, follow functionality |
| `/artist/:username` | **Artist Profile** | Hero artwork cover, verified badge, artist statement manifesto, exhibition CV, available & sold portfolio |
| `/artist/join` | **Artist Registration** | Onboarding form with validation, portfolio credentials, code of conduct agreement |
| `/collections` | **Thematic Collections** | Editorial suites: *Art for Minimalist Spaces*, *Beyond the Canvas*, *The New Surrealists*, *Emerging Voices*, *Objects of Desire*, *Art Under ₹10,000* |
| `/gallery` | **3D Virtual Gallery** | Real-time WebGL exhibition room with 4 exhibition walls, click-to-inspect artworks, guided camera tours, and acoustic toggles |
| `/cart` | **Collection Bag** | Quantity controls for prints, strict 1-quantity lock for unique original works, shipping & tax calculations, subtotal |
| `/checkout` | **Acquisition Checkout** | Multi-step contact & delivery details, payment integration scaffold (Razorpay, Stripe, UPI), verified order confirmation, confetti celebration |
| `/account` | **Buyer Account** | Private collection ledger, saved wishlist, followed artists, delivery addresses |
| `/account/orders` | **Orders & Certificates** | Order history with tracking number, carrier status, and printable Certificate of Authenticity receipt |
| `/dashboard` | **Artist Studio Dashboard** | Revenue metrics, net creator payout (85%), sales velocity chart, inventory counter, catalog table |
| `/dashboard/artworks/new` | **Upload Artwork** | New listing upload form with live image preview, framing options, dimension specs, draft/publish modes |
| `/dashboard/orders` | **Artist Orders** | Fulfillment coordination, status updates (*Confirmed*, *In Preparation*, *Shipped*, *Delivered*), tracking assignment |
| `/about` | **About ARTORA** | Manifesto, creator-first 85% payout model, physical certificate guarantees |
| `/contact` | **Curator Concierge** | Inquiry form, salon addresses in Mumbai and Berlin, client hotline |
| `/faq` | **Frequently Asked Questions** | Buyer guarantees, artist commissions, crating logistics accordions |
| `/privacy` | **Privacy Policy** | Discretion guidelines, PCI-DSS compliance, zero data sales |
| `/terms` | **Terms of Service** | Authenticity warranties, 1-of-1 inventory locks, platform escrow rules |

---

## 4. Local Installation & Development

### Prerequisites
- Node.js (v18+ or v24+)
- npm (v9+)

### Installation
```bash
# Clone or navigate to the project directory
cd "C:\Users\Md rehan\.gemini\antigravity\scratch\artora"

# Install dependencies
npm install

# Start Vite development server with local network access
npm run dev -- --host 0.0.0.0 --port 5173

# Create production build
npm run build
```

---

## 5. Deploying to Vercel

ARTORA is fully configured for zero-configuration, production deployment on **Vercel** with SPA route rewrites, CDN asset caching, and split Three.js vendor chunking.

### Method A: Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/your-username/artora.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and click **Import** next to your `artora` repository.
3. Vercel will automatically detect the settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your site will be live with full SSL, global CDN, and SPA deep-link support.

### Method B: Deploy via Vercel CLI
```bash
# Run from the project directory
npx vercel

# Follow prompts:
# ? Set up and deploy? [Y]
# ? Which scope? [Your Account]
# ? Link to existing project? [N]
# ? What's your project's name? artora
# ? In which directory is your code located? ./
# Want to modify these settings? [N]

# Deploy directly to production:
npx vercel --prod
```

---

## 6. Environment Variables & Production Integration

Create a `.env` file in the root directory for live service credentials:

```env
# Application URL
VITE_APP_URL=https://artora.com

# Payment Gateways
# Razorpay (India & International UPI/Netbanking)
VITE_RAZORPAY_KEY_ID=rzp_test_YourKeyHere
RAZORPAY_KEY_SECRET=YourSecretHere

# Stripe (Global Cards & Apple Pay)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YourKeyHere
STRIPE_SECRET_KEY=sk_test_YourSecretHere
STRIPE_WEBHOOK_SECRET=whsec_YourSecretHere

# Database (PostgreSQL / Supabase)
DATABASE_URL=postgresql://user:password@localhost:5432/artora_db

# Supabase Auth & Storage (for artwork asset hosting)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 6. Database Schema Design (PostgreSQL / Supabase)

The production data layer is modeled around:
- `users`: ID, email, full name, role (`buyer`, `artist`, `admin`), avatar.
- `artist_profiles`: User ID, slug, bio, statement, discipline, location, verified status.
- `artworks`: Title, slug, artist ID, price (INR), category, medium, materials, dimensions, year, `artwork_type` (`original`, `limited_edition`, `open_edition`), inventory count, framed status, orientation.
- `artwork_images`: Artwork ID, image URL, primary flag, display order.
- `orders`: Order number, buyer ID, subtotal, shipping, tax, total, payment status, fulfillment status, shipping address.
- `order_items`: Order ID, artwork ID, artist ID, unit price, quantity, artist earnings (85%), platform fee (15%).
- `wishlists`: Buyer ID, artwork ID.
- `artist_follows`: Follower ID, artist ID.

---

## 7. Security & Marketplace Safeguards

1. **Unique 1-of-1 Original Lock:** The application prevents adding more than 1 unit of an original piece to any cart and disables purchasing when inventory is 0.
2. **Escrow Flow:** Funds remain in escrow until the 14-day collector trial concludes.
3. **No Raw Card Storage:** Never collects or stores raw credit card details on application servers; tokenized via PCI-DSS processors.
4. **Interactive Role Switching:** Evaluators can switch between Collector mode (*Tara Mehta*) and Artist mode (*Elena Rostova*) in one click from the navigation profile menu to inspect all buyer and artist workflows.

---

© 2025 ARTORA Inc. Art Beyond the Ordinary.
