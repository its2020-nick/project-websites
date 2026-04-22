/**
 * main.js — Navigation toggle, scroll effects, active link, accordion, form validation
 * Wekan Kasarani School, Mwiki
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. HAMBURGER / MOBILE NAV
     ============================================================ */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      hamburger.classList.toggle('open', !isOpen);
      mobileNav.classList.toggle('open', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ============================================================
     2. ACTIVE NAV LINK (highlight current page)
     ============================================================ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-nav a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ============================================================
     3. STICKY NAVBAR — subtle background change on scroll
     ============================================================ */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.5)'
        : '0 2px 12px rgba(0,0,0,0.35)';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ============================================================
     4. FAQ ACCORDION
     ============================================================ */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all open items (single-open behaviour)
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
    });
  });

  /* ============================================================
     5. CONTACT FORM VALIDATION
     ============================================================ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-feedback').forEach(fb => {
        fb.classList.remove('error', 'success');
        fb.textContent = '';
      });

      // Validate name
      const nameField = contactForm.querySelector('#form-name');
      if (nameField && nameField.value.trim().length < 2) {
        showError(nameField, 'Please enter your full name.');
        valid = false;
      }

      // Validate email
      const emailField = contactForm.querySelector('#form-email');
      if (emailField) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          showError(emailField, 'Please enter a valid email address.');
          valid = false;
        }
      }

      // Validate message
      const msgField = contactForm.querySelector('#form-message');
      if (msgField && msgField.value.trim().length < 10) {
        showError(msgField, 'Please enter a message (at least 10 characters).');
        valid = false;
      }

      if (valid) {
        // Show success message (Formspree / backend would handle real send)
        const successMsg = contactForm.querySelector('#form-success');
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.textContent = document.documentElement.lang === 'sw'
            ? 'Asante! Ujumbe wako umetumwa. Tutawasiliana nawe hivi karibuni.'
            : 'Thank you! Your message has been sent. We will get back to you shortly.';
        }
        contactForm.reset();
        setTimeout(() => {
          if (successMsg) successMsg.style.display = 'none';
        }, 6000);
      }
    });
  }

  function showError(field, message) {
    const feedback = field.parentElement.querySelector('.form-feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.classList.add('error');
    }
    field.focus();
  }

  /* ============================================================
     6. CURRICULUM LEVEL TABS
     ============================================================ */
  const tabs = document.querySelectorAll('.level-tab');
  const panels = document.querySelectorAll('.level-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.hidden = true);

      tab.classList.add('active');
      const target = document.getElementById(tab.getAttribute('data-target'));
      if (target) target.hidden = false;
    });
  });

  // Show first tab by default
  if (tabs.length > 0 && panels.length > 0) {
    tabs[0].classList.add('active');
    panels.forEach((p, i) => { p.hidden = i !== 0; });
  }

  /* ============================================================
     7. SMOOTH SCROLL for anchor links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')) || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     8. LAZY LOAD IMAGES (native + fallback polyfill hint)
     ============================================================ */
  // Native lazy loading is set via loading="lazy" in HTML.
  // This just adds an IntersectionObserver fade-in effect.
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          imgObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.4s ease';
      imgObserver.observe(img);
    });
  }

  /* ============================================================
     CLASSROOM SLIDESHOW
     ============================================================ */
  ['classroom-slideshow', 'sports-slideshow', 'science-slideshow', 'arts-slideshow'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const slides = el.querySelectorAll('.slideshow-img');
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 3000);
  });

});
