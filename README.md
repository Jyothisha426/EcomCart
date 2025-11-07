
# 🛒 Mock E-Com Cart — Full Stack Assignment

### Overview
A basic full-stack shopping cart application built for **Vibe Commerce** assignment.  
It demonstrates **React (Vite)** frontend, **Node.js + Express** backend, and **SQLite** for persistence.  
Supports adding/removing items, cart totals, and mock checkout flow.

---
## Demo Video
🎥 Watch here: [Demo on Youtube](https://youtu.be/-VqVs9alRGo?si=lZrmXeNw_pLgwJrL)
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

## Screenshots

<img width="1899" height="862" alt="Screenshot 2025-11-07 131026" src="https://github.com/user-attachments/assets/529bf5eb-1f86-4f23-b184-33d389cbdb0d" />

<img width="1898" height="873" alt="Screenshot 2025-11-07 131054" src="https://github.com/user-attachments/assets/05e1bbb9-b8bb-4f32-b9c8-3f4f2d2cd089" />

<img width="1910" height="869" alt="Screenshot 2025-11-07 131116" src="https://github.com/user-attachments/assets/a5246913-16f0-4f86-891f-cc3176875815" />

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
