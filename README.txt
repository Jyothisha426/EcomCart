Mock E-Com Cart — Full stack assignment
======================================

Contents
- backend/  -> Node + Express + SQLite API (port 4000)
- frontend/ -> React (Vite) app (port 5173)

Quick start (from unzipped folder)
----------------------------------
1. Backend
   - Open terminal, cd into backend
     $ cd backend
   - Install dependencies and start server:
     $ npm install
     $ npm start
   - Server will run on http://localhost:4000
   - API endpoints:
     GET  /api/products
     GET  /api/cart
     POST /api/cart      { productId, qty }
     DELETE /api/cart/:id
     POST /api/checkout  { cartItems, name, email } -> returns mock receipt

2. Frontend
   - Open another terminal, cd into frontend
     $ cd frontend
   - Install and start dev server:
     $ npm install
     $ npm run dev
   - App will open at http://localhost:5173 (or as printed by Vite)
   - The frontend assumes the backend at http://localhost:4000
     You can change it by setting VITE_API_URL environment variable.

Notes / Features
- Backend uses SQLite (file: backend/data.sqlite) for products + cart persistence.
- Simple error handling is present.
- Checkout clears the cart and returns a receipt object (total, timestamp, name, email).
- No real payments — mock only.
- Bonus: You can replace the products by editing db.js initial data.

If you want a single-command demo using Docker or scripts, tell me and I can add them.
