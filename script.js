/* Production mode: Firebase Authentication is required for account features. */
const IS_DEV_MODE = false;
window.IS_DEV_MODE = IS_DEV_MODE;

/* Keep a small local diagnostic buffer for the authorized owner view only. */
const OWNER_ERROR_LOG_KEY = 'academyOwnerErrorLogs';
function recordOwnerError(type, message, source = '') {
  try {
    const logs = JSON.parse(localStorage.getItem(OWNER_ERROR_LOG_KEY) || '[]');
    logs.unshift({ type, message: String(message || 'Unknown error'), source: String(source || ''), timestamp: new Date().toISOString() });
    localStorage.setItem(OWNER_ERROR_LOG_KEY, JSON.stringify(logs.slice(0, 50)));
  } catch (_) {
    // Diagnostics must never interrupt the application.
  }
}
window.addEventListener('error', event => {
  recordOwnerError('JavaScript error', event.message, `${event.filename || ''}:${event.lineno || ''}`);
});
window.addEventListener('unhandledrejection', event => {
  const reason = event.reason instanceof Error ? event.reason.message : event.reason;
  recordOwnerError('Unhandled promise rejection', reason);
});

/* Shared mobile navigation behavior for pages that load this file. */
(function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuToggle || !mobileMenu || menuToggle.dataset.menuBound === 'true') return;
  menuToggle.dataset.menuBound = 'true';

  const closeMenu = () => {
    if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.add('hidden');
    // The drawer never changes body spacing, overflow, or scrollbar settings.
  };
  const openMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    mobileMenu.classList.remove('hidden');
  };

  menuToggle.addEventListener('click', () => {
    if (menuToggle.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });
  document.addEventListener('click', event => {
    if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  mobileMenu.querySelectorAll('a, button').forEach(item => item.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
})();

/* Keep the report accordion closed initially and expose its state to assistive
   technology while preserving native <details> keyboard behavior. */
document.addEventListener('DOMContentLoaded', () => {
  const overview = document.getElementById('progress-overview-panel');
  const toggle = overview?.querySelector('summary');
  if (!overview || !toggle) return;

  overview.open = false;
  toggle.setAttribute('aria-expanded', 'false');
  overview.addEventListener('toggle', () => {
    toggle.setAttribute('aria-expanded', String(overview.open));
  });
});

function showTime() {
  const element = document.getElementById('currentTime');
  if (element) element.innerHTML = new Date().toUTCString();
}
showTime();
setInterval(showTime, 1000);

/* Keep the three-dot account menu as a click-controlled floating overlay. */
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('account-menu-toggle');
  const menu = document.getElementById('account-menu');
  const menuWrap = document.getElementById('profile-menu-wrap');
  if (!menuButton || !menu || !menuWrap || menuButton.dataset.dotMenuBound === 'true') return;
  menuButton.dataset.dotMenuBound = 'true';
  menu.classList.add('hidden');
  menuButton.setAttribute('aria-expanded', 'false');

  const closeMenu = () => {
    menu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', event => {
    event.stopPropagation();
    const open = menu.classList.toggle('hidden') === false;
    menuButton.setAttribute('aria-expanded', String(open));
  });

  menu.addEventListener('click', event => event.stopPropagation());
  document.addEventListener('click', event => {
    if (!menuWrap.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
});

/* Shared view navigation for pages that use the drawer without stacking sections. */
(function initWorkspaceViews() {
  const body = document.body;
  const drawer = document.getElementById('mobile-menu');
  const toggle = document.getElementById('menu-toggle');
  if (!body) return;

  const closeDrawer = () => {
    if (!drawer || !toggle) return;
    drawer.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };

  const setView = view => {
    ['home', 'account', 'storage', 'owner'].forEach(name => body.classList.toggle(`view-${name}`, name === view));
    body.classList.toggle('public-home', view === 'home');
    body.classList.toggle('workspace-entry', view === 'account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeDrawer();
  };

  document.getElementById('account-nav-link')?.addEventListener('click', event => {
    event.preventDefault();
    setView('account');
  });
  document.getElementById('workspace-logo')?.addEventListener('click', event => {
    event.preventDefault();
    setView('home');
    history.replaceState(null, '', 'index.html');
  });
  document.getElementById('storage-open-mobile')?.addEventListener('click', () => setView('storage'));
})();
