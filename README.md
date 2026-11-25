# KLU Fresh — React + Vite

A client-side grocery shopping web application with customer storefront, admin dashboard, and browser `localStorage` persistence.

## Features
- **LocalStorage Persistence**:
  - Stores customer accounts (`grocery_users`), admin accounts (`grocery_admins`), active session (`grocery_current_user`), products (`grocery_products`), orders (`grocery_orders`), cart (`klu_cart`), and wishlist (`klu_wishlist`).
- **Customer Storefront**:
  - Product catalog with search, category filtering, and sorting
  - Cart, wishlist, delivery slot selection, checkout, and order history tracking
- **Admin Dashboard**:
  - Live revenue, total orders, product catalog size, registered users, and low-stock alerts
  - Product CRUD (create, edit, delete, +5 quick stock boost)
  - Order status tracking and registered user directory

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- `vercel.json` is configured for SPA routing (`/index.html`).

## Demo Logins
- **Admin Accounts**:
  - `admin@klufresh.com` (Password: `admin123`)
  - `admin123@klufresh.in` (Password: `admin11`)
- **Customer Account**:
  - Use **Sign up** to create an account, or log in with:
  - `customer@klufresh.com` (Password: `demo1234`)
