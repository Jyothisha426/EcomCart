import React from 'react';
import '../styles/cartCheckout.css';

export default function CartCheckout({
  cart,
  removeItem,
  changeQty,
  loading,
  checkoutInfo,
  setCheckoutInfo,
  onCheckout
}) {
  return (
    <div className="cart-checkout-page">
      <h2>Your Cart & Checkout</h2>

      {cart.items.length === 0 ? (
        <p className="empty">No items in your cart.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.items.map((it) => (
              <li key={it.id} className="cart-item">
                <div>
                  <strong>{it.name}</strong> <br />
                  ₹{it.price.toFixed(2)} × {it.qty}
                </div>

                <div className="qty-controls">
                  <button
                    onClick={() => changeQty(it.id, it.qty - 1)}
                    disabled={it.qty <= 1 || loading}
                  >
                    -
                  </button>
                  <span className="qty">{it.qty}</span>
                  <button
                    onClick={() => changeQty(it.id, it.qty + 1)}
                    disabled={loading}
                  >
                    +
                  </button>
                  <button onClick={() => removeItem(it.id)} disabled={loading}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="total">Total: ₹{cart.total.toFixed(2)}</div>

          <hr className="divider" />

          <form onSubmit={onCheckout} className="checkout-form">
            <h3>Checkout Details</h3>
            <input
              placeholder="Your Name"
              value={checkoutInfo.name}
              onChange={(e) =>
                setCheckoutInfo({ ...checkoutInfo, name: e.target.value })
              }
              required
            />
            <input
              placeholder="Your Email"
              value={checkoutInfo.email}
              onChange={(e) =>
                setCheckoutInfo({ ...checkoutInfo, email: e.target.value })
              }
              required
            />
            <button type="submit">Place Order</button>
          </form>
        </>
      )}
    </div>
  );
}
