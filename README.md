
# 🛒 Mock E-Com Cart — Full Stack Assignment

### Overview
A basic full-stack shopping cart application built for **Vibe Commerce** assignment.  
It demonstrates **React (Vite)** frontend, **Node.js + Express** backend, and **SQLite** for persistence.  
Supports adding/removing items, cart totals, and mock checkout flow.

---

## 📂 Folder Structure

```

mock-ecom-cart/
├── backend/   → Node.js + Express + SQLite API (runs on port 4000)
├── frontend/  → React (Vite) app (runs on port 5173)
└── README.md

````

---

## 🚀 Quick Start

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm start
````

* Server will run on: **[http://localhost:4000](http://localhost:4000)**
* Uses SQLite (`backend/data.sqlite`) for product & cart persistence.

#### 🔹 API Endpoints

| Method     | Endpoint        | Description                     | Body Example                                                            |
| ---------- | --------------- | ------------------------------- | ----------------------------------------------------------------------- |
| **GET**    | `/api/products` | Get all products                | —                                                                       |
| **GET**    | `/api/cart`     | Get cart items + total          | —                                                                       |
| **POST**   | `/api/cart`     | Add item to cart                | `{ "productId": 1, "qty": 2 }`                                          |
| **DELETE** | `/api/cart/:id` | Remove item by ID               | —                                                                       |
| **POST**   | `/api/checkout` | Mock checkout — returns receipt | `{ "cartItems": [...], "name": "Priya", "email": "priya@example.com" }` |

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

* App will start at: **[http://localhost:5173](http://localhost:5173)**
* Frontend assumes backend at **[http://localhost:4000](http://localhost:4000)**
  (You can override by setting an environment variable):

```bash
VITE_API_URL=http://localhost:4000
```

---

## 🧾 Features

* 💾 SQLite persistence for products & cart data
* ➕ Add / Remove products in cart
* 🧮 Automatic total calculation
* 🧾 Mock checkout returns receipt (total, timestamp, user info)
* ⚙️ Basic error handling
* 🪶 Responsive design (mobile-friendly)
* 🧰 Easily editable mock products in `backend/db.js`

---

## 🧑‍💻 Developer Notes

* No real payments — mock flow only.
* Products can be customized by editing the array in `db.js`.
* If you need a **Dockerfile** or a **single-command demo**, this can be added easily.

---

## 🧩 Tech Stack

| Layer     | Tech              |
| --------- | ----------------- |
| Frontend  | React (Vite), CSS |
| Backend   | Node.js, Express  |
| Database  | SQLite            |
| API Style | REST              |

---
Would you like me to generate a short **professional summary paragraph** (3–4 lines) for your GitHub repo’s top description (for the repo homepage)?
That makes it look very polished to reviewers.
