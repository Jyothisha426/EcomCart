import React from 'react';
import '../styles/navbar.css';

export default function Navbar({ view, setView, cartCount }) {
  return (
    <nav className="navbar">
      <div className="logo">🛒 Vibe Commerce</div>
      <ul className="nav-links">
        <li className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}>Home</li>
        <li className={view === 'cart' ? 'active' : ''} onClick={() => setView('cart')}>
          Cart ({cartCount})
        </li>
      </ul>
    </nav>
  );
}
