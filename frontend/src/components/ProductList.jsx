import React, { useState } from 'react';
import '../styles/products.css';

export default function ProductList({ products, addToCart, loading }) {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToCart = (product) => {
    const result = addToCart(product); 
    // Expect addToCart to return 'new' or 'exists'
    if (result === 'exists') {
      showToast(`${product.name} is already in cart — quantity increased by 1.`);
    } else {
      showToast(`${product.name} added to cart successfully!`);
    }
  };

  return (
    <div className="products-section">
      <h2 className="products-title">Our Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-content">
              <h3 className="product-name">{p.name}</h3>
              <p className="product-price">₹{p.price.toFixed(2)}</p>
            </div>
            <button
              className="add-btn"
              onClick={() => handleAddToCart(p)}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
