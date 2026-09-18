// Application behavior is defined in index.html.
// Styles belong in styles.css; this file intentionally contains only valid JavaScript.

// Format the elapsed study window shown on goal cards. An end time earlier than
// the start time is treated as an overnight window.
window.academyGetAvatarInitial = function (name) {
  return String(name || '').trim().charAt(0).toUpperCase();
};

// Storage navigation is a route transition; the page owns the actual view.
window.academyStorageRoute = function () {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('storage', '1');
    window.history.pushState({ view: 'storage' }, '', url);
  } catch (error) {
    // The in-page handler remains the fallback if URL history is unavailable.
  }
};

// Toggle the responsive drawer without assuming that either element exists.
window.academyToggleMobileMenu = function () {
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('menu-toggle');
  if (!menu || !toggle) return false;

  // The inline application listener uses the same state contract. Keeping this
  // helper class-based makes it safe to call from responsive UI integrations.
  const opening = menu.classList.contains('hidden');
  menu.classList.toggle('hidden', !opening);
  menu.setAttribute('aria-hidden', String(!opening));
  toggle.setAttribute('aria-expanded', String(opening));
  toggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
  document.getElementById('menu-icon-open')?.classList.toggle('hidden', opening);
  document.getElementById('menu-icon-close')?.classList.toggle('hidden', !opening);
  menu.setAttribute('aria-hidden', String(!opening));
  return opening;
};

// Keep Account navigation independent from Firebase implementation details.
// The page supplies the authenticated state and the appropriate view actions.
(() => {
  let closeTimer = null;

  const getModal = () => document.getElementById('recovery-modal');
  const getLoginEmail = () => document.getElementById('login-email');

  window.academyOpenPasswordRecovery = function () {
    const modal = getModal();
    if (!modal) return false;
    clearTimeout(closeTimer);
    modal.classList.remove('hidden', 'recovery-modal-closing');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('recovery-modal-active');
    requestAnimationFrame(() => modal.classList.add('recovery-modal-open'));
    const recoveryEmail = document.getElementById('recovery-email');
    if (recoveryEmail) {
      recoveryEmail.value = getLoginEmail()?.value.trim() || recoveryEmail.value;
      requestAnimationFrame(() => recoveryEmail.focus());
    }
    return true;
  };

  window.academyClosePasswordRecovery = function ({ focusLogin = true } = {}) {
    const modal = getModal();
    if (!modal || modal.classList.contains('hidden')) {
      if (focusLogin) requestAnimationFrame(() => getLoginEmail()?.focus());
      return false;
    }
    modal.classList.remove('recovery-modal-open');
    modal.classList.add('recovery-modal-closing');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('recovery-modal-active');
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('recovery-modal-closing');
    }, 220);
    if (focusLogin) requestAnimationFrame(() => getLoginEmail()?.focus());
    return true;
  };

  window.academyReturnToLogin = function () {
    window.academyClosePasswordRecovery?.({ focusLogin: false });
    window.academyToggleAccountMode?.('login');
    requestAnimationFrame(() => getLoginEmail()?.focus());
  };

  // GitHub Pages deployment note:
  // Add the live host (for example, username.github.io) to Firebase Console →
  // Authentication → Settings → Authorized domains. Without that domain,
  // Firebase may reject password-reset requests with auth/unauthorized-domain.
  // Shown only after Firebase confirms that the reset email was accepted.
  window.academyPasswordRecoverySuccessMessage = function () {
    return 'Reset link sent! Check your inbox and Spam/Junk folder to choose a new password.';
  };

  window.academyPasswordRecoveryErrorMessage = function (error) {
    const code = String(error?.code || '').toLowerCase();
    if (code === 'auth/user-not-found') {
      return 'No account found with this email address. Please check and try again.';
    }
    if (code === 'auth/invalid-email') {
      return 'Enter a valid email address.';
    }
    if (code === 'auth/unauthorized-domain') {
      return 'Unable to send reset email. Please verify the email address or check domain authorization.';
    }
    return 'Unable to send reset email. Please verify the email address or try again later.';
  };

  const initializeRecoveryModal = () => {
    const modal = getModal();
    if (!modal || modal.dataset.recoveryBound === 'true') return;
    modal.dataset.recoveryBound = 'true';
    modal.addEventListener('click', event => {
      // Only the backdrop closes the modal; clicks inside the dialog stay inside it.
      if (event.target !== modal) return;
      event.preventDefault();
      window.academyReturnToLogin?.();
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || modal.classList.contains('hidden')) return;
      event.preventDefault();
      window.academyReturnToLogin?.();
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeRecoveryModal, { once: true });
  else initializeRecoveryModal();
})();

window.academyAccountRoute = function ({
  isAuthenticated = false,
  openProfile,
  focusLogin
} = {}) {
  // The caller owns the actual view transition; this helper only selects the
  // correct destination from the current Firebase authentication state.
  if (isAuthenticated) {
    if (typeof openProfile === 'function') openProfile();
    return 'profile';
  }
  if (typeof focusLogin === 'function') focusLogin();
  return 'login';
};

window.academyFormatGoalDuration = function (fromTime, toTime) {
  if (!fromTime || !toTime) return '';
  const toMinutes = value => {
    const [hours, minutes] = String(value).split(':').map(Number);
    return Number.isFinite(hours) && Number.isFinite(minutes) ? hours * 60 + minutes : null;
  };
  const start = toMinutes(fromTime);
  const end = toMinutes(toTime);
  if (start === null || end === null) return '';
  let difference = end - start;
  if (difference < 0) difference += 24 * 60;
  if (difference === 0) return '';
  const hours = Math.floor(difference / 60);
  const minutes = difference % 60;
  const hourText = hours ? `${hours} hr${hours === 1 ? '' : 's'}` : '';
  const minuteText = minutes ? `${minutes} min${minutes === 1 ? '' : 's'}` : '';
  return `(${[hourText, minuteText].filter(Boolean).join(' ')})`;
};

// Academic registration uses the Firebase Auth instance initialized by index.html.
(() => {
  const $ = id => document.getElementById(id);
  const showSignupStatus = (message, type = 'error') => {
    const status = $('signup-status');
    if (!status) return;
    status.textContent = message;
    status.className = `signup-status-banner signup-status-${type}`;
    status.setAttribute('role', type === 'error' ? 'alert' : 'status');
  };
  const clearSignupStatus = () => {
    const status = $('signup-status');
    if (!status) return;
    status.textContent = '';
    status.className = 'signup-status-banner hidden';
  };
  const validateSignupForm = form => {
    const requiredFields = [
      ['signup-full-name', 'Full Name'],
      ['signup-email', 'Email Address'],
      ['signup-university', 'University / Institution'],
      ['signup-department', 'Department'],
      ['signup-session', 'Academic Session'],
      ['signup-year', 'Academic Year'],
      ['signup-semester', 'Semester'],
      ['signup-password', 'Create Password'],
      ['signup-confirm-password', 'Confirm Password']
    ];
    const missing = requiredFields
      .filter(([id]) => !String($(id)?.value || '').trim())
      .map(([, label]) => label);
    if (missing.length) return `Please complete: ${missing.join(', ')}.`;
    const email = $('signup-email');
    if (!email || !email.validity.valid) return 'Enter a valid email address.';
    const password = $('signup-password').value;
    if (password.length < 6) return 'Create Password must be at least 6 characters.';
    if (password !== $('signup-confirm-password').value) return 'Create Password and Confirm Password must match exactly.';
    if (!form.checkValidity()) return 'Please correct the highlighted fields and try again.';
    return '';
  };
  const setSignupVisible = visible => {
    // Keep the two authentication cards mutually exclusive.
    $('signup-view')?.classList.toggle('hidden', !visible);
    $('login-view')?.classList.toggle('hidden', visible);
    $('login-form')?.classList.toggle('hidden', visible);
    $('profile-heading') && ($('profile-heading').textContent = visible
      ? 'Create your workspace account'
      : 'Sign in to your workspace');
    if (visible) $('signup-full-name')?.focus();
  };
  const updatePasswordMatch = () => {
    const password = $('signup-password')?.value || '';
    const confirmation = $('signup-confirm-password')?.value || '';
    const message = $('signup-password-match');
    if (!message) return true;
    const valid = Boolean(confirmation) && password === confirmation;
    message.textContent = valid ? 'Passwords match.' : 'Passwords do not match.';
    message.className = `mt-1 text-xs font-semibold ${valid ? 'text-success' : 'text-error'}`;
    message.classList.toggle('hidden', !confirmation);
    return valid;
  };
  const readPicture = file => file ? new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  }) : Promise.resolve('');

  const initializeSignup = () => {
    const form = $('signup-form');
    if (!form || form.dataset.bound === 'true') return;
    form.dataset.bound = 'true';
    if (!$('signup-view')?.classList.contains('hidden')) setSignupVisible(true);
    $('signup-picture')?.addEventListener('change', event => {
      const fileName = $('signup-picture-name');
      if (fileName) fileName.textContent = event.target.files?.[0]?.name || 'No file chosen';
    });
    $('signup-password')?.addEventListener('input', updatePasswordMatch);
    $('signup-confirm-password')?.addEventListener('input', updatePasswordMatch);
    $('email-mode-toggle')?.addEventListener('click', event => { event.preventDefault(); event.stopImmediatePropagation(); setSignupVisible(true); }, true);
    $('signup-back')?.addEventListener('click', () => { setSignupVisible(false); clearSignupStatus(); $('login-email')?.focus(); });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      clearSignupStatus();
      const validationError = validateSignupForm(form);
      if (validationError) {
        showSignupStatus(validationError, 'error');
        form.querySelector(':invalid')?.focus();
        return;
      }

      const email = $('signup-email').value.trim().toLowerCase();
      const password = $('signup-password').value;
      const auth = window.academyAuth;
      const database = window.academyDatabase;
      if (!auth || typeof auth.createUserWithEmailAndPassword !== 'function') {
        showSignupStatus('Email registration is unavailable. Check the Firebase configuration.', 'error');
        return;
      }
      if (!database || typeof database.ref !== 'function') {
        showSignupStatus('Profile storage is unavailable. Please try again when Firebase Database is connected.', 'error');
        return;
      }

      const submit = $('signup-submit');
      submit.disabled = true;
      submit.textContent = 'Creating account…';
      try {
        // Firebase Auth stores the exact email/password pair used here. The
        // returned UID is then used as the only key for the academic profile.
        const credential = await auth.createUserWithEmailAndPassword(email, password);
        const user = credential?.user;
        if (!user?.uid) throw new Error('Firebase created the account without returning a user ID.');

        const picture = await readPicture($('signup-picture')?.files?.[0]);
        const fullName = $('signup-full-name').value.trim();
        const profile = {
          id: user.uid,
          uid: user.uid,
          fullName,
          name: fullName,
          email,
          cloudEmail: user.email || email,
          institution: $('signup-university').value.trim(),
          department: $('signup-department').value.trim(),
          session: $('signup-session').value.trim(),
          year: $('signup-year').value,
          semester: $('signup-semester').value,
          picture,
          profilePictureUrl: picture || '',
          createdAt: new Date().toISOString()
        };

        // Wait for the UID-scoped write before reporting success. This prevents
        // a successful Auth account from appearing to have a missing profile.
        await database.ref(`users/${user.uid}`).set({
          profile,
          createdAt: profile.createdAt
        });
        localStorage.setItem('academyProfile', JSON.stringify(profile));
        localStorage.setItem('academyLoggedIn', JSON.stringify(profile));
        showSignupStatus('Account successfully created! Redirecting to login…', 'success');
        form.reset();

        // createUserWithEmailAndPassword signs the new user in automatically.
        // Sign out only after Auth and Database have both completed so the next
        // login uses the same email/password pair against Firebase Auth.
        await auth.signOut();
        setTimeout(() => {
          setSignupVisible(false);
          $('login-email').value = email;
          $('login-password').value = '';
          $('login-password').focus();
          clearSignupStatus();
        }, 1200);
      } catch (error) {
        showSignupStatus(error?.message || 'Account creation failed. Please try again.', 'error');
      } finally {
        submit.disabled = false;
        submit.textContent = 'Create Account';
      }
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeSignup, { once: true }); else initializeSignup();
})();

// Local UI-only testing hook. It never authenticates with Firebase or enables
// cloud access. The shortcut is intentionally gated by a rapid three-click
// gesture so an accidental key press cannot open the simulated account view.
(() => {
  const CLICK_WINDOW_MS = 800;
  const DEVELOPER_WINDOW_MS = 10000;

  // This hook only activates the local UI simulation; it never changes Firebase auth.
  const MOCK_SHORTCUT = 'l';

  const closeAccountMenu = () => {
    const menu = document.getElementById('account-menu');
    const toggle = document.getElementById('account-menu-toggle');
    if (!menu) return;
    menu.classList.add('hidden');
    menu.classList.remove('is-closing');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  const initializeAccountMenuDismissal = () => {
    const menu = document.getElementById('account-menu');
    if (!menu || menu.dataset.dismissBound === 'true') return;
    menu.dataset.dismissBound = 'true';

    // Keep accordion headers inside the dropdown so their panels can open.
    // Other menu actions still close the dropdown immediately after activation.
    menu.addEventListener('click', event => {
      const action = event.target.closest('button, a');
      if (!action || action.id === 'account-menu-toggle') return;
      if (action.id === 'saved-plans-toggle' || action.id === 'restore-plans-toggle') return;
      closeAccountMenu();
    });

    // Keep the compact navigation visually synchronized with the routed view.
    const syncNavigationState = () => {
      const activeId = document.body.classList.contains('view-storage')
        ? 'storage-open-mobile'
        : document.body.classList.contains('view-account') ? 'account-nav-link' : '';
      menu.querySelectorAll('.menu-nav-item').forEach(item => {
        const active = item.id === activeId;
        item.classList.toggle('is-active', active);
        if (active) item.setAttribute('aria-current', 'page');
        else item.removeAttribute('aria-current');
      });
    };
    syncNavigationState();
    new MutationObserver(syncNavigationState).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  };

  const initializeDashboardStack = () => {
    document.querySelectorAll('.study-dashboard-grid').forEach(container => {
      container.classList.add('dashboard-stack-container');
    });
  };

  // Initialize empty controls once. Manual edits switch that field to manual
  // mode and are never overwritten by later renders.
  const initializeEmptyPlanControls = () => {
    const selector = document.getElementById('active-plan-selector');
    const planName = document.getElementById('plan-name');
    const startDate = document.getElementById('plan-start-date');
    const startTime = document.getElementById('plan-start-time');
    const endDate = document.getElementById('plan-end-date');
    const goalFromTime = document.getElementById('global-goal-from-time');
    const goalToTime = document.getElementById('global-goal-to-time');

    // Goal study times are optional and must never inherit a previous draft.
    [goalFromTime, goalToTime].forEach(input => {
      if (input) input.value = '';
    });

    const hasSavedPlan = Boolean(selector?.value) && selector?.options.length > 1;
    if (selector && !hasSavedPlan && selector.options.length === 1) {
      selector.options[0].value = '';
      selector.options[0].textContent = 'No plans saved yet';
      selector.options[0].disabled = true;
      selector.options[0].selected = true;
      selector.setAttribute('aria-label', 'Select active plan');
    }
    if (planName) {
      planName.placeholder = 'Enter your plan name...';
      if (!hasSavedPlan) planName.value = '';
    }

    const dhakaParts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).reduce((result, part) => {
      if (part.type !== 'literal') result[part.type] = part.value;
      return result;
    }, {});
    const bangladeshDate = `${dhakaParts.year}-${dhakaParts.month}-${dhakaParts.day}`;
    const bangladeshTime = `${dhakaParts.hour}:${dhakaParts.minute}`;

    const getDhakaValue = input => {
      const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date()).reduce((result, part) => {
        if (part.type !== 'literal') result[part.type] = part.value;
        return result;
      }, {});
      return input.type === 'time'
        ? `${parts.hour}:${parts.minute}`
        : `${parts.year}-${parts.month}-${parts.day}`;
    };

    const setMode = (input, autoButton, manualButton, isAuto) => {
      if (!input || !autoButton || !manualButton) return;
      autoButton.setAttribute('aria-pressed', String(isAuto));
      manualButton.setAttribute('aria-pressed', String(!isAuto));
      input.dataset.scheduleMode = isAuto ? 'auto' : 'manual';
      autoButton.classList.toggle('active', isAuto);
      manualButton.classList.toggle('active', !isAuto);
      input.readOnly = isAuto;
      input.disabled = isAuto;
      if (isAuto) {
        input.value = getDhakaValue(input);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    const bindMode = (input, autoId, manualId, autoValue) => {
      const autoButton = document.getElementById(autoId);
      const manualButton = document.getElementById(manualId);
      if (!input || !autoButton || !manualButton || input.dataset.modeBound === 'true') return;
      input.dataset.modeBound = 'true';
      autoButton.addEventListener('click', event => {
        event.preventDefault();
        setMode(input, autoButton, manualButton, true);
      });
      manualButton.addEventListener('click', event => {
        event.preventDefault();
        setMode(input, autoButton, manualButton, false);
        input.focus();
      });
      input.addEventListener('input', () => {
        autoButton.setAttribute('aria-pressed', 'false');
        manualButton.setAttribute('aria-pressed', 'true');
        autoButton.classList.remove('active');
        manualButton.classList.add('active');
      });
      if (!input.value || autoValue) setMode(input, autoButton, manualButton, true);
      else setMode(input, autoButton, manualButton, false);
    };

    bindMode(startDate, 'start-date-auto', 'start-date-manual', true);
    bindMode(startTime, 'start-time-auto', 'start-time-manual', true);
    if (endDate && !endDate.value) endDate.value = bangladeshDate;

    // Keep Auto fields aligned with the current Dhaka date/time while leaving
    // Manual fields untouched so custom past or future values are preserved.
    setInterval(() => {
      [
        ['plan-start-date', 'start-date-auto', 'start-date-manual'],
        ['plan-start-time', 'start-time-auto', 'start-time-manual']
      ].forEach(([inputId, autoId, manualId]) => {
        const input = document.getElementById(inputId);
        const autoButton = document.getElementById(autoId);
        const manualButton = document.getElementById(manualId);
        if (input && autoButton?.getAttribute('aria-pressed') === 'true') {
          setMode(input, autoButton, manualButton, true);
        }
      });
    }, 60000);
  };

  const initializeLocalMockTrigger = () => {
    initializeEmptyPlanControls();
    initializeDashboardStack();
    const yearButton = document.getElementById('copyright-year');
    const hint = document.querySelector('.mock-account-hint');
    hint?.setAttribute('hidden', '');
    if (!yearButton) return;

    window.MOCK_ACCOUNT_MODE = Boolean(window.MOCK_ACCOUNT_MODE);
    initializeAccountMenuDismissal();
    let clickTimes = [];
    let developerWindowTimer = null;
    let developerWindowArmed = false;

    // Developer-mode activation is intentionally silent for public users.
    const showStatus = () => {};

    const disarmDeveloperWindow = () => {
      developerWindowArmed = false;
      clearTimeout(developerWindowTimer);
      developerWindowTimer = null;
    };

    yearButton.addEventListener('click', () => {
      const now = Date.now();
      clickTimes = clickTimes.filter(time => now - time <= CLICK_WINDOW_MS);
      clickTimes.push(now);

      if (clickTimes.length < 3) {
        showStatus(`Developer mode: ${clickTimes.length}/3 clicks registered.`);
        return;
      }

      clickTimes = [];
      developerWindowArmed = true;
      clearTimeout(developerWindowTimer);
      developerWindowTimer = setTimeout(() => {
        disarmDeveloperWindow();
        showStatus('Developer window expired after 10 seconds. Click 2026 three times to re-arm it.');
      }, DEVELOPER_WINDOW_MS);
      showStatus('Developer window armed for 10 seconds. Press Ctrl + Shift + L.');
    });

    document.addEventListener('keydown', event => {
      const isDeveloperShortcut = event.ctrlKey && event.shiftKey &&
        !event.altKey && !event.metaKey && event.key.toLowerCase() === 'l';
      if (!isDeveloperShortcut) return;

      event.preventDefault();
      if (!developerWindowArmed) {
        showStatus('Shortcut ignored. Click 2026 three times rapidly first.');
        return;
      }

      disarmDeveloperWindow();
      window.MOCK_ACCOUNT_MODE = true;
      showStatus('Local UI simulation active. Firebase authentication is unchanged.');
      if (typeof window.applyMockAccountMode === 'function') {
        window.applyMockAccountMode();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLocalMockTrigger, { once: true });
  } else {
    initializeLocalMockTrigger();
  }

  // Keep the layout guard available even if the application replaces dashboard
  // markup after the initial page load.
  document.addEventListener('toggle', event => {
    if (event.target.matches?.('.progress-overview-accordion')) initializeDashboardStack();
  }, true);
})();
