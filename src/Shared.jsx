import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { money, readStore, writeStore } from "./data";

function useStored(key, initial) {
  const [value, setValue] = useState(() => readStore(key, initial));
  useEffect(() => writeStore(key, value), [key, value]);
  return [value, setValue];
}

function statusTone(status) {
  switch (status) {
    case "Delivered":
      return "status-delivered";
    case "Out for Delivery":
      return "status-transit";
    case "Processing":
      return "status-processing";
    case "Cancelled":
      return "status-cancelled";
    default:
      return "status-placed";
  }
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 7.5L6.5 3.5H17.5L20 7.5M4 7.5H20M4 7.5V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V7.5M9 11.5C9 13.16 10.34 14.5 12 14.5C13.66 14.5 15 13.16 15 11.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Header({ user, onLogout, cartCount, wishCount, onOpenCart, onToggleWishlist, wishActive }) {
  return (
    <>
      <div className="top-announcement">
        <span>⚡ 15-Min Express Campus &amp; City Delivery</span>
        <span className="dot-sep" aria-hidden="true">•</span>
        <span>🎉 Automatic 10% Instant Savings on Orders ₹500+</span>
        <span className="dot-sep" aria-hidden="true">•</span>
        <span>❄️ Cold-Chain Freshness Guaranteed</span>
      </div>

      <header className="header">
        <Link className="brand" to="/">
          <BrandMark />
          <span className="brand-text">
            KLU <span>Fresh</span>
          </span>
        </Link>

        <nav aria-label="Primary">
          <a href="/#home">Home</a>
          <a href="/#categories">Categories</a>
          <a href="/#products">Catalog</a>
          <a href="/#about">Why Us</a>
          <a href="/#contact">Contact</a>
        </nav>

        <div className="header-right">
          {onOpenCart ? (
            <button type="button" className="nav-pill" onClick={onOpenCart}>
              <span>🛒</span> Cart <span className="badge-count">{cartCount}</span>
            </button>
          ) : (
            <Link className="nav-pill" to="/#products">
              <span>🛒</span> Cart <span className="badge-count">{cartCount}</span>
            </Link>
          )}

          {onToggleWishlist ? (
            <button
              type="button"
              className={`nav-pill ${wishActive ? "nav-pill-active" : ""}`}
              onClick={onToggleWishlist}
            >
              <span>{wishActive ? "♥" : "♡"}</span> Saved <span className="badge-count">{wishCount}</span>
            </button>
          ) : (
            <Link className="nav-pill" to="/#products">
              <span>♡</span> Saved <span className="badge-count">{wishCount}</span>
            </Link>
          )}

          {user ? (
            <>
              <span className="welcome">Hi, {user.name.split(" ")[0]}</span>
              {user.role === "admin" && (
                <Link className="admin-link" to="/admin">
                  Admin
                </Link>
              )}
              <button type="button" className="small-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="login-link" to="/login">
                Login
              </Link>
              <Link className="small-btn primary-chip" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}

function ProductThumb({ product, className = "", emojiClassName = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [product?.image]);

  if (product?.image && !failed) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className={className}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return <span className={emojiClassName}>{product?.emoji || "🛒"}</span>;
}

function ProductCard({ product, add, toggleWish, wished, cartQty = 0, onUpdateQty, onRemove, onInspect }) {
  const discount =
    product.original > product.price ? Math.round((1 - product.price / product.original) * 100) : 0;
  const savings = Math.max(0, (product.original || product.price) - product.price);
  const lowStock = product.stock > 0 && product.stock <= 3;

  return (
    <article
      className={`product-card ${product.stock <= 0 ? "out-of-stock" : ""}`}
      onClick={() => onInspect && onInspect(product)}
    >
      <div className="product-media">
        <ProductThumb product={product} className="product-photo" emojiClassName="emoji-glyph" />
        <span className="media-scrim" aria-hidden="true" />
        {discount > 0 && <span className="discount">{discount}% OFF</span>}
        {product.tag && <span className="product-tag">{product.tag}</span>}
        {lowStock && <span className="stock-tag">Only {product.stock} left</span>}
        {product.stock <= 0 && <span className="stock-tag stock-out-tag">Out of stock</span>}
      </div>

      <button
        type="button"
        className={`heart ${wished ? "hearted" : ""}`}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={e => {
          e.stopPropagation();
          toggleWish(product.id);
        }}
      >
        {wished ? "♥" : "♡"}
      </button>

      <div className="product-info">
        <div className="product-meta">
          <small>{product.category}</small>
          <span className="rating-pill">★ {product.rating || "4.5"}</span>
        </div>
        <h3>{product.name}</h3>
        <p className="unit-text">{product.qty}</p>

        <div className="price-line">
          <strong>{money(product.price)}</strong>
          {product.original > product.price && <del>{money(product.original)}</del>}
          {savings > 0 && <span className="save-pill">Save {money(savings)}</span>}
        </div>

        {cartQty > 0 && onUpdateQty ? (
          <div className="card-stepper" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => (cartQty <= 1 && onRemove ? onRemove(product.id) : onUpdateQty(product.id, cartQty - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span>{cartQty} in cart</span>
            <button
              type="button"
              disabled={cartQty >= product.stock}
              onClick={() => onUpdateQty(product.id, cartQty + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="primary-btn full"
            disabled={product.stock <= 0}
            onClick={e => {
              e.stopPropagation();
              add(product);
            }}
          >
            {product.stock <= 0 ? "Out of stock" : "+ Add to cart"}
          </button>
        )}
      </div>
    </article>
  );
}

function Stat({ label, value, icon }) {
  return (
    <article className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div>
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>
                #{o.id}
                <small className="block">{new Date(o.createdAt).toLocaleDateString()}</small>
              </td>
              <td>
                {o.customerName}
                <small className="block">{o.customerEmail}</small>
              </td>
              {detailed && (
                <td>
                  {o.address}, {o.city} - {o.pincode}
                </td>
              )}
              <td>{o.items.map(i => `${i.name} × ${i.qty}`).join(", ")}</td>
              <td>
                <strong>{money(o.total)}</strong>
              </td>
              <td>
                <select
                  className={`status-select ${statusTone(o.status)}`}
                  value={o.status}
                  onChange={e => changeStatus(o.id, e.target.value)}
                >
                  {["Placed", "Processing", "Out for Delivery", "Delivered", "Cancelled"].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!orders.length && <p className="empty">No orders available.</p>}
    </div>
  );
}

export { useStored, statusTone, BrandMark, Header, ProductThumb, ProductCard, Stat, OrdersTable };
