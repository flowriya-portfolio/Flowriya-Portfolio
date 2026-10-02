/* ================= MOBILE MENU ================= */

const menuBtn = document.querySelector("#menuBtn");
const mobileMenu = document.querySelector("#mobileMenu");
const closeMenu = document.querySelector("#closeMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
  });
}

if (closeMenu && mobileMenu) {
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
}

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

/* ================= ORDER MODAL ================= */

const orderBtn = document.querySelector("#orderBtn");
const orderModal = document.querySelector("#orderModal");
const modalClose = document.querySelector("#modalClose");

if (orderBtn && orderModal) {
  orderBtn.addEventListener("click", () => {
    orderModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

if (modalClose && orderModal) {
  modalClose.addEventListener("click", () => {
    orderModal.classList.remove("active");
    document.body.style.overflow = "";
  });
}

/* CLOSE MODAL BY CLICKING OUTSIDE */

if (orderModal) {
  orderModal.addEventListener("click", (event) => {
    if (event.target === orderModal) {
      orderModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

/* ================= FORM ================= */

const orderForm = document.querySelector("#orderForm");
const successMessage = document.querySelector("#successMessage");
const successClose = document.querySelector("#successClose");

if (orderForm) {
  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const occasion = document.querySelector("#occasion").value;
    const message = document.querySelector("#message").value.trim();

    if (!name) {
      showSuccess("Please enter your name.");
      return;
    }

    if (!email) {
      showSuccess("Please enter your email.");
      return;
    }

    if (!occasion) {
      showSuccess("Please select an occasion.");
      return;
    }

    if (!message) {
      showSuccess("Please tell us about your cake.");
      return;
    }

    showSuccess(`Thank you, ${name}! Your inquiry has been received.`);

    orderForm.reset();

    if (orderModal) {
      orderModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

/* ================= SUCCESS MESSAGE ================= */

function showSuccess(message) {
  if (!successMessage) return;

  const text = successMessage.querySelector("p");

  if (text) {
    text.textContent = message;
  }

  successMessage.classList.remove("show");

  void successMessage.offsetWidth;

  successMessage.classList.add("show");

  clearTimeout(window.successTimer);

  window.successTimer = setTimeout(() => {
    successMessage.classList.remove("show");
  }, 4000);
}

/* ================= CLOSE SUCCESS ================= */

if (successClose && successMessage) {
  successClose.addEventListener("click", () => {
    clearTimeout(window.successTimer);

    successMessage.classList.remove("show");
  });
}

/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* ================= NAV ACTIVE ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
