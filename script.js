// Application behavior is defined in index.html.
// Styles belong in styles.css; this file intentionally contains only valid JavaScript.

// Format the elapsed study window shown on goal cards. An end time earlier than
// the start time is treated as an overnight window.
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
      const action = event.target.closest('button');
      if (!action || action.id === 'account-menu-toggle') return;
      if (action.id === 'saved-plans-toggle' || action.id === 'restore-plans-toggle') return;
      closeAccountMenu();
    });
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
      input.disabled = isAuto;
      input.readOnly = isAuto;
      if (isAuto) input.value = getDhakaValue(input);
    };

    const bindMode = (input, autoId, manualId, autoValue) => {
      const autoButton = document.getElementById(autoId);
      const manualButton = document.getElementById(manualId);
      if (!input || !autoButton || !manualButton || input.dataset.modeBound === 'true') return;
      input.dataset.modeBound = 'true';
      autoButton.addEventListener('click', () => {
        setMode(input, autoButton, manualButton, true);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
      manualButton.addEventListener('click', () => setMode(input, autoButton, manualButton, false));
      input.addEventListener('input', () => {
        autoButton.setAttribute('aria-pressed', 'false');
        manualButton.setAttribute('aria-pressed', 'true');
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
