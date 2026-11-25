import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../Shared";
import { categories } from "../data";
import { IconCart, IconTag, IconSearch } from "../Icons";

export default function Products({ products, add, toggleWish, wishlist, onOpenCart, ordersCount = 0, onToggleOrders }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");

  function handleCategoryChange(newCat) {
    setCategory(newCat);
    if (newCat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", newCat);
    }
    setSearchParams(searchParams);
  }

  const visible = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "all" || p.category === category)
    );
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === "discount") list.sort((a, b) => b.original - b.price - (a.original - a.price));
    return list;
  }, [products, search, category, sort]);

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="page-header-content">
          <span className="eyebrow">COMPLETE GROCERY CATALOG</span>
          <h1>All Products ({products.length})</h1>
          <p>
            Explore our full range of farm-fresh fruits, vegetables, dairy, pantry staples, snacks, beverages, and protein.
          </p>
        </div>
        <div className="quick-actions">
          <button className="outline-btn" onClick={onOpenCart}>
            <IconCart size={16} /> Open Cart
          </button>
          <button className="outline-btn" onClick={onToggleOrders}>
            <IconTag size={16} /> My Orders ({ordersCount})
          </button>
        </div>
      </div>

      <section className="section catalog-section">
        {/* Category Pills Navigation */}
        <div className="category-pills-bar">
          <button
            className={`category-pill-btn ${category === "all" ? "active" : ""}`}
            onClick={() => handleCategoryChange("all")}
          >
            All Products ({products.length})
          </button>
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                className={`category-pill-btn ${category === c ? "active" : ""}`}
                onClick={() => handleCategoryChange(c)}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>

        {/* Filter & Sort Controls */}
        <div className="filters">
          <div className="search-wrap">
            <input
              placeholder="Search groceries by name, item or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated ⭐</option>
            <option value="discount">Biggest Discount %</option>
          </select>
        </div>

        <div className="catalog-meta-info">
          <span>
            Showing <b>{visible.length}</b> of <b>{products.length}</b> items
            {category !== "all" && ` in ${category}`}
            {search && ` matching "${search}"`}
          </span>
          {category !== "all" && (
            <button className="reset-filter-btn" onClick={() => handleCategoryChange("all")}>
              Clear filter ✕
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              add={add}
              toggleWish={toggleWish}
              wished={wishlist.includes(p.id)}
            />
          ))}
        </div>

        {!visible.length && (
          <div className="empty-catalog-state">
            <p>No products found matching your current filter.</p>
            <button className="primary-btn" onClick={() => { setSearch(""); handleCategoryChange("all"); }}>
              Reset search & filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
