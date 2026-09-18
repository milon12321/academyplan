/* Fixed mobile navigation drawer: it floats above the page without shifting layout. */
#mobile-menu {
  position: fixed;
  top: 4.5rem;
  right: 1rem;
  z-index: 1000;
  width: 260px;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 5.5rem);
  overflow-y: auto;
  border: 1px solid #DED5BE;
  border-radius: 1rem;
  box-shadow: 0 20px 45px rgba(15, 42, 32, .22);
  transform-origin: top right;
  transition: opacity .2s ease, transform .2s ease, visibility .2s ease;
}

/* No backdrop is used: the homepage remains visually unchanged behind the drawer. */
#mobile-menu-backdrop {
  display: none !important;
}

#mobile-menu.hidden {
  display: block !important;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-.5rem) scale(.98);
}

#mobile-menu:not(.hidden) {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

/* Clear, touch-friendly states for menu destinations. */
.menu-nav-item {
  transition: color .2s ease, background-color .2s ease, transform .2s ease;
}
.menu-nav-item:hover,
.menu-nav-item:focus-visible {
  background: #F0F6F1;
  color: #1B4332;
}
.menu-nav-item:active {
  transform: translateY(1px);
}
body.view-account #account-nav-link,
body.view-storage #storage-open-mobile,
.menu-nav-item.is-active {
  background: #E8F1EA;
  color: #1B4332;
  font-weight: 700;
}

@media (max-width: 640px) {
  #mobile-menu {
    top: 4.25rem;
    right: .75rem;
    width: 260px;
    max-width: calc(100vw - 1.5rem);
  }
}

@media (min-width: 768px) {
  #mobile-menu,
  #mobile-menu-backdrop {
    display: none !important;
  }
}

.title {
  color: #5C6AC4;
}

/* Keep empty plan controls clear and intentional until a plan is selected. */
#active-plan-selector:has(option:only-child),
#active-plan-selector option[value=""] {
  color: #64748B;
}

#plan-name {
  background: #FFFFFF;
}

/* Dynamic academic avatar: branded placeholder, name initial, or uploaded image. */
.profile-avatar {
  position: relative;
  flex: 0 0 auto;
  border: 2px solid #E8A33D;
  background: linear-gradient(145deg, #F0F6F1, #DCEBE0);
  color: #1B4332;
  box-shadow: 0 0 0 3px #FFFFFF, 0 5px 14px rgba(15, 42, 32, .14);
  transition: background .25s ease, border-color .25s ease, box-shadow .25s ease, transform .25s ease;
}
.profile-avatar:hover { transform: translateY(-1px); box-shadow: 0 0 0 3px #FFFFFF, 0 7px 18px rgba(15, 42, 32, .18); }
.profile-avatar-placeholder { background: linear-gradient(145deg, #1B4332, #2C5A46); border-color: #E8A33D; color: #FBF7EE; }
.profile-avatar-initial { background: linear-gradient(145deg, #FFF8E9, #F3EDDC); border-color: #C97F1D; color: #1B4332; }
.profile-avatar-mark { font-size: 1.65rem; line-height: 1; font-weight: 700; text-shadow: 0 1px 1px rgba(0,0,0,.18); }
.profile-avatar-initial-mark { font-family: "Fraunces", Georgia, serif; font-size: 1.8rem; font-weight: 600; line-height: 1; }
.profile-avatar .avatar-image { display: block; width: 100%; height: 100%; border-radius: inherit; object-fit: cover; }
.profile-avatar .avatar-image[data-avatar-image] { animation: avatarReveal .3s ease both; }
@keyframes avatarReveal { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
@media (prefers-reduced-motion: reduce) { .profile-avatar, .profile-avatar .avatar-image { transition: none; animation: none; } }

/* Authentication cards are mutually exclusive; JavaScript controls the active view. */
#login-view.hidden,
#signup-view.hidden { display: none !important; }

/* Centered, consistent authentication controls for email and Google sign-in. */
.auth-form {
  max-width: 30rem;
  margin-inline: auto;
  padding: 1.25rem;
  border: 1px solid #E2E8F0;
  border-radius: 1rem;
  background: #FFFFFF;
  box-shadow: 0 8px 20px rgba(15, 23, 42, .06);
}

.auth-input { background: #FFFFFF; color: #1E293B; }
.auth-input:focus { border-color: #1B4332; box-shadow: 0 0 0 3px rgba(27, 67, 50, .1); }
.auth-submit, .auth-google { min-height: 3rem; }

/* Password recovery feedback remains clear and consistent with the auth card. */
#recovery-status:not(.hidden) {
  display: block;
  margin-top: .25rem;
  padding: .75rem .85rem;
  border-radius: .75rem;
  line-height: 1.45;
}
#recovery-status.text-success {
  border: 1px solid #BBF7D0;
  background: #F0FDF4;
  color: #166534;
}
#recovery-status.text-error {
  border: 1px solid #FECACA;
  background: #FEF2F2;
  color: #B91C1C;
}
.password-recovery-link {
  border: 0;
  padding: 0;
  background: transparent;
  text-decoration: none;
  transition: color .2s ease, opacity .2s ease;
}
.password-recovery-link:hover,
.password-recovery-link:focus-visible {
  color: #0F2A20;
  text-decoration: underline;
  text-decoration-color: #E8A33D;
  text-underline-offset: 3px;
}
.password-recovery-link:active { opacity: .75; }
#recovery-status.text-forest { color: #166534; }
#recovery-status.text-rust { color: #B91C1C; }
#recovery-status.text-success { color: #166534; }
#recovery-status.text-error { color: #B91C1C; }
#recovery-lookup:disabled { cursor: wait; opacity: .7; }
.signup-view { max-width: 42rem; margin-inline: auto; padding: 1.25rem; border: 1px solid #E2E8F0; border-radius: 1rem; background: #FFFFFF; box-shadow: 0 8px 20px rgba(15, 23, 42, .06); animation: signupReveal .25s ease both; }
.signup-form input:focus, .signup-form select:focus { border-color: #1B4332; box-shadow: 0 0 0 3px rgba(27, 67, 50, .1); }
.signup-form button { transition: transform .2s ease, background-color .2s ease, box-shadow .2s ease; }
.signup-form button:hover { transform: translateY(-1px); }
#signup-password-match.text-success { color: #166534; }
#signup-password-match.text-error { color: #B91C1C; }

/* Polished optional profile-picture upload control. */
.profile-picture-upload {
  display: flex;
  align-items: center;
  gap: .75rem;
  min-height: 3rem;
  width: 100%;
  padding: .35rem .45rem;
  border: 1px solid #DED5BE;
  border-radius: .75rem;
  background: #FBF7EE;
  color: #64748B;
  cursor: pointer;
  transition: border-color .2s ease, background-color .2s ease, box-shadow .2s ease;
}
.profile-picture-upload:hover {
  border-color: #C97F1D;
  background: #FFFDF8;
}
.profile-picture-upload:focus-within {
  border-color: #1B4332;
  box-shadow: 0 0 0 3px rgba(27, 67, 50, .1);
}
.profile-picture-upload-button {
  flex: 0 0 auto;
  padding: .55rem .9rem;
  border: 1px solid #CBD5E1;
  border-radius: .6rem;
  background: #FFFFFF;
  color: #1B4332;
  font-size: .8rem;
  font-weight: 700;
  line-height: 1;
}
.profile-picture-upload-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .8rem;
}
.profile-picture-input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (max-width: 640px) {
  .profile-picture-upload { gap: .5rem; }
  .profile-picture-upload-button { padding-inline: .7rem; }
}
@media (prefers-reduced-motion: reduce) {
  .profile-picture-upload { transition: none; }
}

.signup-status-banner {
  margin-top: 1.25rem;
  padding: .85rem 1rem;
  border: 1px solid transparent;
  border-radius: .75rem;
  font-size: .875rem;
  font-weight: 600;
  line-height: 1.45;
}
.signup-status-banner.signup-status-error {
  border-color: #FECACA;
  background: #FEF2F2;
  color: #B91C1C;
}
.signup-status-banner.signup-status-success {
  border-color: #BBF7D0;
  background: #F0FDF4;
  color: #166534;
}
.signup-status-banner.signup-status-error::before { content: '⚠ '; }
.signup-status-banner.signup-status-success::before { content: '✓ '; }
@keyframes signupReveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) { .signup-view { animation: none; } }
.auth-divider { display: flex; align-items: center; gap: .75rem; color: #94A3B8; font-size: .7rem; font-weight: 700; letter-spacing: .12em; }
.auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: #E2E8F0; }
.auth-divider span { flex: 0 0 auto; }


#plan-name::placeholder {
  color: #94A3B8;
  opacity: 1;
}

/* Structured goal cards keep every title, duration, study window, and action
   aligned consistently across the full stacked list. */
.goal-item-card {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) auto minmax(12rem, 1fr) auto;
  align-items: center;
  column-gap: .75rem;
  row-gap: .4rem;
}

.goal-item-card .goal-title {
  min-width: 0;
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goal-item-card .goal-duration {
  min-width: max-content;
  padding: .2rem .55rem;
  border: 1px solid #F2D39A;
  border-radius: 999px;
  background: #FFF7E6;
  color: #8F5A12;
  font-size: .7rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
}

.goal-item-card .goal-study-slot {
  min-width: 0;
  text-align: center;
}

.goal-item-card .goal-study-time {
  display: inline-block;
  overflow: hidden;
  max-width: 100%;
  color: #475569;
  font-size: .75rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goal-item-card .goal-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: .45rem;
  min-width: max-content;
  margin-left: 0;
}

.goal-item-card .goal-created-time {
  color: #64748B;
  font-size: .7rem;
  font-weight: 600;
  white-space: nowrap;
  text-align: right;
}

.goal-item-card > button[data-remove-goal] {
  min-width: 1.5rem;
  margin-left: 0;
}

@media (max-width: 640px) {
  .goal-item-card {
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: .55rem;
  }

  .goal-item-card .goal-duration {
    grid-column: 2;
    grid-row: 1;
  }

  .goal-item-card .goal-study-slot {
    grid-column: 1 / -1;
    grid-row: 2;
    text-align: left;
  }

  .goal-item-card .goal-actions {
    grid-column: 1 / -1;
    grid-row: 3;
    justify-content: flex-end;
  }
}

#active-plan-selector:invalid,
#active-plan-selector option[value=""] {
  color: #64748B;
}

/* Date and time controls remain editable; these are only visual defaults. */
#plan-start-date,
#plan-start-time,
#plan-end-date {
  background: #FFFFFF;
  color: #1E293B;
}

.site-footer {
  border-top: 1px solid #E2E8F0;
  background: #F8FAFC;
  color: #64748B;
  padding: 24px 16px;
  text-align: center;
  font-size: 14px;
  line-height: 1.6;
}

.site-footer p {
  margin: 0;
}

.footer-copyright {
  margin-bottom: 4px !important;
}

.footer-year {
  appearance: none;
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.footer-year:hover,
.footer-year:focus-visible {
  color: #1B4332;
  text-decoration: underline;
  text-decoration-color: #E8A33D;
  text-underline-offset: 3px;
}

.mock-account-status,
.mock-account-hint,
[data-developer-status],
[data-developer-message] {
  display: none !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}

.mock-account-hint kbd {
  display: none !important;
}

.mock-account-hint kbd {
  border: 1px solid #CBD5E1;
  border-bottom-width: 2px;
  border-radius: 4px;
  padding: 1px 4px;
  background: #FFFFFF;
  color: #475569;
  font-family: inherit;
  font-size: 10px;
}

.footer-separator {
  display: inline-block;
  margin: 0 .45rem;
  color: #94A3B8;
}

.footer-contact {
  display: inline-block;
}

.footer-contact-link {
  color: #64748B;
  text-decoration: underline;
  text-decoration-color: #CBD5E1;
  text-underline-offset: 3px;
  transition: color .2s ease, text-decoration-color .2s ease;
}

.footer-contact-link:hover,
.footer-contact-link:focus-visible {
  color: #1B4332;
  text-decoration-color: #E8A33D;
}

/* Three-dot account options are a bounded floating panel. */
#account-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: min(320px, calc(100vw - 2rem));
  min-width: 220px;
  max-width: calc(100vw - 2rem);
  max-height: min(32rem, calc(100vh - 6rem));
  margin-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  white-space: normal;
}

/* Nested plan accordions stay inside the menu and scroll independently. */
#account-menu > .border-t {
  margin-top: .5rem;
  padding-top: .35rem;
}

#account-menu #saved-plans-panel,
#account-menu #restore-plans-panel {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  overflow-wrap: anywhere;
}

#account-menu #plan-list {
  max-height: 14rem;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: .15rem .1rem .25rem 0;
}

#account-menu #account-trash-list {
  max-height: 10rem;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: .15rem .1rem .25rem 0;
}

#account-menu #saved-plans-panel > *,
#account-menu #restore-plans-panel > * {
  min-width: 0;
}

#account-menu.hidden,
#account-menu.is-closing {
  display: none !important;
  visibility: hidden;
  pointer-events: none;
}

#account-menu:not(.hidden):not(.is-closing) {
  visibility: visible;
}

/* Owner diagnostics are a floating, owner-only modal and never affect page layout. */
#owner-health-modal { display: none; }
#owner-health-modal:not(.hidden) { display: block; }
#owner-health-modal .owner-health-panel { color: #0F172A; }

/* Keep the onboarding form readable above the workspace backdrop. */
#onboarding-profile-modal .onboarding-profile-panel { color: #0F172A; }
#onboarding-profile-modal .onboarding-profile-panel h2,
#onboarding-profile-modal .onboarding-profile-panel p,
#onboarding-profile-modal .onboarding-profile-panel label { max-width: 100%; }
#owner-health-modal .owner-health-panel h2,
#owner-health-modal .owner-health-panel h3,
#owner-health-modal .owner-health-panel p,
#owner-health-modal .owner-health-panel span,
#owner-health-modal .owner-health-panel div,
#owner-health-modal .owner-health-panel button { max-width: 100%; }

/* Dedicated Study Storage workspace view. */
#study-storage {
  min-height: calc(100vh - 4rem);
  padding: 2rem 0 3rem;
  background: #F8FAFC;
}
#study-storage .storage-modal-panel {
  width: 100%;
  background: #FFFFFF;
  color: #0F172A;
  border-radius: 1.25rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, .08);
}
#storage-back {
  transition: color .2s ease, background-color .2s ease, border-color .2s ease, transform .2s ease;
}
#storage-back:hover { transform: translateX(-2px); }
#storage-back:focus-visible { outline: 2px solid #1B4332; outline-offset: 3px; }
@media (max-width: 640px) {
  #study-storage { padding: 1rem 0 2rem; }
  #study-storage .storage-modal-panel { border-radius: 1rem; }
}

/* Dedicated navigation views prevent homepage sections from stacking vertically. */
body.view-account #landing-hero,
body.view-account #study-storage,
body.view-account #owner-dashboard,
body.view-storage #landing-hero,
body.view-storage #profile,
body.view-storage #plan-workspace,
body.view-storage #owner-dashboard,
body.view-owner #landing-hero,
body.view-owner #study-storage,
body.view-owner #profile,
body.view-owner #plan-workspace {
  display: none !important;
}

body.view-account #profile {
  display: block !important;
}

body.view-owner #owner-dashboard {
  display: block !important;
}

/* Owner Dashboard is a dedicated destination, never a section below the home page. */
body.view-owner #landing-hero,
body.view-owner #profile,
body.view-owner #plan-workspace,
body.view-owner #study-storage {
  display: none !important;
}

body.view-storage #study-storage {
  display: block !important;
}

body.view-home #profile,
body.view-home #study-storage {
  display: none !important;
}

body.view-home #landing-hero {
  display: flex !important;
}

/* The study dashboard is intentionally a single vertical flow at every
   viewport size. A block layout prevents the expanded report from creating a
   second, independently stretching column. */
.dashboard-stack,
.dashboard-stack-container,
.study-dashboard-grid {
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.dashboard-stack-container > * {
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.dashboard-stack-container > * + * {
  margin-top: 1.5rem;
}

.study-plan-panel {
  min-width: 0;
}

.progress-overview-accordion {
  min-width: 0;
}

.progress-overview-accordion > summary {
  list-style: none;
}

.progress-overview-accordion > summary::-webkit-details-marker {
  display: none;
}

.progress-overview-toggle {
  transition: background-color .2s ease, box-shadow .2s ease, transform .2s ease;
}

.progress-overview-toggle:hover {
  background: #F8FAFC;
}

.progress-overview-chevron {
  transition: transform .3s ease;
}

.progress-overview-accordion[open] .progress-overview-chevron {
  transform: rotate(180deg);
}

.progress-overview-content {
  margin-top: .75rem;
  animation: progressOverviewOpen .3s ease both;
}

@keyframes progressOverviewOpen {
  from { opacity: 0; transform: translateY(-.5rem); }
  to { opacity: 1; transform: translateY(0); }
}

.progress-overview-accordion,
.progress-overview-accordion[open] {
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  height: auto;
}

.progress-overview-accordion[open] .progress-overview-content {
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  height: auto;
  max-height: none;
  overflow: visible;
}

@media (prefers-reduced-motion: reduce) {
  .progress-overview-content,
  .progress-overview-chevron,
  .progress-overview-toggle {
    animation: none;
    transition: none;
  }
}

/* Password recovery uses an explicit transition instead of an abrupt hidden/display swap. */
#recovery-modal {
  opacity: 0;
  transition: opacity .22s ease;
}
#recovery-modal.recovery-modal-open,
#recovery-modal.recovery-modal-closing {
  display: block !important;
}
#recovery-modal.recovery-modal-open { opacity: 1; }
#recovery-modal.recovery-modal-closing { opacity: 0; }
#recovery-modal > div > div {
  transform: translateY(8px) scale(.985);
  transition: transform .22s ease;
}
#recovery-modal.recovery-modal-open > div > div { transform: translateY(0) scale(1); }
body.recovery-modal-active { overflow: hidden; }
#recovery-status.text-success { color: #166534; }
#recovery-status.text-error { color: #B91C1C; }
@media (prefers-reduced-motion: reduce) {
  #recovery-modal,
  #recovery-modal > div > div { transition: none; }
}

/* Password recovery feedback stays inside the dialog and never dismisses it. */
#recovery-status:not(.hidden) {
  display: block;
  min-height: 1.5rem;
  margin-top: .25rem;
  padding: .75rem .85rem;
  border-radius: .75rem;
  font-size: .875rem;
  font-weight: 600;
  line-height: 1.45;
}
#recovery-status.text-success {
  border: 1px solid #BBF7D0;
  background: #F0FDF4;
  color: #166534;
}
#recovery-status.text-error {
  border: 1px solid #FECACA;
  background: #FEF2F2;
  color: #B91C1C;
}
#recovery-status[role="alert"]::before { content: '⚠ '; }
#recovery-status[role="status"]::before { content: '✓ '; }
