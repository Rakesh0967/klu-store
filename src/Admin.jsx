import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Stat, OrdersTable } from "./Shared";
import { categories, money, COUPONS } from "./data";
import { getUsers, logout } from "./auth";
import {
  IconTrendingUp,
  IconPackage,
  IconClipboard,
  IconUsers,
  IconAlertTriangle,
  IconPlus,
  IconSearch,
} from "./Icons";

export default function Admin({ user, products, setProducts, orders, setOrders }) {
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: categories[0],
    qty: "1 kg",
    price: "",
    original: "",
    stock: "",
    image: "",
    emoji: "🛒",
  });
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsersList(getUsers());
  }, [tab]);

  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + (o.total || 0), 0);
  const low = products.filter((p) => p.stock <= 3).length;

  function saveProduct(e) {
    e.preventDefault();
    setLoading(true);
    const itemData = {
      name: form.name,
      category: form.category,
      qty: form.qty,
      price: Number(form.price),
      original: Number(form.original || form.price),
      stock: Number(form.stock),
      image: form.image || "",
      emoji: form.emoji || "🛒",
      rating: editing?.rating || 4.5,
    };

    if (editing) {
      setProducts((old) => old.map((p) => (p.id === editing.id ? { ...itemData, id: editing.id } : p)));
    } else {
      const newItem = { ...itemData, id: Date.now() };
      setProducts((old) => [newItem, ...old]);
    }

    setLoading(false);
    setEditing(null);
    setForm({
      name: "",
      category: categories[0],
      qty: "1 kg",
      price: "",
      original: "",
      stock: "",
      image: "",
      emoji: "🛒",
    });
  }

  function edit(p) {
    setEditing(p);
    setForm({
      ...p,
      price: String(p.price),
      original: String(p.original),
      stock: String(p.stock),
      image: p.image || "",
    });
  }

  function remove(id) {
    if (!window.confirm("Delete this product?")) return;
    setProducts((old) => old.filter((p) => p.id !== id));
  }

  function adjustStock(p, amount) {
    setProducts((old) => old.map((x) => (x.id === p.id ? { ...x, stock: Math.max(0, x.stock + amount) } : x)));
  }

  function changeStatus(id, status) {
    setOrders((old) => old.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  const filtered = products.filter(
    (p) =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "all" || p.category === filter)
  );

  return (
    <>
      <Header
        user={user}
        onLogout={() => {
          logout();
          window.location.href = "/";
        }}
        cartCount={0}
        wishCount={0}
      />
      <div className="admin-layout">
        <aside className="admin-side">
          <h2>Store Admin</h2>
          {[
            ["dashboard", "Dashboard", <IconTrendingUp key="d" size={18} />],
            ["products", "Products", <IconPackage key="p" size={18} />],
            ["orders", "Orders", <IconClipboard key="o" size={18} />],
            ["users", "Users", <IconUsers key="u" size={18} />],
            ["coupons", "Coupons 🏷️", <IconAlertTriangle key="c" size={18} />],
          ].map(([id, label, icon]) => (
            <button
              key={id}
              className={tab === id ? "active" : ""}
              onClick={() => {
                setTab(id);
                setEditing(null);
              }}
            >
              {icon} {label}
            </button>
          ))}
          <Link to="/">← View storefront</Link>
        </aside>

        <main className="admin-main">
          {tab === "dashboard" && (
            <>
              <div className="section-title">
                <div>
                  <span className="eyebrow">STORE MANAGEMENT</span>
                  <h1>Dashboard overview</h1>
                  <p>Welcome back, {user.name} · Store management dashboard</p>
                </div>
                <button
                  className="primary-btn"
                  onClick={() => {
                    setTab("products");
                    setEditing(false);
                  }}
                >
                  <IconPlus size={16} /> Add product
                </button>
              </div>

              <div className="stats-grid">
                <Stat
                  label="Total revenue"
                  value={money(revenue)}
                  icon={<IconTrendingUp size={22} />}
                  variant="green"
                />
                <Stat
                  label="Total orders"
                  value={orders.length}
                  icon={<IconClipboard size={22} />}
                  variant="blue"
                />
                <Stat
                  label="Products"
                  value={products.length}
                  icon={<IconPackage size={22} />}
                  variant="indigo"
                />
                <Stat
                  label="Registered users"
                  value={usersList.length}
                  icon={<IconUsers size={22} />}
                  variant="purple"
                />
                <Stat
                  label="Low stock items"
                  value={low}
                  icon={<IconAlertTriangle size={22} />}
                  variant="amber"
                />
              </div>

              <div className="admin-card">
                <h2>Recent customer orders</h2>
                <OrdersTable orders={orders.slice(0, 5)} changeStatus={changeStatus} />
              </div>
            </>
          )}

          {tab === "products" && (
            <>
              <div className="section-title">
                <div>
                  <span className="eyebrow">INVENTORY</span>
                  <h1>Product catalog</h1>
                  <p>Add, edit, delete products and adjust stock levels.</p>
                </div>
                <button
                  className="primary-btn"
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      name: "",
                      category: categories[0],
                      qty: "1 kg",
                      price: "",
                      original: "",
                      stock: "",
                      image: "",
                      emoji: "🛒",
                    });
                  }}
                >
                  <IconPlus size={16} /> Add product
                </button>
              </div>

              {editing !== null && (
                <form className="product-form admin-card" onSubmit={saveProduct}>
                  <h2>{editing ? "Edit product" : "Add new product"}</h2>
                  <div className="form-grid">
                    <input
                      required
                      placeholder="Product name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <input
                      required
                      placeholder="Unit / quantity (e.g. 1 kg, 500 g)"
                      value={form.qty}
                      onChange={(e) => setForm({ ...form, qty: e.target.value })}
                    />
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="Selling price (₹)"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                    <input
                      type="number"
                      min="1"
                      placeholder="Original price (₹)"
                      value={form.original}
                      onChange={(e) => setForm({ ...form, original: e.target.value })}
                    />
                    <input
                      required
                      type="number"
                      min="0"
                      placeholder="Stock units"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    />
                    <input
                      placeholder="Image URL (Unsplash or direct image link)"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />
                    <input
                      placeholder="Fallback emoji (e.g. 🍎)"
                      value={form.emoji}
                      onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                    />
                  </div>

                  {form.image && (
                    <div className="form-img-preview">
                      <small>Image preview:</small>
                      <img src={form.image} alt="Preview" className="preview-thumb" />
                    </div>
                  )}

                  <div className="form-actions">
                    <button className="primary-btn" disabled={loading}>
                      {loading ? "Saving..." : "Save product"}
                    </button>
                    <button type="button" className="outline-btn" onClick={() => setEditing(null)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="admin-card">
                <div className="filters">
                  <input
                    placeholder="Search products by name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((p) => (
                        <tr key={p.id}>
                          <td>
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="table-thumb" />
                            ) : (
                              <span className="table-emoji">{p.emoji || "🛒"}</span>
                            )}
                          </td>
                          <td>
                            <b>{p.name}</b>
                            <small className="block">{p.qty}</small>
                          </td>
                          <td>
                            <span className="category-pill">{p.category}</span>
                          </td>
                          <td>
                            <b>{money(p.price)}</b>
                          </td>
                          <td>
                            <span className={p.stock <= 3 ? "low-stock" : "status"}>
                              {p.stock} units
                            </span>
                          </td>
                          <td>
                            <button
                              className="table-btn"
                              title="Add 5 units to stock"
                              onClick={() => adjustStock(p, 5)}
                            >
                              +5 Stock
                            </button>{" "}
                            <button className="table-btn" onClick={() => edit(p)}>
                              Edit
                            </button>{" "}
                            <button
                              className="table-btn danger"
                              onClick={() => remove(p.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!filtered.length && <p className="empty-message">No matching products found.</p>}
                </div>
              </div>
            </>
          )}

          {tab === "orders" && (
            <>
              <div className="section-title">
                <div>
                  <span className="eyebrow">FULFILLMENT</span>
                  <h1>Customer orders</h1>
                  <p>Track, manage, and update live order delivery status.</p>
                </div>
              </div>
              <div className="admin-card">
                <OrdersTable orders={orders} changeStatus={changeStatus} detailed />
              </div>
            </>
          )}

          {tab === "users" && (
            <>
              <div className="section-title">
                <div>
                  <span className="eyebrow">ACCOUNTS</span>
                  <h1>Registered users</h1>
                  <p>Customer accounts stored in browser localStorage.</p>
                </div>
              </div>
              <div className="admin-card table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Registered on</th>
                      <th>Total Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <b>{u.name}</b>
                        </td>
                        <td>{u.email}</td>
                        <td>
                          <span className="user-role-badge">{u.role}</span>
                        </td>
                        <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Demo User"}</td>
                        <td>
                          <b>{orders.filter((o) => o.userId === u.id).length}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!usersList.length && (
                  <p className="empty-message">No registered customers found in database.</p>
                )}
              </div>
            </>
          )}
          {tab === "coupons" && (
            <>
              <div className="section-title">
                <div>
                  <span className="eyebrow">PROMOTIONS</span>
                  <h1>Coupon Codes</h1>
                  <p>Active discount codes customers can apply at checkout.</p>
                </div>
              </div>
              <div className="admin-card table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Discount</th>
                      <th>Min. Order</th>
                      <th>Description</th>
                      <th>Usage in Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(COUPONS).map(([code, c]) => {
                      const usageCount = orders.filter(o => o.couponCode === code).length;
                      const totalSaved = orders.filter(o => o.couponCode === code).reduce((s, o) => s + (o.couponSaving || 0), 0);
                      return (
                        <tr key={code}>
                          <td><span style={{background:"#eff6ff",color:"#1d4ed8",border:"1px solid #bfdbfe",borderRadius:6,padding:"3px 10px",fontWeight:700,fontSize:"0.85rem",letterSpacing:"0.05em"}}>🏷️ {code}</span></td>
                          <td><span style={{textTransform:"capitalize"}}>{c.type === "percent" ? "Percentage" : "Flat Amount"}</span></td>
                          <td><strong>{c.type === "percent" ? `${c.value}%` : money(c.value)}</strong></td>
                          <td>{c.minOrder > 0 ? money(c.minOrder) : <span style={{color:"var(--muted)"}}>No minimum</span>}</td>
                          <td style={{color:"var(--muted)",fontSize:"0.85rem"}}>{c.desc}</td>
                          <td>
                            {usageCount > 0
                              ? <><b>{usageCount}</b> orders · saved {money(totalSaved)}</>
                              : <span style={{color:"var(--muted)"}}>Not used yet</span>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </main>
      </div>
    </>
  );
}
