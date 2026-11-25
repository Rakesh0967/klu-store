import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { money, readStore, writeStore } from "./data";
import {
  IconLeaf,
  IconCart,
  IconHeart,
  IconHeartFilled,
  IconStar,
  IconUser,
  IconAdmin,
  IconLogout,
} from "./Icons";

function useStored(key, initial) {
  const [value, setValue] = useState(() => readStore(key, initial));
  useEffect(() => writeStore(key, value), [key, value]);
  return [value, setValue];
}

function Header({ user, onLogout, cartCount = 0, wishCount = 0, onOpenCart }) {
  return (
    <header className="header">
      <Link className="brand" to="/">
        <span className="brand-icon-box">
          <IconLeaf size={20} />
        </span>
        <span>
          KLU <strong>Fresh</strong>
        </span>
      </Link>

      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Products
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Contact
        </NavLink>
      </nav>

      <div className="header-right">
        <button
          type="button"
          className="nav-icon-link cart-btn-header"
          onClick={() => (onOpenCart ? onOpenCart() : null)}
          aria-label="View Cart"
        >
          <span className="icon-badge-wrap">
            <IconCart size={18} />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </span>
          <span>Cart</span>
        </button>

        <Link to="/products" className="nav-icon-link">
          <span className="icon-badge-wrap">
            <IconHeart size={18} />
            {wishCount > 0 && <span className="badge-count secondary">{wishCount}</span>}
          </span>
          <span>Wishlist</span>
        </Link>

        {user ? (
          <>
            <span className="welcome">
              <IconUser size={16} /> Hi, {user.name.split(" ")[0]}
            </span>
            {user.role === "admin" && (
              <Link className="admin-link" to="/admin">
                <IconAdmin size={16} /> Admin
              </Link>
            )}
            <button className="small-btn logout-btn" onClick={onLogout}>
              <IconLogout size={15} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link className="login-link" to="/login">
              Login
            </Link>
            <Link className="small-btn sign-btn" to="/signup">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

function ProductCard({ product, add, toggleWish, wished }) {
  const discount =
    product.original > product.price
      ? Math.round((1 - product.price / product.original) * 100)
      : 0;

  return (
    <article className="product-card">
      <div className="product-image-container">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              if (e.target.nextSibling) e.target.nextSibling.style.display = "grid";
            }}
          />
        ) : null}
        <div
          className="product-fallback-emoji"
          style={{ display: product.image ? "none" : "grid" }}
        >
          {product.emoji || "🛒"}
        </div>

        {discount > 0 && <span className="discount">{discount}% OFF</span>}

        <button
          className={`heart ${wished ? "hearted" : ""}`}
          onClick={() => toggleWish(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wished ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
        </button>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <small className="product-cat">{product.category}</small>
          <span className="rating-pill">
            <IconStar size={13} /> {product.rating || "4.5"}
          </span>
        </div>

        <h3 title={product.name}>{product.name}</h3>
        <p className="product-qty">{product.qty}</p>

        <div className="price-line">
          <strong>{money(product.price)}</strong>
          {product.original > product.price && <del>{money(product.original)}</del>}
        </div>

        <button
          className="primary-btn full"
          disabled={product.stock <= 0}
          onClick={() => add(product)}
        >
          <IconCart size={16} />
          {product.stock <= 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

function Stat({ label, value, icon, variant = "blue" }) {
  return (
    <article className={`stat-card stat-${variant}`}>
      <div className="stat-icon-wrap">{icon}</div>
      <div className="stat-text">
        <small>{label}</small>
        <h2>{value}</h2>
      </div>
    </article>
  );
}

function OrdersTable({ orders, changeStatus, detailed = false }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            {detailed && <th>Address</th>}
            <th>Items</th>
            <th>Total</th>
            {detailed && <th>Coupon</th>}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>
                <span className="order-id-badge">#{o.id}</span>
                <small className="block">{new Date(o.createdAt).toLocaleDateString()}</small>
              </td>
              <td>
                <b>{o.customerName}</b>
                <small className="block">{o.customerEmail}</small>
              </td>
              {detailed && (
                <td>
                  {o.address}, {o.city} - {o.pincode}
                </td>
              )}
              <td>
                <span className="order-items-preview">
                  {o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                </span>
              </td>
              <td>
                <strong>{money(o.total)}</strong>
              </td>
              {detailed && (
                <td>
                  {o.couponCode
                    ? <span style={{background:"#f0fdf4",color:"#166534",border:"1px solid #86efac",borderRadius:6,padding:"2px 8px",fontWeight:700,fontSize:"0.8rem"}}>🏷️ {o.couponCode} <span style={{color:"#64748b",fontWeight:400}}>-{money(o.couponSaving||0)}</span></span>
                    : <span style={{color:"var(--muted)",fontSize:"0.8rem"}}>—</span>
                  }
                </td>
              )}
              <td>
                <select
                  className="status-select"
                  value={o.status}
                  onChange={(e) => changeStatus(o.id, e.target.value)}
                >
                  {["Placed", "Processing", "Out for Delivery", "Delivered", "Cancelled"].map(
                    (s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    )
                  )}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!orders.length && <p className="empty-message">No orders available yet.</p>}
    </div>
  );
}

function Footer() {
  return (
    <footer id="contact">
      <div>
        <div className="brand" style={{ color: "#ffffff", marginBottom: 10 }}>
          🌿 KLU <span>Fresh</span>
        </div>
        <p>Delivering fresh, wholesome essentials across Vijayawada & KL University.</p>
        <p style={{ marginTop: 8 }}>
          <Link to="/about" style={{ color: "#93c5fd", textDecoration: "underline", marginRight: 15 }}>
            About Us
          </Link>
          <Link to="/products" style={{ color: "#93c5fd", textDecoration: "underline", marginRight: 15 }}>
            Store Catalog
          </Link>
          <Link to="/contact" style={{ color: "#93c5fd", textDecoration: "underline" }}>
            Contact & Support
          </Link>
        </p>
      </div>
      <div>
        <b>Customer Support</b>
        <p>support@klufresh.com</p>
        <p>+91 866 245 6789</p>
        <p>Hours: 7:00 AM – 10:00 PM Daily</p>
      </div>
      <div>
        <b>Campus Express Delivery</b>
        <p>Vijayawada & KLU Campus, AP</p>
        <small>© 2026 KLU Fresh. All rights reserved.</small>
      </div>
    </footer>
  );
}

export { useStored, Header, ProductCard, Stat, OrdersTable, Footer };
