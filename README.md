# LUXE - Modern Ecommerce Store

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)](https://vitejs.dev/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-0.9-4F46E5.svg)](https://ui.shadcn.com/)

A production-ready, fully responsive **ecommerce website** built with modern React ecosystem. Features cart, wishlist, authentication, product search, dark mode, and smooth animations.

![Hero Banner](src/assets/hero-banner.jpg)

## ✨ Features

- **Product Catalog**: Browse, filter, search products (Shop page)
- **Product Details**: Quick view modal, reviews, add to cart/wishlist
- **Shopping Cart**: Persistent drawer + dedicated page w/ quantity controls
- **Wishlist**: Save/remove products, move to cart
- **Authentication**: Login/Register (mock API)
- **Responsive Design**: Mobile-first, drawer menus, hover effects
- **Dark/Light Mode**: Theme toggle w/ persistence
- **Animations**: Framer Motion (layout transitions, carousels)
- **Performance**: TanStack Query caching, skeletons, lazy loading
- **UI Components**: shadcn/ui (50+ primitives: buttons, modals, carousels, etc.)

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | React 18 + TypeScript + Vite |
| **UI** | Tailwind CSS, shadcn/ui, Lucide React, Framer Motion |
| **Routing** | React Router v6 |
| **State** | React Context (Auth/Cart/Wishlist/Theme), localStorage |
| **Data** | TanStack Query, JSON Server (`db.json`) |
| **Forms** | React Hook Form + Zod |
| **Other** | Sonner (toasts), Embla Carousel, Recharts |

## 📁 Project Structure

```
src/
├── App.tsx              # Routes + Providers stack
├── components/
│   ├── ui/              # shadcn primitives (~50 files)
│   ├── layout/          # Navbar, Footer, CartDrawer
│   ├── home/            # Hero, Testimonials, Newsletter
│   └── products/        # Cards, Filters, Modals
├── contexts/            # 5 Contexts: Auth, Cart, Wishlist, etc.
├── pages/              # 10+ pages (Shop, CartPage, ProductDetail, etc.)
├── lib/                # api.ts, utils.ts
└── types/              # Product interfaces
```

**API**: `http://localhost:3000` (JSON Server) → `db.json` (add more products/users).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Bun (optional, faster)

### 1. Clone & Install
```bash
git clone <repo>
cd ecommerce
bun install  # or npm install
```

### 2. Start JSON Server (Backend)
```bash
# Terminal 1
bunx json-server --watch db.json --port 3000
```

### 3. Development
```bash
# Terminal 2
bun dev  # http://localhost:5173
```

### 4. Build & Preview
```bash
bun run build
bun run preview
```

## 📖 Pages & Routes

| Path | Description |
|------|-------------|
| `/` | Home (Hero, Featured, Testimonials) |
| `/shop` | Product grid w/ filters |
| `/product/:id` | Single product |
| `/cart` | Cart checkout |
| `/wishlist` | Saved items |
| `/login` `/register` | Auth |
| `/about` `/contact` | Static |

## 🔧 Customization

1. **Add Products**: Edit `db.json` → auto-reloads.
2. **New Components**: `bunx shadcn-ui@latest add button` (shadcn CLI).
3. **Deploy**: `bun run build` → `dist/` (Vite optimized).

## 🐛 Troubleshooting

- **API 404**: Ensure JSON Server running (`bunx json-server db.json`).
- **Styles missing**: `bun install` → restart dev server.
- **Type errors**: `bun tsc --noEmit`.

## 🤝 Contributing

1. Fork & PR
2. Add products to `db.json`
3. New shadcn components: `./components/ui/`
4. Tests: `bun test`

## 📄 License

MIT
