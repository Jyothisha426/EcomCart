import React from 'react';
import '../styles/modal.css';

export default function ReceiptModal({ receipt, closeModal }) {
  if (!receipt) return null;

  // Pick the timestamp field that exists (common names)
  const rawDate =
    receipt.timestamp ?? receipt.date ?? receipt.time ?? receipt.createdAt ?? null;

  // Try to parse it into a Date object
  const parsed = rawDate ? new Date(rawDate) : null;
  const validDate = parsed && !Number.isNaN(parsed.getTime());

  // Format or fallback
  const formattedDate = validDate
    ? parsed.toLocaleString() // change to 'en-IN' as second arg if you want Indian format: parsed.toLocaleString('en-IN')
    : 'Unknown date';

  return (
    <div className="receipt-overlay">
      <div className="receipt-container">
        <h2>🧾 Order Receipt</h2>
        <div className="receipt-details">
          <p><strong>Name:</strong> {receipt.name || '—'}</p>
          <p><strong>Email:</strong> {receipt.email || '—'}</p>
          <p><strong>Date:</strong> {formattedDate}</p>
        </div>

        <hr />

        <table className="receipt-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {receipt.items && receipt.items.length > 0 ? (
              receipt.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{Number(item.price).toFixed(2)}</td>
                  <td>₹{(Number(item.price) * Number(item.qty)).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '12px' }}>
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <hr />

        <div className="receipt-total">
          <strong>
            Grand Total: ₹{(typeof receipt.total === 'number' ? receipt.total : Number(receipt.total || 0)).toFixed(2)}
          </strong>
        </div>

        <p className="thank-you">Thank you for your purchase!</p>

        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
