import React from "react";
import { Link } from "react-router-dom";
import { IconLeaf, IconTruck, IconShieldCheck, IconStar, IconTag, IconCart } from "../Icons";

export default function About() {
  return (
    <div className="about-page">
      {/* About Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="eyebrow">OUR MISSION</span>
          <h1>Empowering Healthy, Convenient Living for Campus & Community</h1>
          <p>
            KLU Fresh was founded with a singular purpose: to bring uncompromised farm-fresh produce and daily nutritional essentials directly to students, faculty, and residents of Vijayawada within 15 minutes.
          </p>
          <div className="about-hero-cta">
            <Link to="/products" className="primary-btn">
              <IconCart size={18} /> Shop the Store
            </Link>
            <Link to="/contact" className="outline-btn">
              Contact our team
            </Link>
          </div>
        </div>
        <div className="about-hero-img-box">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
            alt="Farm fresh market produce"
            className="about-hero-img"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="section story-section">
        <div className="story-grid">
          <div className="story-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80"
              alt="Farmers harvesting fresh vegetables"
              className="story-img"
            />
          </div>
          <div className="story-content">
            <span className="eyebrow">THE STORY BEHIND KLU FRESH</span>
            <h2>Bridging the Gap Between Farm Fields & Student Hostels</h2>
            <p>
              Living on campus shouldn't mean compromising on nutrition or surviving on unhealthy processed foods. Our founders realized that while fresh regional farms surrounded Andhra Pradesh, getting real organic fruits, dairy, and wholesome snacks delivered quickly to hostels was a constant struggle.
            </p>
            <p>
              We established direct ties with local Andhra farmers, set up cold-chain micro-fulfillment hubs at the campus boundary, and engineered a rapid student-focused delivery system. Today, KLU Fresh delivers over 40+ everyday essentials with unmatched reliability.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="section pillars-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">OUR COMMITMENT</span>
            <h2>How We Deliver Freshness Every Single Day</h2>
          </div>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon"><IconLeaf size={28} /></div>
            <h3>Direct Farm Sourcing</h3>
            <p>We skip middlemen and harvest directly from local growers at 4:00 AM every morning for peak crispness.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><IconShieldCheck size={28} /></div>
            <h3>Strict 3-Stage Quality Check</h3>
            <p>Every batch of fruits, dairy, and greens undergoes strict quality assessment before packing.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><IconTruck size={28} /></div>
            <h3>15-Min Campus Delivery</h3>
            <p>Strategically placed fulfillment stations guarantee rapid delivery directly to your hostel or doorstep.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><IconTag size={28} /></div>
            <h3>Fair Student Pricing</h3>
            <p>Affordable transparent pricing with 10% discounts on ₹500+ orders, with zero hidden platform charges.</p>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="impact-section">
        <div className="impact-grid">
          <div className="impact-item">
            <h2>40+</h2>
            <p>Daily Fresh Essentials</p>
          </div>
          <div className="impact-item">
            <h2>12,000+</h2>
            <p>Campus Orders Completed</p>
          </div>
          <div className="impact-item">
            <h2>99.4%</h2>
            <p>On-Time Delivery Rate</p>
          </div>
          <div className="impact-item">
            <h2>4.8 / 5★</h2>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section about-cta-section">
        <div className="about-cta-card">
          <h2>Ready to experience effortless grocery shopping?</h2>
          <p>Order your daily essentials now and receive them at your doorstep in under 15 minutes.</p>
          <Link to="/products" className="primary-btn hero-cta">
            Start Shopping Now →
          </Link>
        </div>
      </section>
    </div>
  );
}
