/* =========================================================================
   CharityCareCheck.com — Shared JS
   Handles: sticky-nav active link highlighting, mobile menu, dark/light
   theme toggle (persisted), toast notifications, and FAQ accordions.
   Plain vanilla JS, no dependencies, runs on every page via <script src>.
   ========================================================================= */

(function () {
  'use strict';

  /* ---------------- Theme (light/dark) ---------------- */
  var THEME_KEY = 'ccc-theme';

  function getPreferredTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage blocked */ }
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function initTheme() {
    applyTheme(getPreferredTheme());
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
      });
    });
  }

  /* ---------------- Mobile menu ---------------- */
  function initMobileMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var links = document.querySelector('[data-nav-links]');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // On mobile, tapping a dropdown label expands its panel instead of navigating away
    links.querySelectorAll('.nav__dropdown > a').forEach(function (label) {
      label.addEventListener('click', function (e) {
        if (window.innerWidth > 880) return; // desktop uses hover
        var parent = label.closest('.nav__dropdown');
        var alreadyOpen = parent.classList.contains('is-open');
        if (!alreadyOpen) {
          e.preventDefault();
          parent.classList.add('is-open');
        }
      });
    });

    // Close mobile menu when a real navigation link is tapped
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth > 880) return;
        if (a.parentElement.classList.contains('nav__dropdown')) return;
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 880) {
        links.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------------- Active link highlighting ---------------- */
  function initActiveLinks() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a, .nav__dropdown-panel a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop();
      if (href === path || (href === 'index.html' && path === '')) {
        a.classList.add('is-active');
        var dropdownParent = a.closest('.nav__dropdown');
        if (dropdownParent) {
          var label = dropdownParent.querySelector('a');
          if (label) label.classList.add('is-active');
        }
      }
    });
  }

  /* ---------------- Sticky header shadow on scroll ---------------- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- FAQ / generic accordions ---------------- */
  function initAccordions() {
    document.querySelectorAll('.accordion-item').forEach(function (item) {
      var trigger = item.querySelector('.accordion-trigger');
      var panel = item.querySelector('.accordion-panel');
      if (!trigger || !panel) return;

      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        if (item.closest('[data-accordion-single]')) {
          item.parentElement.querySelectorAll('.accordion-item.is-open').forEach(function (openItem) {
            if (openItem !== item) {
              openItem.classList.remove('is-open');
              openItem.querySelector('.accordion-panel').style.maxHeight = null;
              openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
            }
          });
        }

        item.classList.toggle('is-open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
      });
    });
  }

  /* ---------------- Toast notifications ---------------- */
  function ensureToastRegion() {
    var region = document.querySelector('.toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    return region;
  }

  function showToast(message, type, duration) {
    var region = ensureToastRegion();
    var toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' toast--' + type : '');
    toast.textContent = message;
    region.appendChild(toast);
    window.setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity .2s ease';
      window.setTimeout(function () { toast.remove(); }, 200);
    }, duration || 4000);
  }
  window.showToast = showToast; // exposed globally for any page/widget to call

  /* ---------------- Init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileMenu();
    initActiveLinks();
    initHeaderScroll();
    initAccordions();
  });
})();
