import React, { useMemo, useState } from "react";
import { Header, ProductCard, useStored } from "./Shared";
import { categories, money, applyCoupon } from "./data";
import { logout } from "./auth";
import {
  IconCart,
  IconHeart,
  IconStar,
  IconTruck,
  IconClock,
  IconShieldCheck,
  IconTag,
  IconLeaf,
  IconClose,
  IconPlus,
  IconMinus,
  IconTrash,
  IconCheck,
} from "./Icons";

const CART = "klu_cart", WISH = "klu_wishlist";

export default function User({ user, products, setProducts, orders, setOrders }) {
  const [cart, setCart] = useStored(CART, []);
  const [wishlist, setWishlist] = useStored(WISH, []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [details, setDetails] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "Vijayawada",
    pincode: "522502",
    slot: "10 AM – 12 PM",
    payment: "Cash on Delivery",
  });
  const [notice, setNotice] = useState("");
  const [showOrders, setShowOrders] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState(null);

  const visible = useMemo(() => {
    let list = products.filter(
      p => p.name.toLowerCase().includes(search.toLowerCase()) && (category === "all" || p.category === category)
    );
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === "discount") list.sort((a, b) => (b.original - b.price) - (a.original - a.price));
    return list;
  }, [products, search, category, sort]);

  function add(product) {
    setCart(old => {
      const found = old.find(x => x.id === product.id);
      if (found) return old.map(x => x.id === product.id ? { ...x, qty: Math.min(x.qty + 1, product.stock) } : x);
      return [...old, { ...product, qty: 1 }];
    });
    setNotice(`${product.name} added to cart!`);
  }

  function toggleWish(id) {
    setWishlist(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  }

  function updateQty(id, qty) {
    setCart(old => old.map(x => x.id === id ? { ...x, qty: Math.max(1, Math.min(Number(qty), x.stock)) } : x));
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
      items: cart.map(x => ({
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

    setOrders(old => [order, ...old]);
    setProducts(old => old.map(p => {
      const item = cart.find(c => c.id === p.id);
      return item ? { ...p, stock: Math.max(0, p.stock - item.qty) } : p;
    }));
    setNotice(`Order #${order.id} placed successfully!`);
    setPlacing(false);
    setCart([]);
    setCheckout(false);
    setShowCart(false);
    setCouponCode("");
    setCouponResult(null);
  }

  const myOrders = orders.filter(o => o.userId === user?.id);

  return (
    <>
      <Header
        user={user}
        onLogout={() => { logout(); window.location.href = "/"; }}
        cartCount={cart.reduce((s, x) => s + x.qty, 0)}
        wishCount={wishlist.length}
      />

      {/* Professional Hero Banner */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-pill">
            <IconLeaf size={16} /> FRESHNESS AT YOUR DOORSTEP
          </div>
          <h1>
            Fresh groceries,
            <br />
            delivered to your doorstep.
          </h1>
          <p>
            Experience hand-picked farm essentials, everyday groceries, and instant 15-minute campus delivery with KLU Fresh.
          </p>
          <div className="hero-btn-row">
            <a className="primary-btn hero-cta" href="#products">
              <IconCart size={18} /> Shop now
            </a>
            <a className="outline-btn hero-sec-cta" href="#about">
              Learn more →
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="stat-circle"><IconClock size={18} /></span>
              <div>
                <b>15 min</b>
                <small>Express delivery</small>
              </div>
            </div>
            <div className="hero-stat-item">
              <span className="stat-circle"><IconShieldCheck size={18} /></span>
              <div>
                <b>200+</b>
                <small>Quality essentials</small>
              </div>
            </div>
            <div className="hero-stat-item">
              <span className="stat-circle"><IconStar size={18} /></span>
              <div>
                <b>4.8★</b>
                <small>Campus rating</small>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Hero Card with Photography */}
        <div className="hero-visual">
          <div className="hero-img-card">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Fresh organic grocery basket"
              className="hero-main-img"
            />
            <div className="hero-floating-badge badge-top">
              <span className="badge-icon-box"><IconStar size={16} /></span>
              <div>
                <strong>4.9 / 5 Rating</strong>
                <small>1,200+ Verified Orders</small>
              </div>
            </div>

            <div className="hero-floating-badge badge-bottom">
              <span className="badge-icon-box"><IconTruck size={18} /></span>
              <div>
                <strong>Express Delivery</strong>
                <small>Direct to hostel or home</small>
              </div>
            </div>

            <div className="hero-discount-tag">
              <small>SPECIAL OFFER</small>
              <strong>UP TO 30% OFF</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="section" id="products">
        <div className="section-title">
          <div>
            <span className="eyebrow">OUR STORE</span>
            <h2>Fresh picks for you</h2>
            <p>Quality groceries with instant local cart &amp; order tracking</p>
          </div>
          <div className="quick-actions">
            <button className="outline-btn" onClick={() => setShowCart(true)}>
              <IconCart size={16} /> Cart ({cart.length})
            </button>
            <button className="outline-btn" onClick={() => setShowOrders(!showOrders)}>
              <IconTag size={16} /> My Orders ({myOrders.length})
            </button>
          </div>
        </div>

        <div className="filters">
          <div className="search-wrap">
            <input
              placeholder="Search fresh groceries, dairy, snacks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>

        <div className="product-grid">
          {visible.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              add={add}
              toggleWish={toggleWish}
              wished={wishlist.includes(p.id)}
            />
          ))}
        </div>
        {!visible.length && <p className="empty">No products match your search or filter.</p>}
      </section>

      {/* Customer Orders History */}
      {showOrders && (
        <section className="section orders-panel">
          <div className="section-title">
            <div>
              <span className="eyebrow">ORDER TRACKING</span>
              <h2>My Orders ({myOrders.length})</h2>
            </div>
          </div>
          {myOrders.length ? (
            myOrders.map(o => (
              <div className="order-row" key={o.id}>
                <div>
                  <span className="order-id-badge">#{o.id}</span>
                  <p>{o.items.map(i => `${i.name} × ${i.qty}`).join(", ")}</p>
                  <small style={{ color: "var(--muted)" }}>Placed on: {new Date(o.createdAt).toLocaleString()}</small>
                </div>
                <strong>{money(o.total)}</strong>
                <span className="status">{o.status}</span>
              </div>
            ))
          ) : (
            <p className="empty">No orders found. Add items to your cart to get started!</p>
          )}
        </section>
      )}

      {/* About / Value Proposition */}
      <section className="section about" id="about">
        <div className="section-title">
          <div>
            <span className="eyebrow">WHY KLU FRESH</span>
            <h2>Shopping made simple & dependable</h2>
          </div>
        </div>
        <div className="about-grid">
          <article>
            <div className="feature-icon"><IconLeaf size={28} /></div>
            <h3>Farm fresh daily</h3>
            <p>100% inspected fresh produce sourced straight from trusted regional farmers and certified suppliers.</p>
          </article>
          <article>
            <div className="feature-icon"><IconTruck size={28} /></div>
            <h3>15-min campus express</h3>
            <p>Scheduled and lightning-fast delivery slots across KL University campus and Vijayawada neighborhoods.</p>
          </article>
          <article>
            <div className="feature-icon"><IconTag size={28} /></div>
            <h3>Honest transparent prices</h3>
            <p>Pocket-friendly pricing, special student deals, and 10% instant discounts on orders over ₹500.</p>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div>
          <div className="brand" style={{ color: "#ffffff", marginBottom: 10 }}>
            🌿 KLU <span>Fresh</span>
          </div>
          <p>Delivering fresh, wholesome essentials across Vijayawada & KL University.</p>
        </div>
        <div>
          <b>Customer Support</b>
          <p>support@klufresh.com</p>
          <p>+91 866 245 6789</p>
        </div>
        <div>
          <b>Store Technology</b>
          <p>React + Vite + LocalStorage</p>
          <small>© 2026 KLU Fresh. All rights reserved.</small>
        </div>
      </footer>

      {/* Toast Notification */}
      {notice && (
        <div className="toast" onClick={() => setNotice("")}>
          <IconCheck size={18} /> {notice} <span className="toast-close">✕</span>
        </div>
      )}

      {/* Cart Drawer with Product Images */}
      {showCart && (
        <div className="drawer-backdrop" onClick={() => setShowCart(false)}>
          <aside className="drawer" onClick={e => e.stopPropagation()}>
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
                {cart.map(x => (
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
                          onClick={() => setCart(c => c.filter(y => y.id !== x.id))}
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
              <p>Subtotal <b>{money(subtotal)}</b></p>
              {discount > 0 && <p className="discount-line">Discount (10% off ₹500+) <b>-{money(discount)}</b></p>}

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
                <p className="discount-line">Coupon ({couponCode.trim().toUpperCase()}) <b>-{money(couponSaving)}</b></p>
              )}

              <h3>Total <b>{money(total)}</b></h3>
              <button
                className="primary-btn full"
                disabled={!cart.length}
                onClick={() => { setShowCart(false); setCheckout(true); }}
              >
                Proceed to checkout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Checkout Modal */}
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
                  onChange={e => setDetails({ ...details, [key]: e.target.value })}
                />
              ))}
            </div>
            <label>
              Delivery slot
              <select value={details.slot} onChange={e => setDetails({ ...details, slot: e.target.value })}>
                {["10 AM – 12 PM", "12 PM – 2 PM", "4 PM – 6 PM", "6 PM – 8 PM"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Payment method
              <select value={details.payment} onChange={e => setDetails({ ...details, payment: e.target.value })}>
                {["Cash on Delivery", "UPI", "Card"].map(s => (
                  <option key={s} value={s}>{s}</option>
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
    </>
  );
}
