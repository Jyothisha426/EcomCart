const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbFile = path.join(__dirname, 'data.sqlite');

const db = new sqlite3.Database(dbFile);

function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function init() {
  await runAsync(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL
  );`);

  await runAsync(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    qty INTEGER,
    FOREIGN KEY(productId) REFERENCES products(id)
  );`);

  const existing = await allAsync('SELECT COUNT(*) as c FROM products');
  if (existing[0].c === 0) {
    const products = [
      { id: 1, name: 'Classic T-Shirt', price: 199.0 },
      { id: 2, name: 'Sport Sneakers', price: 1299.0 },
      { id: 3, name: 'Comfy Hoodie', price: 799.0 },
      { id: 4, name: 'Wireless Earbuds', price: 1599.0 },
      { id: 5, name: 'Ceramic Mug', price: 149.0 },
      { id: 6, name: 'Denim Jeans', price: 999.0 },
      { id: 7, name: 'Leather Wallet', price: 699.0 },
      { id: 8, name: 'Cotton Cap', price: 249.0 },
      { id: 9, name: 'Graphic Tee', price: 299.0 },
      { id: 10, name: 'Wrist Watch', price: 1599.0 }
    ];
    for (const p of products) {
      await runAsync('INSERT INTO products(id, name, price) VALUES (?, ?, ?)', [
        p.id,
        p.name,
        p.price
      ]);
    }
  }
}

async function allProducts() {
  return await allAsync('SELECT id, name, price FROM products');
}

async function addToCart(productId, qty) {
  const rows = await allAsync('SELECT id, qty FROM cart WHERE productId = ?', [productId]);
  if (rows.length > 0) {
    const newQty = rows[0].qty + Number(qty);
    await runAsync('UPDATE cart SET qty = ? WHERE id = ?', [newQty, rows[0].id]);
    return { id: rows[0].id, productId, qty: newQty };
  } else {
    const res = await runAsync('INSERT INTO cart(productId, qty) VALUES (?, ?)', [
      productId,
      qty
    ]);
    return { id: res.lastID, productId, qty: Number(qty) };
  }
}

async function updateCartQty(id, qty) {
  await runAsync('UPDATE cart SET qty = ? WHERE id = ?', [qty, id]);
}

async function getCart() {
  return await allAsync(
    `SELECT c.id, c.productId, c.qty, p.name, p.price
     FROM cart c
     JOIN products p ON p.id = c.productId`
  );
}

async function removeFromCart(id) {
  await runAsync('DELETE FROM cart WHERE id = ?', [id]);
}

async function clearCart() {
  await runAsync('DELETE FROM cart');
}

module.exports = {
  init,
  allProducts,
  addToCart,
  updateCartQty,
  getCart,
  removeFromCart,
  clearCart
};

init().catch((e) => {
  console.error('DB init error', e);
});
