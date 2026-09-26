document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year Update
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header Scroll & ScrollSpy Navigation
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-menu a:not(.button)");
  const sections = document.querySelectorAll("section[id]");

  function handleScroll() {
    if (window.scrollY > 20) {
      header?.classList.add("is-scrolled");
    } else {
      header?.classList.remove("is-scrolled");
    }

    // ScrollSpy active link updates
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id") || "";
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Menu Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navMenu.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  // 4. Interactive Sourcing Package & Timeline Estimator
  const estimatorForm = document.getElementById("estimator-form");
  const resultPackage = document.getElementById("est-package");
  const resultTimeframe = document.getElementById("est-timeframe");
  const resultDeliverables = document.getElementById("est-deliverables");
  const resultCost = document.getElementById("est-cost");

  function calculateEstimate() {
    if (!estimatorForm) return;

    const category = estimatorForm.querySelector('input[name="est-category"]:checked')?.value || "apparel";
    const volume = estimatorForm.querySelector('input[name="est-volume"]:checked')?.value || "small";
    const service = estimatorForm.querySelector('input[name="est-service"]:checked')?.value || "search";

    let packageTitle = "Supplier Search & Shortlist";
    let timeframe = "10 - 14 Days";
    let deliverables = "Vetted supplier list, MOQ comparison, Quotation breakdown";
    let estPrice = "From $750";

    if (service === "verify") {
      packageTitle = "Supplier Verification & Audit";
      timeframe = "5 - 7 Days";
      deliverables = "Factory verification, Credential audit, Risk assessment report";
      estPrice = "From $500";
    } else if (service === "full") {
      packageTitle = "Full Production Management";
      timeframe = "25 - 35 Days (End-to-End)";
      deliverables = "Sampling coordination, Negotiation, On-site inspection, Logistics support";
      estPrice = "Custom / Monthly retainer";
    }

    // Volume adjustment
    if (volume === "large" && service === "search") {
      timeframe = "12 - 18 Days";
      estPrice = "From $950";
    }

    if (resultPackage) resultPackage.textContent = packageTitle;
    if (resultTimeframe) resultTimeframe.textContent = timeframe;
    if (resultDeliverables) resultDeliverables.textContent = deliverables;
    if (resultCost) resultCost.textContent = estPrice;
  }

  if (estimatorForm) {
    estimatorForm.addEventListener("change", calculateEstimate);
    calculateEstimate(); // Initial calculation
  }

  // 5. Animated Number Counters
  const counterElements = document.querySelectorAll("[data-count]");
  let animated = false;

  function animateCounters() {
    if (animated) return;

    counterElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        animated = true;
        const target = parseInt(el.getAttribute("data-count") || "0", 10);
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        let current = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / target));

        const timer = setInterval(() => {
          current += 1;
          el.textContent = `${prefix}${current}${suffix}`;
          if (current >= target) {
            el.textContent = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          }
        }, Math.max(stepTime, 20));
      }
    });
  }

  window.addEventListener("scroll", animateCounters, { passive: true });
  animateCounters();

  // 6. Contact Form Submission Handler
  const contactForm = document.querySelector("[data-contact-form]");
  const formNote = document.querySelector("[data-form-note]");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const formData = new FormData(contactForm);
      const lines = [];

      for (const [key, value] of formData.entries()) {
        const cleanValue = String(value).trim();
        if (cleanValue) {
          lines.push(`${key}: ${cleanValue}`);
        }
      }

      const subject = encodeURIComponent("New Sourcing Project Enquiry - IndiSource Partners");
      const body = encodeURIComponent("Sourcing Project Details:\n\n" + lines.join("\n"));
      window.location.href = `mailto:hello@indisourcepartners.com?subject=${subject}&body=${body}`;

      if (formNote) {
        formNote.innerHTML = "<strong style='color:#0f5a52;'>Success!</strong> Your default email client should now open with your project details formatted.";
      }
    });
  }
});
