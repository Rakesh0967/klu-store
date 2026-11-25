import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { defaultProducts, money, readStore, writeStore, applyCoupon } from "./data";
import { getCurrentUser, logout } from "./auth";
import { Header, Footer, useStored } from "./Shared";
import { IconCart, IconClose, IconPlus, IconMinus, IconTrash, IconCheck } from "./Icons";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./Login";
import Signup from "./Signup";
import Admin from "./Admin";

const PRODUCTS = "grocery_products", ORDERS = "grocery_orders", CART = "klu_cart", WISH = "klu_wishlist";

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState(getCurrentUser);
  const [products, setProducts] = useStored(PRODUCTS, defaultProducts);
  const [orders, setOrders] = useStored(ORDERS, []);
  const [cart, setCart] = useStored(CART, []);
  const [wishlist, setWishlist] = useStored(WISH, []);

  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [notice, setNotice] = useState("");
  const [placing, setPlacing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState(null); // { valid, saving, desc, error }

  const [details, setDetails] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "Vijayawada",
    pincode: "522502",
    slot: "10 AM – 12 PM",
    payment: "Cash on Delivery",
  });

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Ensure initial catalog is seeded in localStorage
  useEffect(() => {
    if (!readStore(PRODUCTS, null)) {
      writeStore(PRODUCTS, defaultProducts);
    }
  }, []);

  function add(product) {
    setCart((old) => {
      const found = old.find((x) => x.id === product.id);
      if (found) return old.map((x) => (x.id === product.id ? { ...x, qty: Math.min(x.qty + 1, product.stock) } : x));
      return [...old, { ...product, qty: 1 }];
    });
    setNotice(`${product.name} added to cart!`);
  }

  function toggleWish(id) {
    setWishlist((old) => (old.includes(id) ? old.filter((x) => x !== id) : [...old, id]));
  }

  function updateQty(id, qty) {
    setCart((old) => old.map((x) => (x.id === id ? { ...x, qty: Math.max(1, Math.min(Number(qty), x.stock)) } : x)));
  }

  const subtotal = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  const discount = subtotal >= 500 ? Math.round(subtotal * 0.1) : 0;
  const couponSaving = couponResult?.valid ? couponResult.saving : 0;
  const total = Math.max(0, subtotal - discount - couponSaving);

  function handleApplyCoupon() {
    const result = applyCoupon(couponCode, subtotal);
    setCouponResult(result);
  }

  function handleRemoveCoupon() {
    setCouponCode("");
    setCouponResult(null);
  }

  function placeOrder(e) {
    e.preventDefault();
    if (!user) {
      window.location.href = "/login";
      return;
    }
    if (!cart.length) return;

    setPlacing(true);
    const order = {
      id: "KLF" + Date.now().toString().slice(-8),
      userId: user.id,
      customerName: details.name || user.name,
      customerEmail: user.email,
      phone: details.phone,
      address: details.address,
      city: details.city,
      pincode: details.pincode,
      slot: details.slot,
      paymentMethod: details.payment,
      items: cart.map((x) => ({
        id: x.id,
        name: x.name,
        qty: x.qty,
        price: x.price,
        image: x.image,
        emoji: x.emoji,
      })),
      subtotal,
      discount,
      couponCode: couponResult?.valid ? couponCode.trim().toUpperCase() : null,
      couponSaving,
      total,
      status: "Placed",
      createdAt: new Date().toISOString(),
    };

    setOrders((old) => [order, ...old]);
    setProducts((old) =>
      old.map((p) => {
        const item = cart.find((c) => c.id === p.id);
        return item ? { ...p, stock: Math.max(0, p.stock - item.qty) } : p;
      })
    );
    setNotice(`Order #${order.id} placed successfully!`);
    setPlacing(false);
    setCart([]);
    setCheckout(false);
    setShowCart(false);
    setCouponCode("");
    setCouponResult(null);
  }

  const myOrders = orders.filter((o) => o.userId === user?.id);
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="app-layout">
      {/* Universal Header across storefront pages */}
      {!isAdminRoute && !isAuthRoute && (
        <Header
          user={user}
          onLogout={() => {
            logout();
            window.location.href = "/";
          }}
          cartCount={cart.reduce((s, x) => s + x.qty, 0)}
          wishCount={wishlist.length}
          onOpenCart={() => setShowCart(true)}
        />
      )}

      {/* Main Multi-page Routes */}
      <main className="app-main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                add={add}
                toggleWish={toggleWish}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                add={add}
                toggleWish={toggleWish}
                wishlist={wishlist}
                onOpenCart={() => setShowCart(true)}
                ordersCount={myOrders.length}
                onToggleOrders={() => setShowOrders(!showOrders)}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to={user.role === "admin" ? "/admin" : "/"} />
              ) : (
                <Login onAuth={setUser} />
              )
            }
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup onAuth={setUser} />}
          />
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <Admin
                  user={user}
                  products={products}
                  setProducts={setProducts}
                  orders={orders}
                  setOrders={setOrders}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Universal Orders Drawer / Panel */}
      {showOrders && !isAdminRoute && (
        <section className="section orders-panel">
          <div className="section-title">
            <div>
              <span className="eyebrow">ORDER TRACKING</span>
              <h2>My Orders ({myOrders.length})</h2>
            </div>
            <button className="outline-btn" onClick={() => setShowOrders(false)}>
              Close Panel ✕
            </button>
          </div>
          {myOrders.length ? (
            myOrders.map((o) => (
              <div className="order-row" key={o.id}>
                <div>
                  <span className="order-id-badge">#{o.id}</span>
                  <p>{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</p>
                  <small style={{ color: "var(--muted)" }}>
                    Placed on: {new Date(o.createdAt).toLocaleString()}
                  </small>
                </div>
                <strong>{money(o.total)}</strong>
                <span className="status">{o.status}</span>
              </div>
            ))
          ) : (
            <p className="empty-message">No orders yet. Add items to your cart to get started!</p>
          )}
        </section>
      )}

      {/* Universal Store Footer */}
      {!isAdminRoute && !isAuthRoute && <Footer />}

      {/* Toast Notification */}
      {notice && (
        <div className="toast" onClick={() => setNotice("")}>
          <IconCheck size={18} /> {notice} <span className="toast-close">✕</span>
        </div>
      )}

      {/* Universal Cart Drawer with Product Images */}
      {showCart && (
        <div className="drawer-backdrop" onClick={() => setShowCart(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <h2>
                <IconCart size={22} /> Your Cart ({cart.reduce((s, x) => s + x.qty, 0)})
              </h2>
              <button onClick={() => setShowCart(false)} aria-label="Close cart">
                <IconClose size={20} />
              </button>
            </div>

            {cart.length ? (
              <div className="cart-items-scroll">
                {cart.map((x) => (
                  <div className="cart-row" key={x.id}>
                    {x.image ? (
                      <img src={x.image} alt={x.name} className="cart-thumb" />
                    ) : (
                      <span className="cart-emoji">{x.emoji || "🛒"}</span>
                    )}
                    <div className="cart-desc">
                      <b>{x.name}</b>
                      <small>{money(x.price)} each</small>
                      <div className="qty">
                        <button onClick={() => updateQty(x.id, x.qty - 1)} aria-label="Decrease">
                          <IconMinus size={13} />
                        </button>
                        <span>{x.qty}</span>
                        <button onClick={() => updateQty(x.id, x.qty + 1)} aria-label="Increase">
                          <IconPlus size={13} />
                        </button>
                        <button
                          className="remove"
                          onClick={() => setCart((c) => c.filter((y) => y.id !== x.id))}
                          title="Remove item"
                        >
                          <IconTrash size={14} /> Remove
                        </button>
                      </div>
                    </div>
                    <strong>{money(x.price * x.qty)}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty">Your cart is currently empty.</p>
            )}

            <div className="cart-total">
              <p>
                Subtotal <b>{money(subtotal)}</b>
              </p>
              {discount > 0 && (
                <p className="discount-line">
                  Discount (10% off ₹500+) <b>-{money(discount)}</b>
                </p>
              )}

              {/* ── Coupon Code Section ── */}
              <div className="coupon-wrap">
                {couponResult?.valid ? (
                  <div className="coupon-applied">
                    <span>🏷️ <b>{couponCode.trim().toUpperCase()}</b> applied — {couponResult.desc}</span>
                    <button type="button" className="coupon-remove" onClick={handleRemoveCoupon} title="Remove coupon">✕</button>
                  </div>
                ) : (
                  <div className="coupon-row">
                    <input
                      className="coupon-input"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value); setCouponResult(null); }}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleApplyCoupon())}
                    />
                    <button type="button" className="coupon-btn" onClick={handleApplyCoupon} disabled={!couponCode.trim()}>
                      Apply
                    </button>
                  </div>
                )}
                {couponResult && !couponResult.valid && (
                  <p className="coupon-error">❌ {couponResult.error}</p>
                )}
                {couponResult?.valid && (
                  <p className="coupon-saving">✅ You save {money(couponResult.saving)} with this coupon!</p>
                )}
              </div>

              {couponSaving > 0 && (
                <p className="discount-line">
                  Coupon ({couponCode.trim().toUpperCase()}) <b>-{money(couponSaving)}</b>
                </p>
              )}

              <h3>
                Total <b>{money(total)}</b>
              </h3>
              <button
                className="primary-btn full"
                disabled={!cart.length}
                onClick={() => {
                  setShowCart(false);
                  setCheckout(true);
                }}
              >
                Proceed to checkout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Universal Checkout Modal */}
      {checkout && (
        <div className="modal-backdrop">
          <form className="checkout-modal" onSubmit={placeOrder}>
            <div className="drawer-head">
              <h2>Checkout & Delivery</h2>
              <button type="button" onClick={() => setCheckout(false)}>
                <IconClose size={20} />
              </button>
            </div>
            <div className="checkout-grid">
              {[
                ["name", "Full name"],
                ["phone", "Phone number"],
                ["address", "Delivery address"],
                ["city", "City"],
                ["pincode", "Pincode"],
              ].map(([key, label]) => (
                <input
                  key={key}
                  required
                  placeholder={label}
                  value={details[key]}
                  onChange={(e) => setDetails({ ...details, [key]: e.target.value })}
                />
              ))}
            </div>
            <label>
              Delivery slot
              <select value={details.slot} onChange={(e) => setDetails({ ...details, slot: e.target.value })}>
                {["10 AM – 12 PM", "12 PM – 2 PM", "4 PM – 6 PM", "6 PM – 8 PM"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Payment method
              <select value={details.payment} onChange={(e) => setDetails({ ...details, payment: e.target.value })}>
                {["Cash on Delivery", "UPI", "Card"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <div className="checkout-summary">
              <p>Subtotal: <b>{money(subtotal)}</b></p>
              {discount > 0 && <p className="discount-line">Bulk discount (10%): <b>-{money(discount)}</b></p>}
              {couponSaving > 0 && (
                <p className="discount-line">
                  Coupon ({couponCode.trim().toUpperCase()}): <b>-{money(couponSaving)}</b>
                </p>
              )}
              <h3>Order total: {money(total)}</h3>
              <small>Includes all taxes and free campus delivery</small>
            </div>
            <button className="primary-btn full" disabled={placing}>
              {placing ? "Placing order..." : "Confirm & Place Order"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
