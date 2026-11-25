import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { defaultProducts, readStore, writeStore } from "./data";
import { getCurrentUser } from "./auth";
import { useStored } from "./Shared";
import Login from "./Login";
import Signup from "./Signup";
import Admin from "./Admin";
import User from "./User";

const PRODUCTS = "grocery_products", ORDERS = "grocery_orders", CATALOG_VERSION_KEY = "klu_catalog_v4";

export default function App() {
  const [user, setUser] = useState(getCurrentUser);
  const [products, setProducts] = useStored(PRODUCTS, defaultProducts);
  const [orders, setOrders] = useStored(ORDERS, []);

  useEffect(() => {
    if (!readStore(PRODUCTS, null)) writeStore(PRODUCTS, defaultProducts);
    if (!readStore(CATALOG_VERSION_KEY, false)) {
      setProducts(old => {
        const defaultsById = new Map(defaultProducts.map(p => [p.id, p]));
        const updated = old.map(p => {
          const def = defaultsById.get(p.id);
          if (!def) return p;
          return {
            ...p,
            category: def.category,
            image: def.image,
            tag: p.tag || def.tag
          };
        });
        const existingIds = new Set(updated.map(p => p.id));
        const additions = defaultProducts.filter(p => !existingIds.has(p.id));
        return additions.length ? [...updated, ...additions] : updated;
      });
      writeStore(CATALOG_VERSION_KEY, true);
    }
  }, [setProducts]);

  return <Routes>
    <Route path="/" element={<User user={user} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />} />
    <Route path="/login" element={user ? <Navigate to={user.role === "admin" ? "/admin" : "/"} /> : <Login onAuth={setUser} />} />
    <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup onAuth={setUser} />} />
    <Route path="/admin" element={user?.role === "admin" ? <Admin user={user} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} /> : <Navigate to="/login" />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>;
}
