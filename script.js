document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");
  const dropdownItems = Array.from(document.querySelectorAll(".nav__item--dropdown"));
  const modal = document.getElementById("enquiry-modal");
  const form = document.getElementById("enquiry-form");

  function toggleNav() {
    if (!navList) return;
    const isOpen = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function closeNav() {
    if (!navList) return;
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle?.addEventListener("click", toggleNav);

  document.querySelectorAll(".nav__list a").forEach((link) => {
    link.addEventListener("click", () => closeNav());
  });

  function closeAllDropdowns() {
    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");
      const trigger = item.querySelector(".nav__trigger");
      trigger?.setAttribute("aria-expanded", "false");
    });
  }

  function toggleDropdown(item) {
    const trigger = item.querySelector(".nav__trigger");
    const isOpen = item.classList.toggle("is-open");
    trigger?.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      dropdownItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".nav__trigger")?.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector(".nav__trigger");
    trigger?.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(item);
    });

    item.querySelectorAll(".nav__submenu a").forEach((link) => {
      link.addEventListener("click", () => {
        closeAllDropdowns();
        closeNav();
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (dropdownItems.some((item) => item.contains(e.target))) return;
    closeAllDropdowns();
  });

  function openModal(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.classList.add("is-visible");
    target.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.openModal));
  });

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  modal?.querySelector(".modal__backdrop")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeAllDropdowns();
    }
  });

  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.scroll);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const chips = document.querySelectorAll(".chip");
  const products = document.querySelectorAll(".product");

  function initPlanSelection() {
    const planGroups = document.querySelectorAll(".plans");
    planGroups.forEach((group) => {
      const cards = Array.from(group.querySelectorAll(".plan"));
      if (!cards.length) return;

      const defaultCard = group.querySelector(".plan--highlight") || cards[0];

      function activate(card) {
        cards.forEach((c) => c.classList.remove("plan--active"));
        card.classList.add("plan--active");
      }

      activate(defaultCard);

      cards.forEach((card) => {
        card.addEventListener("click", () => activate(card));
      });
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      products.forEach((product) => {
        const category = product.dataset.category;
        const show = filter === "all" || category === filter;
        product.style.display = show ? "grid" : "none";
      });
    });
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    console.log("Enquiry submitted", formData);
    form.reset();
    closeModal();
    alert("Thanks! We will reach out shortly.");
    // Replace alert with your API call to create a request or start a purchase.
  });

  initPlanSelection();
});
