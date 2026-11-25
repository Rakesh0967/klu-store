import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../Shared";
import { categories } from "../data";
import {
  IconLeaf,
  IconCart,
  IconStar,
  IconTruck,
  IconClock,
  IconShieldCheck,
  IconTag,
} from "../Icons";

export default function Home({ products, add, toggleWish, wishlist }) {
  const navigate = useNavigate();
  const featured = products.slice(0, 8);

  const categoryImages = {
    "Fruits & Vegetables": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80",
    Dairy: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=300&q=80",
    Snacks: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80",
    Beverages: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=300&q=80",
    Staples: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80",
    Protein: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80",
    "Personal Care": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=300&q=80",
    Household: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=300&q=80",
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-pill">
            <IconLeaf size={16} /> 100% FARM FRESH & HYPERLOCAL
          </div>
          <h1>
            Fresh groceries,
            <br />
            delivered to your doorstep.
          </h1>
          <p>
            Browse over 40+ farm-fresh fruits, vegetables, dairy, protein, and staples with instant 15-minute campus delivery across KL University.
          </p>
          <div className="hero-btn-row">
            <Link className="primary-btn hero-cta" to="/products">
              <IconCart size={18} /> Explore all products
            </Link>
            <Link className="outline-btn hero-sec-cta" to="/about">
              Our story →
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="stat-circle"><IconClock size={18} /></span>
              <div>
                <b>15 min</b>
                <small>Campus delivery</small>
              </div>
            </div>
            <div className="hero-stat-item">
              <span className="stat-circle"><IconShieldCheck size={18} /></span>
              <div>
                <b>40+ Essentials</b>
                <small>Strict quality control</small>
              </div>
            </div>
            <div className="hero-stat-item">
              <span className="stat-circle"><IconStar size={18} /></span>
              <div>
                <b>4.8 / 5★</b>
                <small>1,200+ Reviews</small>
              </div>
            </div>
          </div>
        </div>

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
                <strong>4.9 Rating</strong>
                <small>Verified Student Favorite</small>
              </div>
            </div>

            <div className="hero-floating-badge badge-bottom">
              <span className="badge-icon-box"><IconTruck size={18} /></span>
              <div>
                <strong>15-Minute Fleet</strong>
                <small>Free delivery on ₹500+</small>
              </div>
            </div>

            <div className="hero-discount-tag">
              <small>SPECIAL OFFER</small>
              <strong>UP TO 30% OFF</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="section categories-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">EXPLORE BY CATEGORY</span>
            <h2>Popular Grocery Aisles</h2>
            <p>Select a category to jump straight into matching fresh items</p>
          </div>
          <Link to="/products" className="outline-btn">
            View all categories →
          </Link>
        </div>

        <div className="category-cards-grid">
          {categories.slice(0, 6).map((cat) => (
            <div
              key={cat}
              className="category-card"
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
            >
              <div className="category-card-img-wrap">
                <img src={categoryImages[cat]} alt={cat} className="category-card-img" />
              </div>
              <div className="category-card-info">
                <h3>{cat}</h3>
                <span className="category-link-text">Browse category →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Groceries Section */}
      <section className="section featured-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">CURATED PICKS</span>
            <h2>Today's Featured Groceries</h2>
            <p>Hand-picked daily essentials with special discounts</p>
          </div>
          <Link to="/products" className="primary-btn">
            View All 40+ Products →
          </Link>
        </div>

        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              add={add}
              toggleWish={toggleWish}
              wished={wishlist.includes(p.id)}
            />
          ))}
        </div>

        <div className="view-more-banner">
          <div>
            <h3>Looking for more items?</h3>
            <p>Explore our complete catalog of 40+ fresh fruits, veggies, dairy, pantry staples, and protein.</p>
          </div>
          <Link to="/products" className="primary-btn">
            Browse Full Storefront
          </Link>
        </div>
      </section>

      {/* Promotional Callout */}
      <section className="promo-banner-section">
        <div className="promo-banner-card">
          <div className="promo-text">
            <span className="promo-tag">CAMPUS SPECIAL</span>
            <h2>Save 10% on Orders Over ₹500</h2>
            <p>
              Stock up your hostel room or home pantry with wholesome nutrition. Automatic discount applied at checkout.
            </p>
            <Link to="/products" className="primary-btn promo-btn">
              Claim Discount Now
            </Link>
          </div>
          <div className="promo-visual">
            <img
              src="https://images.unsplash.com/photo-1506617564039-2f3b650b7010?auto=format&fit=crop&w=600&q=80"
              alt="Grocery discount basket"
              className="promo-img"
            />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section about-preview">
        <div className="section-title">
          <div>
            <span className="eyebrow">THE KLU FRESH PROMISE</span>
            <h2>Why Students & Faculty Choose Us</h2>
          </div>
        </div>
        <div className="about-grid">
          <article>
            <div className="feature-icon"><IconLeaf size={28} /></div>
            <h3>100% Farm Fresh</h3>
            <p>Direct partnerships with local growers mean crisp vegetables and juicy fruits harvested at peak freshness.</p>
          </article>
          <article>
            <div className="feature-icon"><IconTruck size={28} /></div>
            <h3>15-Minute Fleet</h3>
            <p>Hyperlocal electric delivery fleet stationed right near KL University campus gates for lightning-fast arrival.</p>
          </article>
          <article>
            <div className="feature-icon"><IconTag size={28} /></div>
            <h3>Budget-Friendly Rates</h3>
            <p>Fair, honest pricing with zero surge pricing, transparent weights, and generous student promotions.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
