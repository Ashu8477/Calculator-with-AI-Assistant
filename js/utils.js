/* ==========================================
   AI Calculator
   Utility Functions
========================================== */

/* ==========================================
   SELECTOR HELPERS
========================================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================
   SLEEP
========================================== */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ==========================================
   RANDOM
========================================== */

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ==========================================
   FORMAT NUMBER
========================================== */

function formatNumber(value) {
  if (value === '' || value === null || value === undefined) return '';

  const num = Number(value);

  if (isNaN(num)) return value;

  return num.toLocaleString();
}

/* ==========================================
   GET CURRENT TIME
========================================== */

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',

    minute: '2-digit',
  });
}

/* ==========================================
   COPY TEXT
========================================== */

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);

    showToast('📋 Copied Successfully');
  } catch {
    showToast('❌ Copy Failed');
  }
}

/* ==========================================
   CREATE ELEMENT
========================================== */

function createElement(tag, className = '', html = '') {
  const element = document.createElement(tag);

  if (className) element.className = className;

  element.innerHTML = html;

  return element;
}

/* ==========================================
   SHOW TOAST
========================================== */

function showToast(message) {
  const toast = createElement(
    'div',

    'toast',

    message
  );

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

/* ==========================================
   SHAKE EFFECT
========================================== */

function shake(element) {
  element.classList.add('shake');

  setTimeout(() => {
    element.classList.remove('shake');
  }, 400);
}

/* ==========================================
   POP EFFECT
========================================== */

function pop(element) {
  element.classList.add('pop');

  setTimeout(() => {
    element.classList.remove('pop');
  }, 300);
}

/* ==========================================
   GLOW EFFECT
========================================== */

function glow(element) {
  element.classList.add('glow');
}

/* ==========================================
   REMOVE GLOW
========================================== */

function removeGlow(element) {
  element.classList.remove('glow');
}

/* ==========================================
   SHOW
========================================== */

function show(element) {
  element.classList.remove('hidden');
}

/* ==========================================
   HIDE
========================================== */

function hide(element) {
  element.classList.add('hidden');
}

/* ==========================================
   TOGGLE
========================================== */

function toggle(element) {
  element.classList.toggle('hidden');
}

/* ==========================================
   SANITIZE INPUT
========================================== */

function sanitizeInput(text) {
  return text

    .trim()

    .replace(/\s+/g, ' ')

    .toLowerCase();
}

/* ==========================================
   IS NUMBER
========================================== */

function isNumber(value) {
  return !isNaN(value);
}

/* ==========================================
   VIBRATION
========================================== */

function vibrate(duration = 40) {
  if ('vibrate' in navigator) navigator.vibrate(duration);
}

/* ==========================================
   SAVE LOCAL STORAGE
========================================== */

function save(key, value) {
  localStorage.setItem(
    key,

    JSON.stringify(value)
  );
}

/* ==========================================
   LOAD LOCAL STORAGE
========================================== */

function load(key, fallback = null) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : fallback;
}

/* ==========================================
   REMOVE STORAGE
========================================== */

function remove(key) {
  localStorage.removeItem(key);
}

/* ==========================================
   UNIQUE ID
========================================== */

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
