const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("[data-nav-menu]");
const year = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

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

    const subject = encodeURIComponent("New sourcing project enquiry");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:hello@indisourcepartners.com?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = "Your email app should open with the project details filled in.";
    }
  });
}
