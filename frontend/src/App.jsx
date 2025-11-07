import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartCheckout from './components/CartCheckout';
import ReceiptModal from './components/ReceiptModal';
import './styles/global.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function App() {
  const [view, setView] = useState('home');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(`${API}/api/products`);
      setProducts(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchCart() {
    try {
      const res = await axios.get(`${API}/api/cart`);
      setCart(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function addToCart(p) {
    setLoading(true);
    try {
      await axios.post(`${API}/api/cart`, { productId: p.id, qty: 1 });
      await fetchCart();
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(id) {
    setLoading(true);
    try {
      await axios.delete(`${API}/api/cart/${id}`);
      await fetchCart();
    } finally {
      setLoading(false);
    }
  }

  async function changeQty(id, qty) {
    if (qty < 1) return;
    setLoading(true);
    try {
      await axios.put(`${API}/api/cart/${id}`, { qty });
      await fetchCart();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function checkout(e) {
    e.preventDefault();
    try {
      const body = {
        cartItems: cart.items,
        name: checkoutInfo.name,
        email: checkoutInfo.email
      };
      const res = await axios.post(`${API}/api/checkout`, body);
      setReceipt(res.data.receipt);
      await fetchCart();
      setCheckoutInfo({ name: '', email: '' });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="app-container">
      <Navbar view={view} setView={setView} cartCount={cart.items.length} />
      <main className="main-content">
        {view === 'home' && (
          <ProductList
            products={products}
            addToCart={addToCart}
            loading={loading}
          />
        )}
        {view === 'cart' && (
          <CartCheckout
            cart={cart}
            removeItem={removeItem}
            changeQty={changeQty}
            loading={loading}
            checkoutInfo={checkoutInfo}
            setCheckoutInfo={setCheckoutInfo}
            onCheckout={checkout}
          />
        )}
      </main>
      {receipt && (
        <ReceiptModal receipt={receipt} closeModal={() => setReceipt(null)} />
      )}
    </div>
  );
}
