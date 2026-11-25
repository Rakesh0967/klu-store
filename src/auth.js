import { readStore, writeStore } from "./data";

const USERS = "grocery_users";
const ADMINS = "grocery_admins";
const SESSION = "grocery_current_user";

function localPasswordHash(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = ((hash << 5) - hash + password.charCodeAt(i)) | 0;
  }
  return `demo_${Math.abs(hash).toString(36)}_${password.length}`;
}

const defaultAdmins = [
  { id: "admin_001", name: "Store Administrator", email: "admin@klufresh.com", password: "admin123", role: "admin" },
  { id: "admin_002", name: "Store Administrator", email: "admin123@klufresh.in", password: "admin11", role: "admin" }
];

const demoCustomer = {
  id: "u_demo_customer",
  name: "Demo Customer",
  email: "customer@klufresh.com",
  password: localPasswordHash("demo1234"),
  role: "user",
  createdAt: "2026-11-20T10:00:00.000Z"
};

export function getLocalAdmins() {
  const stored = readStore(ADMINS, []);
  const byEmail = new Map(stored.map(a => [a.email.toLowerCase(), a]));
  let changed = stored.length === 0;
  for (const admin of defaultAdmins) {
    if (!byEmail.has(admin.email.toLowerCase())) {
      stored.push(admin);
      changed = true;
    }
  }
  if (changed) writeStore(ADMINS, stored);
  return stored;
}

export function getCurrentUser() {
  return readStore(SESSION, null);
}

export function getLocalUsers() {
  const users = readStore(USERS, []);
  if (!users.some(u => u.email.toLowerCase() === demoCustomer.email)) {
    const seeded = [demoCustomer, ...users];
    writeStore(USERS, seeded);
    return seeded;
  }
  return users;
}

export function getUsers() {
  return getLocalUsers().map(({ password, ...user }) => user);
}

export function signup({ name, email, password, confirmPassword }) {
  name = (name || "").trim();
  email = (email || "").trim().toLowerCase();

  if (!name || !email || !password || !confirmPassword) return { ok: false, message: "Please fill in all fields." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Enter a valid email address." };
  if (getLocalAdmins().some(a => a.email.toLowerCase() === email)) {
    return { ok: false, message: "This email is reserved for an administrator." };
  }
  if (password.length < 6) return { ok: false, message: "Password must contain at least 6 characters." };
  if (password !== confirmPassword) return { ok: false, message: "Passwords do not match." };

  const users = getLocalUsers();
  if (users.some(u => u.email.toLowerCase() === email)) {
    return { ok: false, message: "An account with this email already exists." };
  }

  const user = {
    id: `u_${Date.now()}`,
    name,
    email,
    password: localPasswordHash(password),
    role: "user",
    createdAt: new Date().toISOString()
  };
  users.push(user);
  writeStore(USERS, users);
  return { ok: true, message: "Account created. Please log in." };
}

export function login({ email, password, role }) {
  email = (email || "").trim().toLowerCase();
  if (!email || !password) return { ok: false, message: "Enter email and password." };

  const adminsList = getLocalAdmins();
  const usersList = getLocalUsers();
  const adminMatch = adminsList.find(a => a.email.toLowerCase() === email && a.password === password);
  const userMatch = !adminMatch
    ? usersList.find(
        u => u.email.toLowerCase() === email && (u.password === localPasswordHash(password) || u.password === password)
      )
    : null;

  if (!adminMatch && userMatch && role === "admin") {
    return { ok: false, message: "This is a customer account. Switch to Customer to sign in." };
  }

  const found = adminMatch || userMatch;
  if (!found) {
    return { ok: false, message: "Invalid email or password." };
  }

  const session = { id: found.id, name: found.name, email: found.email, role: found.role };
  writeStore(SESSION, session);
  return { ok: true, user: session, message: `Welcome, ${found.name}!` };
}

export function logout() {
  localStorage.removeItem(SESSION);
}
