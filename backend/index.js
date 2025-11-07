const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

/** GET /api/products */
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.allProducts();
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

/** GET /api/cart */
app.get('/api/cart', async (req, res) => {
  try {
    const cart = await db.getCart();
    const total = cart.reduce((s, item) => s + item.price * item.qty, 0);
    res.json({ items: cart, total });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

/** POST /api/cart */
app.post('/api/cart', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty)
      return res.status(400).json({ error: 'productId and qty required' });
    const item = await db.addToCart(productId, qty);
    res.json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

/** PUT /api/cart/:id -> Update quantity */
app.put('/api/cart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { qty } = req.body;
    if (typeof qty !== 'number' || qty < 1)
      return res.status(400).json({ error: 'Valid qty required' });

    await db.updateCartQty(id, qty);
    const cart = await db.getCart();
    const total = cart.reduce((s, item) => s + item.price * item.qty, 0);
    res.json({ items: cart, total });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

/** DELETE /api/cart/:id */
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.removeFromCart(id);
    const cart = await db.getCart();
    const total = cart.reduce((s, item) => s + item.price * item.qty, 0);
    res.json({ items: cart, total });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

/** POST /api/checkout */
app.post('/api/checkout', async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;
    if (!cartItems || !Array.isArray(cartItems))
      return res.status(400).json({ error: 'cartItems required' });

    const total = cartItems.reduce((s, it) => s + it.price * it.qty, 0);
    const receipt = {
      total,
      timestamp: new Date().toISOString(),
      name: name || null,
      email: email || null,
      items: cartItems
    };

    await db.clearCart();
    res.json({ receipt });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('✅ Server running on port', PORT));
