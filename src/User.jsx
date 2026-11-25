import React, { useEffect, useMemo, useState } from "react";
import { Header, ProductCard, ProductThumb, statusTone, useStored } from "./Shared";
import { categories, categoryMeta, money, CHECKOUT_COUPONS, computeCouponSavings } from "./data";
import { logout } from "./auth";

const CART = "klu_cart";
const WISH = "klu_wishlist";

export default function User({ user, products, setProducts, orders, setOrders }) {
  const [cart, setCart] = useStored(CART, []);
  const [wishlist, setWishlist] = useStored(WISH, []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [wishOnly, setWishOnly] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [inspected, setInspected] = useState(null);
  const [details, setDetails] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "Vijayawada",
    pincode: "522502",
    slot: "10 AM – 12 PM",
    payment: "Cash on Delivery"
  });
  const [notice, setNotice] = useState("");
  const [showOrders, setShowOrders] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState(null);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3200);
    return () => clearTimeout(timer);
  }, [notice]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach(c => {
      counts[c] = 0;
    });
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter(p => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q));
      const matchesCat = category === "all" || p.category === category;
      const matchesWish = !wishOnly || wishlist.includes(p.id);
      return matchesQuery && matchesCat && matchesWish;
    });
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === "discount") list = [...list].sort((a, b) => (b.original - b.price) - (a.original - a.price));
    return list;
  }, [products, search, category, sort, wishOnly, wishlist]);

  const cartQtyMap = useMemo(() => {
    const map = {};
    cart.forEach(item => {
      map[item.id] = item.qty;
    });
    return map;
  }, [cart]);

  const cartRecommendations = useMemo(() => {
    const inCart = new Set(cart.map(c => c.id));
    return products
      .filter(p => p.stock > 0 && !inCart.has(p.id) && p.price <= 125)
      .slice(0, 3);
  }, [products, cart]);

  function selectCategory(cat) {
    setCategory(cat);
    setWishOnly(false);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  }

  function add(product) {
    setCart(old => {
      const found = old.find(x => x.id === product.id);
      if (found) return old.map(x => (x.id === product.id ? { ...x, qty: Math.min(x.qty + 1, product.stock) } : x));
      return [...old, { ...product, qty: 1 }];
    });
    setNotice(`${product.name} added to cart`);
  }

  function toggleWish(id) {
    setWishlist(old => (old.includes(id) ? old.filter(x => x !== id) : [...old, id]));
  }

  function updateQty(id, qty) {
    setCart(old => old.map(x => (x.id === id ? { ...x, qty: Math.max(1, Math.min(Number(qty), x.stock)) } : x)));
  }

  function removeFromCart(id) {
    setCart(old => old.filter(x => x.id !== id));
  }

  const subtotal = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  const discount = subtotal >= 500 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;
  const couponDiscount = computeCouponSavings(appliedCoupon, subtotal, total);
  const checkoutTotal = Math.max(0, total - couponDiscount);
  const remainingForDiscount = Math.max(0, 500 - subtotal);
  const discountProgress = Math.min(100, Math.round((subtotal / 500) * 100));

  // Auto-remove coupon if cart drops below minimum
  useEffect(() => {
    if (appliedCoupon && subtotal < appliedCoupon.minOrder) {
      setAppliedCoupon(null);
      setCouponMsg({ type: "error", text: `${appliedCoupon.code} removed (requires minimum ₹${appliedCoupon.minOrder}).` });
    }
  }, [appliedCoupon, subtotal]);

  function applyCouponCode(codeArg) {
    const code = (codeArg || couponInput).trim().toUpperCase();
    if (!code) return;
    const found = CHECKOUT_COUPONS[code];
    if (!found) {
      setCouponMsg({ type: "error", text: `"${code}" is not a valid coupon code.` });
      return;
    }
    if (subtotal < found.minOrder) {
      setCouponMsg({ type: "error", text: `${code} requires a minimum subtotal of ₹${found.minOrder}.` });
      return;
    }
    setAppliedCoupon(found);
    setCouponInput(code);
    setCouponMsg({ type: "success", text: `✅ ${code} applied — saving ${money(computeCouponSavings(found, subtotal, total))}!` });
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMsg(null);
  }

  function placeOrder(e) {
    e.preventDefault();
    if (!user) {
      window.location.href = "/login";
      return;
    }
    if (!cart.length) return;
    const order = {
      id: "KLF" + Date.now().toString().slice(-8),
      userId: user.id,
      customerName: details.name,
      customerEmail: user.email,
      phone: details.phone,
      address: details.address,
      city: details.city,
      pincode: details.pincode,
      slot: details.slot,
      paymentMethod: details.payment,
      items: cart.map(x => ({ id: x.id, name: x.name, qty: x.qty, price: x.price, emoji: x.emoji })),
      subtotal,
      discount,
      couponCode: appliedCoupon?.code || null,
      couponDiscount,
      total: checkoutTotal,
      status: "Placed",
      createdAt: new Date().toISOString()
    };
    setOrders([order, ...orders]);
    setProducts(old =>
      old.map(p => {
        const item = cart.find(c => c.id === p.id);
        return item ? { ...p, stock: Math.max(0, p.stock - item.qty) } : p;
      })
    );
    setCart([]);
    setCheckout(false);
    setShowCart(false);
    setNotice(`Order ${order.id} placed successfully!`);
    removeCoupon();
  }

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setSort("default");
    setWishOnly(false);
  }

  const myOrders = orders.filter(o => o.userId === user?.id);
  const totalCartItems = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <>
      <Header
        user={user}
        onLogout={() => {
          logout();
          window.location.href = "/";
        }}
        cartCount={totalCartItems}
        wishCount={wishlist.length}
        onOpenCart={() => setShowCart(true)}
        onToggleWishlist={() => {
          setWishOnly(prev => !prev);
          document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
        }}
        wishActive={wishOnly}
      />

      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">⚡ EXPRESS CAMPUS &amp; CITY DELIVERY</span>
            <h1>
              Fresh groceries,
              <br />
              delivered smarter.
            </h1>
            <p>
              Shop handpicked produce, chilled dairy, bakery bakes, high-protein staples, and everyday home essentials
              with transparent pricing and 15-minute doorstep delivery.
            </p>
            <div className="hero-cta">
              <a className="primary-btn hero-primary" href="#products">
                Explore Catalog
              </a>
              <button
                type="button"
                className="hero-secondary"
                onClick={() => {
                  setSort("discount");
                  setCategory("all");
                  setWishOnly(false);
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Top Deals
              </button>
            </div>
            <div className="hero-stats">
              <span>
                <b>15 min</b>Express delivery
              </span>
              <span>
                <b>{products.length}+</b>Curated essentials
              </span>
              <span>
                <b>10% OFF</b>Orders ₹500+
              </span>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-showcase">
              <div className="showcase-head">
                <span className="showcase-dot" />
                <span>Jump to Category</span>
                <span className="showcase-badge">UP TO 30% OFF</span>
              </div>
              <div className="showcase-grid">
                {[
                  ["/images/products/p-23.jpg", "🥑", "Produce", "Fruits & Vegetables"],
                  ["/images/products/p-6.jpg", "🥛", "Dairy", "Dairy"],
                  ["/images/products/p-53.jpg", "🥐", "Bakery", "Bakery & Breakfast"],
                  ["/images/products/p-19.jpg", "💪", "Protein", "Protein"],
                  ["/images/products/p-30.jpg", "☕", "Drinks", "Beverages"],
                  ["/images/products/p-68.jpg", "🍨", "Frozen", "Frozen & Desserts"]
                ].map(([thumb, icon, label, targetCat]) => (
                  <button
                    key={label}
                    type="button"
                    className="showcase-tile"
                    onClick={() => selectCategory(targetCat)}
                  >
                    <div className="showcase-thumb">
                      <img src={thumb} alt={label} onError={e => { e.currentTarget.style.display = "none"; }} />
                      <span className="showcase-fallback" aria-hidden="true">{icon}</span>
                    </div>
                    <small>{label}</small>
                  </button>
                ))}
              </div>
              <p className="showcase-foot">Tap any category above · Quality-checked &amp; cold-chain fresh</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section categories-section" id="categories">
        <div className="section-title">
          <div>
            <span className="eyebrow">SHOP BY AISLE</span>
            <h2>Browse departments</h2>
            <p>{categories.length} curated aisles stocked daily for Vijayawada &amp; KL University</p>
          </div>
        </div>

        <div className="category-cards">
          {categories.map(cat => {
            const meta = categoryMeta[cat] || { icon: "🛒", tagline: "Daily essentials" };
            const isActive = category === cat && !wishOnly;
            return (
              <button
                type="button"
                key={cat}
                className={`dept-card ${isActive ? "dept-card-active" : ""}`}
                onClick={() => selectCategory(isActive ? "all" : cat)}
              >
                <span className="dept-icon">{meta.icon}</span>
                <div className="dept-copy">
                  <strong>{cat}</strong>
                  <small>{meta.tagline}</small>
                </div>
                <span className="dept-count">{categoryCounts[cat] || 0}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="section" id="products">
        <div className="section-title">
          <div>
            <span className="eyebrow">CURATED STOREFRONT</span>
            <h2>Fresh picks for you</h2>
            <p>
              Showing <strong>{visible.length}</strong> of {products.length} essentials across {categories.length}{" "}
              categories
            </p>
          </div>
          <div className="quick-actions">
            <button type="button" className="outline-btn" onClick={() => setShowCart(true)}>
              🛒 Cart ({totalCartItems})
            </button>
            <button
              type="button"
              className={`outline-btn ${showOrders ? "outline-active" : ""}`}
              onClick={() => setShowOrders(!showOrders)}
            >
              📦 My Orders ({myOrders.length})
            </button>
          </div>
        </div>

        <div className="category-pills" role="tablist" aria-label="Product categories">
          <button
            type="button"
            className={`cat-pill ${category === "all" && !wishOnly ? "active" : ""}`}
            onClick={() => {
              setCategory("all");
              setWishOnly(false);
            }}
          >
            All Items ({products.length})
          </button>
          {categories.map(c => (
            <button
              type="button"
              key={c}
              className={`cat-pill ${category === c ? "active" : ""}`}
              onClick={() => {
                setCategory(c);
                setWishOnly(false);
              }}
            >
              {c}
            </button>
          ))}
          {wishlist.length > 0 && (
            <button
              type="button"
              className={`cat-pill wish-pill ${wishOnly ? "active" : ""}`}
              onClick={() => setWishOnly(!wishOnly)}
            >
              ♥ Saved ({wishlist.length})
            </button>
          )}
        </div>

        <div className="filters">
          <input
            placeholder="Search mangoes, croissants, whey protein, olive oil, sunscreen..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="discount">Biggest Savings</option>
          </select>
          {(search || category !== "all" || sort !== "default" || wishOnly) && (
            <button type="button" className="outline-btn" onClick={clearFilters}>
              Reset
            </button>
          )}
        </div>

        <div className="product-grid">
          {visible.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              add={add}
              toggleWish={toggleWish}
              wished={wishlist.includes(p.id)}
              cartQty={cartQtyMap[p.id] || 0}
              onUpdateQty={updateQty}
              onRemove={removeFromCart}
              onInspect={setInspected}
            />
          ))}
        </div>
        {!visible.length && (
          <div className="empty-box">
            <p className="empty">No matching products found.</p>
            <button type="button" className="outline-btn" onClick={clearFilters}>
              Show all products
            </button>
          </div>
        )}
      </section>

      {showOrders && (
        <section className="section orders-panel">
          <div className="section-title">
            <div>
              <span className="eyebrow">ORDER HISTORY</span>
              <h2>My Orders</h2>
            </div>
          </div>
          {myOrders.length ? (
            myOrders.map(o => (
              <div className="order-row" key={o.id}>
                <div>
                  <b>#{o.id}</b>
                  <p>
                    {o.items.map(i => `${i.name} × ${i.qty}`).join(", ")} · {o.slot} · {o.paymentMethod} ·{" "}
                    {new Date(o.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-row-right">
                  <strong>{money(o.total)}</strong>
                  <span className={`status ${statusTone(o.status)}`}>{o.status}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="admin-card">
              <p className="empty">No orders yet. Add essentials to your cart to get started!</p>
            </div>
          )}
        </section>
      )}

      <section className="section about" id="about">
        <div className="section-title">
          <div>
            <span className="eyebrow">WHY KLU FRESH</span>
            <h2>Built for quality &amp; reliability</h2>
            <p>Everything students, families, and faculty need — cold-stored and delivered on schedule.</p>
          </div>
        </div>
        <div className="about-grid">
          <article>
            <span className="about-icon">❄️</span>
            <h3>Quality Checked</h3>
            <p>Every produce batch, bakery item, and dairy pack is inspected daily for freshness before dispatch.</p>
          </article>
          <article>
            <span className="about-icon">⚡</span>
            <h3>15-Min Express</h3>
            <p>Flexible campus and city delivery slots with live order tracking from warehouse to doorstep.</p>
          </article>
          <article>
            <span className="about-icon">💎</span>
            <h3>Transparent Savings</h3>
            <p>Honest everyday pricing plus an automatic 10% instant discount on every order of ₹500 and above.</p>
          </article>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">KLU Fresh</div>
            <p>Fresh groceries, dairy, bakery, and wellness essentials across Vijayawada &amp; KL University.</p>
            <div className="payment-chips">
              <span>UPI</span>
              <span>Cards</span>
              <span>Cash on Delivery</span>
            </div>
          </div>
          <div>
            <b>Popular Aisles</b>
            <div className="footer-links">
              {categories.slice(0, 5).map(cat => (
                <button key={cat} type="button" onClick={() => selectCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <b>Customer Support</b>
            <p>support@klufresh.com</p>
            <p>+91 866 245 6789</p>
            <p>Green Fields, Vaddeswaram, AP</p>
          </div>
          <div>
            <b>Delivery Hours</b>
            <p>Daily 7:00 AM – 10:00 PM</p>
            <p>15-min campus express active</p>
            <p>© 2026 KLU Fresh</p>
          </div>
        </div>
      </footer>

      {notice && (
        <div className="toast" onClick={() => setNotice("")}>
          {notice} ✕
        </div>
      )}

      {inspected && (
        <div className="modal-backdrop" onClick={() => setInspected(null)}>
          <div className="quick-modal" onClick={e => e.stopPropagation()}>
            <button type="button" className="quick-close" onClick={() => setInspected(null)} aria-label="Close">
              ✕
            </button>
            <div className="quick-media">
              <ProductThumb product={inspected} className="quick-photo" emojiClassName="quick-emoji" />
              {inspected.tag && <span className="product-tag">{inspected.tag}</span>}
            </div>
            <div className="quick-body">
              <div className="product-meta">
                <small>{inspected.category}</small>
                <span className="rating-pill">★ {inspected.rating || "4.5"} Rating</span>
              </div>
              <h2>{inspected.name}</h2>
              <p className="unit-text">Pack size: {inspected.qty}</p>
              <div className="price-line">
                <strong>{money(inspected.price)}</strong>
                {inspected.original > inspected.price && <del>{money(inspected.original)}</del>}
                {inspected.original > inspected.price && (
                  <span className="save-pill">Save {money(inspected.original - inspected.price)}</span>
                )}
              </div>
              <p className="quick-stock">
                {inspected.stock > 3
                  ? `✓ In stock (${inspected.stock} units available)`
                  : inspected.stock > 0
                    ? `⚠️ Hurry — only ${inspected.stock} left in stock`
                    : "✕ Currently out of stock"}
              </p>
              <div className="quick-actions-row">
                {cartQtyMap[inspected.id] > 0 ? (
                  <div className="card-stepper" style={{ flex: 1 }}>
                    <button
                      type="button"
                      onClick={() =>
                        cartQtyMap[inspected.id] <= 1
                          ? removeFromCart(inspected.id)
                          : updateQty(inspected.id, cartQtyMap[inspected.id] - 1)
                      }
                    >
                      −
                    </button>
                    <span>{cartQtyMap[inspected.id]} in cart</span>
                    <button
                      type="button"
                      disabled={cartQtyMap[inspected.id] >= inspected.stock}
                      onClick={() => updateQty(inspected.id, cartQtyMap[inspected.id] + 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="primary-btn"
                    style={{ flex: 1 }}
                    disabled={inspected.stock <= 0}
                    onClick={() => add(inspected)}
                  >
                    {inspected.stock <= 0 ? "Out of stock" : "+ Add to cart"}
                  </button>
                )}
                <button
                  type="button"
                  className={`outline-btn ${wishlist.includes(inspected.id) ? "outline-active" : ""}`}
                  onClick={() => toggleWish(inspected.id)}
                >
                  {wishlist.includes(inspected.id) ? "♥ Saved" : "♡ Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="drawer-backdrop" onClick={() => setShowCart(false)}>
          <aside className="drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-head">
              <h2>Your Cart ({totalCartItems})</h2>
              <button type="button" onClick={() => setShowCart(false)}>
                ✕
              </button>
            </div>

            {cart.length > 0 && (
              <div className="promo-banner">
                <p>
                  {remainingForDiscount > 0
                    ? `Add ${money(remainingForDiscount)} more to unlock 10% instant discount!`
                    : "🎉 10% instant savings unlocked on this order!"}
                </p>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${discountProgress}%` }} />
                </div>
              </div>
            )}

            <div className="drawer-items">
              {cart.length ? (
                <>
                  {cart.map(x => (
                    <div className="cart-row" key={x.id}>
                      <div className="cart-thumb-wrap">
                        <ProductThumb product={x} className="cart-thumb" emojiClassName="cart-emoji" />
                      </div>
                      <div className="cart-desc">
                        <b>{x.name}</b>
                        <small>{money(x.price)} each</small>
                        <div className="qty">
                          <button
                            type="button"
                            onClick={() => (x.qty <= 1 ? removeFromCart(x.id) : updateQty(x.id, x.qty - 1))}
                          >
                            −
                          </button>
                          <span>{x.qty}</span>
                          <button type="button" onClick={() => updateQty(x.id, x.qty + 1)}>
                            +
                          </button>
                          <button type="button" className="remove" onClick={() => removeFromCart(x.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <b>{money(x.price * x.qty)}</b>
                    </div>
                  ))}

                  {cartRecommendations.length > 0 && (
                    <div className="cart-addons">
                      <small className="eyebrow">QUICK ADD-ONS</small>
                      <div className="addon-list">
                        {cartRecommendations.map(rec => (
                          <div className="addon-chip" key={rec.id}>
                            <div className="addon-thumb-wrap">
                              <ProductThumb product={rec} className="addon-thumb" emojiClassName="addon-emoji" />
                            </div>
                            <div>
                              <b>{rec.name}</b>
                              <small>{money(rec.price)}</small>
                            </div>
                            <button type="button" onClick={() => add(rec)}>
                              + Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-box" style={{ marginTop: 20 }}>
                  <p className="empty">Your cart is empty.</p>
                  <button type="button" className="outline-btn" onClick={() => setShowCart(false)}>
                    Browse groceries
                  </button>
                </div>
              )}
            </div>

            <div className="cart-total">
              <p>
                Subtotal <b>{money(subtotal)}</b>
              </p>
              <p>
                Order Discount (10% on ₹500+) <b className="savings">-{money(discount)}</b>
              </p>

              {/* ── Coupon Code ── */}
              <div className="coupon-wrap">
                {appliedCoupon ? (
                  <div className="coupon-applied">
                    <span>🏷️ <b>{appliedCoupon.code}</b> — {appliedCoupon.label}</span>
                    <button type="button" className="coupon-remove" onClick={removeCoupon}>✕</button>
                  </div>
                ) : (
                  <div className="coupon-row">
                    <input
                      className="coupon-input"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponMsg(null); }}
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), applyCouponCode())}
                    />
                    <button type="button" className="coupon-btn" onClick={() => applyCouponCode()} disabled={!couponInput.trim()}>
                      Apply
                    </button>
                  </div>
                )}
                {couponMsg && (
                  <p className={`coupon-msg ${couponMsg.type === "error" ? "coupon-err" : "coupon-ok"}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {couponDiscount > 0 && (
                <p>Coupon ({appliedCoupon.code}) <b className="savings">-{money(couponDiscount)}</b></p>
              )}
              <h3>
                Total <b>{money(checkoutTotal)}</b>
              </h3>
              <button
                type="button"
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

      {checkout && (
        <div className="modal-backdrop">
          <form className="checkout-modal" onSubmit={placeOrder}>
            <div className="drawer-head">
              <h2>Checkout</h2>
              <button type="button" onClick={() => setCheckout(false)}>
                ✕
              </button>
            </div>
            <div className="checkout-grid">
              {[
                ["name", "Full name"],
                ["phone", "Phone number"],
                ["address", "Delivery address"],
                ["city", "City"],
                ["pincode", "Pincode"]
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
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Payment method
              <select value={details.payment} onChange={e => setDetails({ ...details, payment: e.target.value })}>
                {["Cash on Delivery", "UPI", "Card"].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            {/* Coupon Code Section */}
            <div className="checkout-coupon-box">
              <div className="coupon-row">
                <input
                  type="text"
                  placeholder="Enter coupon code (e.g. KLU10)"
                  value={couponInput}
                  onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponMsg(null); }}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); applyCouponCode(); } }}
                />
                {appliedCoupon ? (
                  <button type="button" className="outline-btn" onClick={removeCoupon}>Remove</button>
                ) : (
                  <button type="button" className="outline-btn" onClick={() => applyCouponCode()}>Apply</button>
                )}
              </div>
              {couponMsg && (
                <p className={`coupon-msg ${couponMsg.type === "error" ? "coupon-err" : "coupon-ok"}`}>
                  {couponMsg.text}
                </p>
              )}
              <div className="coupon-chips">
                {Object.values(CHECKOUT_COUPONS).map(c => {
                  const eligible = subtotal >= c.minOrder;
                  const active = appliedCoupon?.code === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      disabled={!eligible}
                      className={`coupon-chip${active ? " coupon-chip-active" : ""}`}
                      onClick={() => applyCouponCode(c.code)}
                      title={c.label}
                    >
                      <b>{c.code}</b>
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="checkout-summary">
              <p>Subtotal <span>{money(subtotal)}</span></p>
              {discount > 0 && <p>Order Discount (10% on ₹500+) <span className="savings">-{money(discount)}</span></p>}
              {couponDiscount > 0 && <p>Coupon ({appliedCoupon.code}) <span className="savings">-{money(couponDiscount)}</span></p>}
              <h3>Order total: <span>{money(checkoutTotal)}</span></h3>
            </div>

            <button className="primary-btn full" type="submit">
              Place order
            </button>
          </form>
        </div>
      )}
    </>
  );
}
