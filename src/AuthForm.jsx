import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, signup } from "./auth";
import { BrandMark } from "./Shared";

export default function AuthForm({ mode, onAuth }) {
  const nav = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [notice, setNotice] = useState(null);
  const isSignup = mode === "signup";

  useEffect(() => {
    const flash = location.state;
    if (!isSignup && flash?.notice) {
      setNotice({ text: flash.notice, type: "success" });
      setForm({ name: "", email: flash.email || "", password: "", confirmPassword: "" });
    } else {
      setNotice(null);
      setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
    }
  }, [isSignup, location.state]);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function selectRole(nextRole) {
    setRole(nextRole);
    setNotice(null);
  }

  function submit(e) {
    e.preventDefault();
    if (isSignup) {
      const result = signup(form);
      if (result.ok) {
        nav("/login", { state: { notice: result.message, email: form.email.trim().toLowerCase() } });
      } else {
        setNotice({ text: result.message, type: "error" });
      }
    } else {
      const result = login({ ...form, role });
      setNotice({ text: result.message, type: result.ok ? "success" : "error" });
      if (result.ok) {
        onAuth(result.user);
        nav(result.user.role === "admin" ? "/admin" : "/");
      }
    }
  }

  return (
    <main className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <Link className="auth-logo" to="/">
          <BrandMark />
          KLU <span>Fresh</span>
        </Link>
        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p>{isSignup ? "Sign up to shop fresh essentials with express campus delivery." : "Sign in to continue to KLU Fresh."}</p>

        {!isSignup && (
          <div className="role-switch">
            <button type="button" className={role === "user" ? "selected" : ""} onClick={() => selectRole("user")}>
              Customer
            </button>
            <button type="button" className={role === "admin" ? "selected" : ""} onClick={() => selectRole("admin")}>
              Admin
            </button>
          </div>
        )}

        {isSignup && (
          <input name="name" placeholder="Full name" value={form.name} onChange={change} required />
        )}
        <input name="email" type="email" placeholder="Email address" value={form.email} onChange={change} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={change} required />
        {isSignup && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={change}
            required
          />
        )}

        <button className="primary-btn full" type="submit">
          {isSignup ? "Create account" : "Sign in"}
        </button>

        {notice && (
          <p className={`notice ${notice.type === "success" ? "notice-success" : ""}`}>{notice.text}</p>
        )}

        <p className="auth-bottom">
          {isSignup ? "Already registered?" : "New to KLU Fresh?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"}>{isSignup ? "Login" : "Create an account"}</Link>
        </p>

        {!isSignup && (
          <small>
            {role === "admin"
              ? "Demo: admin@klufresh.com / admin123 or admin123@klufresh.in / admin11"
              : "Demo: customer@klufresh.com / demo1234"}
          </small>
        )}
      </form>
    </main>
  );
}
