/* ==========================================
   AI Calculator
   Theme Manager
========================================== */

let currentTheme = 'dark';

/* ==========================================
   INITIALIZE
========================================== */

function initTheme() {
  const savedTheme = load(STORAGE.THEME);

  if (savedTheme) {
    currentTheme = savedTheme;
  } else {
    currentTheme = window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  applyTheme(currentTheme);

  themeBtn.addEventListener('click', toggleTheme);
}

/* ==========================================
   TOGGLE
========================================== */

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';

  applyTheme(currentTheme);

  save(STORAGE.THEME, currentTheme);
}

/* ==========================================
   APPLY
========================================== */

function applyTheme(theme) {
  document.body.classList.toggle(
    'light',

    theme === 'light'
  );

  updateThemeIcon(theme);
}

/* ==========================================
   ICON
========================================== */

function updateThemeIcon(theme) {
  if (!themeBtn) return;

  themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
}

/* ==========================================
   GET CURRENT THEME
========================================== */

function getTheme() {
  return currentTheme;
}

/* ==========================================
   SYSTEM THEME CHANGE
========================================== */

window
  .matchMedia('(prefers-color-scheme: dark)')

  .addEventListener('change', (event) => {
    if (load(STORAGE.THEME)) return;

    currentTheme = event.matches ? 'dark' : 'light';

    applyTheme(currentTheme);
  });
