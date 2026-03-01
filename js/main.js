/* ===========================
   Laundry Day — Main JS
   No dependencies.
   =========================== */

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('nav__menu--open');
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('nav__menu--open');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('nav__menu--open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('nav__menu--open');
        toggle.focus();
      }
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('nav__menu--open') &&
          !menu.contains(e.target) &&
          !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('nav__menu--open');
      }
    });
  }

  // --- Sticky Header Shadow ---
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('nav--scrolled');
      } else {
        header.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }

  // --- Dynamic Bubble Generator ---
  var animations = ['bubble-float-1', 'bubble-float-2', 'bubble-float-3', 'bubble-drift'];

  function createBubble(container, isDark) {
    var el = document.createElement('div');
    el.className = 'bubble' + (isDark ? ' bubble--dark' : '');
    var size = 8 + Math.random() * 50;
    var anim = animations[Math.floor(Math.random() * animations.length)];
    var duration = 5 + Math.random() * 9;
    var delay = Math.random() * 10;
    var opacity = 0.25 + Math.random() * 0.55;
    el.style.cssText =
      'width:' + size + 'px;height:' + size + 'px;' +
      'top:' + (Math.random() * 95) + '%;' +
      'left:' + (Math.random() * 95) + '%;' +
      'opacity:' + opacity + ';' +
      'animation:' + anim + ' ' + duration + 's ease-in-out ' + delay + 's infinite;';
    container.appendChild(el);
  }

  function createRoamingBubble(container, isDark) {
    var el = document.createElement('div');
    el.className = 'bubble' + (isDark ? ' bubble--dark' : '');
    var size = 60 + Math.random() * 80;
    var duration = 15 + Math.random() * 15;
    var delay = Math.random() * 5;
    el.style.cssText =
      'width:' + size + 'px;height:' + size + 'px;' +
      'top:' + (10 + Math.random() * 60) + '%;' +
      'left:' + (10 + Math.random() * 60) + '%;' +
      'opacity:0.35;' +
      'animation:bubble-roam ' + duration + 's ease-in-out ' + delay + 's infinite;';
    container.appendChild(el);
  }

  // Hero — ~35 small/medium + 2 roaming
  var heroSection = document.querySelector('.hero');
  if (heroSection) {
    for (var i = 0; i < 35; i++) createBubble(heroSection, false);
    createRoamingBubble(heroSection, false);
    createRoamingBubble(heroSection, false);
  }

  // Guide — ~22 small/medium + 2 roaming
  var guideSection = document.querySelector('.guide');
  if (guideSection) {
    for (var i = 0; i < 22; i++) createBubble(guideSection, false);
    createRoamingBubble(guideSection, false);
    createRoamingBubble(guideSection, false);
  }

  // Special (dark bg) — ~18 small/medium + 2 roaming
  var specialSection = document.querySelector('.special');
  if (specialSection) {
    for (var i = 0; i < 18; i++) createBubble(specialSection, true);
    createRoamingBubble(specialSection, true);
    createRoamingBubble(specialSection, true);
  }

  // --- Scroll-triggered Animations ---
  var animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
