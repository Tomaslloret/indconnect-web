// auth.js — INDCONNECT Authentication System
// Vanilla JS (no JSX). Load BEFORE React/Babel scripts on every page.

const IndAuth = (() => {
  'use strict';
  const SESSION_KEY = 'ic.session';
  const USERS_KEY   = 'ic.users';

  const _getLS = (k, def) => { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } };
  const _setLS = (k, v)   => localStorage.setItem(k, JSON.stringify(v));

  async function _hash(pw) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('ic_salt_' + pw));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function _setSession(data) {
    const json = JSON.stringify(data);
    sessionStorage.setItem(SESSION_KEY, json);
    localStorage.setItem(SESSION_KEY, json); // persist across tabs
    window.dispatchEvent(new CustomEvent('ic:auth', { detail: data }));
  }

  async function register({ email, password, name, company = '' }) {
    email = email.trim().toLowerCase();
    if (!email || !password || !name) throw new Error('Completá todos los campos obligatorios.');
    const users = _getLS(USERS_KEY, []);
    if (users.find(u => u.email === email)) throw new Error('Ya existe una cuenta con ese email.');
    if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.');
    const hash = await _hash(password);
    const user = {
      id: crypto.randomUUID(), email, name: name.trim(), company: company.trim(), hash,
      createdAt: new Date().toISOString(),
      verified: false, premium: false, ops: 0, responseTime: '—', rating: null,
    };
    _setLS(USERS_KEY, [...users, user]);
    _setSession({ id: user.id, email, name: user.name, company: user.company });
    return getCurrentUser();
  }

  async function login(email, password) {
    email = email.trim().toLowerCase();
    const users = _getLS(USERS_KEY, []);
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('Email no registrado.');
    const hash = await _hash(password);
    if (hash !== user.hash) throw new Error('Contraseña incorrecta.');
    _setSession({ id: user.id, email: user.email, name: user.name, company: user.company });
    return getCurrentUser();
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent('ic:auth', { detail: null }));
    window.location.href = 'index.html';
  }

  function getCurrentUser() {
    try {
      const s = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  }

  function requireAuth() {
    if (!getCurrentUser()) {
      const next = encodeURIComponent(window.location.href);
      window.location.href = 'index.html?auth=login&next=' + next;
    }
  }

  function getUser(id) {
    const users = _getLS(USERS_KEY, []);
    const u = users.find(u => u.id === id);
    if (!u) return null;
    const { hash, ...safe } = u;
    return safe;
  }

  function updateUser(id, updates) {
    const users = _getLS(USERS_KEY, []);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return;
    users[idx] = { ...users[idx], ...updates };
    _setLS(USERS_KEY, users);
    const session = getCurrentUser();
    if (session?.id === id) _setSession({ ...session, ...updates });
  }

  return { register, login, logout, getCurrentUser, requireAuth, getUser, updateUser };
})();

Object.assign(window, { IndAuth });
