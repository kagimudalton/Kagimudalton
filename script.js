/* ═══════════════════════════════════════════════════
   KAGIMU DALTON — PORTFOLIO SCRIPTS
═══════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Dynamic year ── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Navbar: scroll state + active link ── */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function onScroll() {
    // Sticky shadow
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active nav link
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav toggle ── */
  const navToggle = document.getElementById("navToggle");
  const navLinksMenu = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinksMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close on link click
  navLinksMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll(
    ".project-card, .social-link, .about-bio p, .skill-item, .contact-sub, .email-link"
  );

  // Add reveal classes
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    // Stagger cards in the same parent
    const siblings = Array.from(el.parentElement.children).filter((c) =>
      c.classList.contains("reveal")
    );
    const idx = siblings.indexOf(el);
    if (idx > 0 && idx < 6) {
      el.classList.add(`reveal-delay-${idx}`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  /* ── Skill bar animation ── */
  const skillItems = document.querySelectorAll(".skill-item");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  skillItems.forEach((el) => skillObserver.observe(el));

  /* ── Section label + title reveals ── */
  document
    .querySelectorAll(".section-label, .section-title, .section-sub")
    .forEach((el, i) => {
      el.classList.add("reveal");
      if (el.classList.contains("section-title")) el.classList.add("reveal-delay-1");
      if (el.classList.contains("section-sub")) el.classList.add("reveal-delay-2");
      observer.observe(el);
    });

  /* ── Smooth active nav link style ── */
  const style = document.createElement("style");
  style.textContent = `
    .nav-link.active { color: var(--text-primary) !important; }
    .nav-link.active::after { width: 100% !important; }
  `;
  document.head.appendChild(style);

})();
