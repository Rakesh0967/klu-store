import React, { useState } from "react";
import { IconCheck, IconClock, IconTruck } from "../Icons";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    }, 4000);
  }

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="page-header-content">
          <span className="eyebrow">WE ARE HERE FOR YOU</span>
          <h1>Contact & Customer Support</h1>
          <p>Have questions about orders, deliveries, or campus pickup? Reach out to our 24/7 team.</p>
        </div>
      </div>

      <section className="section contact-main-section">
        <div className="contact-grid">
          {/* Interactive Form */}
          <div className="contact-form-card">
            <h2>Send us a message</h2>
            <p>Fill out the form below and our support lead will get back to you within 15 minutes.</p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row-2">
                <label>
                  Full name
                  <input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
                <label>
                  Email address
                  <input
                    required
                    type="email"
                    placeholder="name@kluniversity.in"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
              </div>

              <div className="form-row-2">
                <label>
                  Phone number
                  <input
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </label>
                <label>
                  Inquiry subject
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status / Delay">Order Status / Delay</option>
                    <option value="Product Quality / Return">Product Quality / Return</option>
                    <option value="Hostel Delivery Slot">Hostel Delivery Slot</option>
                    <option value="Bulk / Faculty Order">Bulk / Faculty Order</option>
                  </select>
                </label>
              </div>

              <label>
                Message
                <textarea
                  required
                  rows="5"
                  placeholder="How can we assist you today?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>

              <button type="submit" className="primary-btn full" disabled={sent}>
                {sent ? "Message sent successfully!" : "Submit Inquiry"}
              </button>

              {sent && (
                <div className="contact-success-msg">
                  <IconCheck size={18} /> Thank you! Your message has been received. Our team will contact you shortly.
                </div>
              )}
            </form>
          </div>

          {/* Contact Details & Hubs */}
          <div className="contact-details-col">
            <div className="contact-info-card">
              <h3>📍 Campus Fulfillment Hub</h3>
              <p>
                <strong>KL University Student Center</strong>
                <br />
                Green Fields, Vaddeswaram, Guntur / Vijayawada
                <br />
                Andhra Pradesh – 522502
              </p>
              <small>Pickup available at Gate 1 & Gate 3 counters</small>
            </div>

            <div className="contact-info-card">
              <h3>📞 Direct Helplines</h3>
              <p>
                <strong>Student Support:</strong> +91 866 245 6789
                <br />
                <strong>WhatsApp Orders:</strong> +91 949 123 4567
                <br />
                <strong>Email:</strong> support@klufresh.com
              </p>
            </div>

            <div className="contact-info-card">
              <h3>
                <IconClock size={18} /> Operating Hours
              </h3>
              <p>
                <strong>Monday – Sunday:</strong> 7:00 AM – 10:00 PM
                <br />
                <strong>Late Night Exam Delivery:</strong> Until 1:00 AM
              </p>
            </div>

            <div className="contact-info-card highlight-card">
              <h3>
                <IconTruck size={18} /> Instant Hostels Delivery
              </h3>
              <p>
                Deliveries are dispatched every 15 minutes to all Boys & Girls hostels across KLU campus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
