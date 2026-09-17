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

/* Three-dot account options are a hidden floating overlay by default. */
#account-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: max-content;
  min-width: 220px;
  max-width: 280px;
  margin-top: .5rem;
  overflow: hidden;
  box-sizing: border-box;
  white-space: nowrap;
}

#account-menu.hidden {
  display: none !important;
  visibility: hidden;
}

#account-menu:not(.hidden) {
  visibility: visible;
}

/* Owner diagnostics are a floating, owner-only modal and never affect page layout. */
#owner-health-modal { display: none; }
#owner-health-modal:not(.hidden) { display: block; }
#owner-health-modal .owner-health-panel { color: #0F172A; }
#owner-health-modal .owner-health-panel h2,
#owner-health-modal .owner-health-panel h3,
#owner-health-modal .owner-health-panel p,
#owner-health-modal .owner-health-panel span,
#owner-health-modal .owner-health-panel div,
#owner-health-modal .owner-health-panel button { max-width: 100%; }

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

/* The study dashboard starts as a focused single-column plan. The report is
   opt-in so a closed overview never leaves an empty grid column. */
.study-dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
  align-items: stretch;
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

.study-dashboard-grid {
  grid-template-columns: 1fr;
}

.progress-overview-accordion,
.progress-overview-accordion[open] {
  width: 100%;
}

.progress-overview-accordion[open] {
  display: block;
}

.progress-overview-accordion[open] .progress-overview-content {
  width: 100%;
  height: auto;
}

@media (prefers-reduced-motion: reduce) {
  .progress-overview-content,
  .progress-overview-chevron,
  .progress-overview-toggle {
    animation: none;
    transition: none;
  }
}
