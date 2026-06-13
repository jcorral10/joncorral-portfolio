/* ==========================================================================
   Jon Corral Portfolio — Interactions
   Wabi-sabi: gentle, purposeful, organic motion
   ========================================================================== */

(() => {
  'use strict';

  /* ----- DOM ----- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const cursorDot = document.getElementById('cursor-dot');

  /* ================================================================
     NAV — scroll glass effect
     ================================================================ */
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ================================================================
     NAV — mobile toggle
     ================================================================ */
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    const bars = navToggle.querySelectorAll('.nav__toggle-bar');
    if (open) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = 'none'; b.style.opacity = '1'; });
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.querySelectorAll('.nav__toggle-bar').forEach(b => {
        b.style.transform = 'none'; b.style.opacity = '1';
      });
    });
  });

  /* ================================================================
     SMOOTH SCROLL — anchor links
     ================================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - (nav.offsetHeight + 16);
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ================================================================
     SCROLL REVEAL — Intersection Observer
     ================================================================ */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ================================================================
     COUNTER — animate stat numbers gently
     ================================================================ */
  const statNums = document.querySelectorAll('.stat__number');

  const animateNumber = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+)(\+?)$/);
    if (!match) return; // skip non-numeric (∞, etc.)

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const dur = 1200;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.floor(ease * target)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = `${target}${suffix}`;
    };

    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateNumber(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => cio.observe(el));
  }

  /* ================================================================
     MARQUEE — pause on hover
     ================================================================ */
  const marquee = document.getElementById('marquee-track');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => { marquee.style.animationPlayState = 'paused'; });
    marquee.addEventListener('mouseleave', () => { marquee.style.animationPlayState = 'running'; });
  }

  /* ================================================================
     CUSTOM CURSOR DOT — desktop only, vermillion
     ================================================================ */
  if (cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, dx = 0, dy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!cursorDot.classList.contains('is-active')) {
        cursorDot.classList.add('is-active');
      }
    });

    // Smooth trailing with rAF
    const lerp = (a, b, n) => a + (b - a) * n;
    const moveDot = () => {
      dx = lerp(dx, mx, 0.15);
      dy = lerp(dy, my, 0.15);
      cursorDot.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
      requestAnimationFrame(moveDot);
    };
    requestAnimationFrame(moveDot);

    // Expand on interactive elements
    const interactives = document.querySelectorAll('a, button, .work-card, .service, .ai-cap');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('is-hovering'));
    });
  }

  /* ================================================================
     ACTIVE NAV HIGHLIGHT — subtle
     ================================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + nav.offsetHeight + 80;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive ? 'var(--ink)' : '';
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

})();
