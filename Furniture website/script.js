/* ================= MOBILE MENU ================= */

const menuBtn = document.querySelector("#menu-btn");
const navbar = document.querySelector("#navbar");

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", function () {
    navbar.classList.toggle("show");

    if (navbar.classList.contains("show")) {
      menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
}

/* ================= CLOSE MOBILE MENU ================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (navbar) {
      navbar.classList.remove("show");
    }

    if (menuBtn) {
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
});

/* ================= ACTIVE NAVBAR ================= */

window.addEventListener("scroll", function () {
  let currentSection = "";

  const sections = document.querySelectorAll("section[id]");

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

/* ================= PROJECT FILTER ================= */

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach(function (card) {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "block";

        setTimeout(function () {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(.95)";

        setTimeout(function () {
          card.style.display = "none";
        }, 250);
      }
    });
  });
});

/* ================= PROJECT MODAL ================= */

const modal = document.querySelector("#projectModal");

const modalClose = document.querySelector("#modalClose");

const modalImage = document.querySelector("#modalImage");

const modalTitle = document.querySelector("#modalTitle");

const modalDescription = document.querySelector("#modalDescription");

const projectButtons = document.querySelectorAll(".view-project");

projectButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.stopPropagation();

    const title = button.getAttribute("data-title");

    const image = button.getAttribute("data-image");

    const description = button.getAttribute("data-description");

    if (modalImage) {
      modalImage.src = image;
    }

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalDescription) {
      modalDescription.textContent = description;
    }

    if (modal) {
      modal.classList.add("show");

      document.body.style.overflow = "hidden";
    }
  });
});

/* ================= CLOSE MODAL ================= */

function closeModal() {
  if (modal) {
    modal.classList.remove("show");

    document.body.style.overflow = "";
  }
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
}

/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

/* ================= CONTACT FORM ================= */

const contactForm = document.querySelector("#contactForm");

const successMessage = document.querySelector("#successMessage");

const successClose = document.querySelector("#successClose");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.querySelector("#name");

    const emailInput = document.querySelector("#email");

    const projectTypeInput = document.querySelector("#projectType");

    const messageInput = document.querySelector("#message");

    const name = nameInput ? nameInput.value.trim() : "";

    const email = emailInput ? emailInput.value.trim() : "";

    const projectType = projectTypeInput ? projectTypeInput.value : "";

    const message = messageInput ? messageInput.value.trim() : "";

    /* NAME */

    if (name === "") {
      showNotification("Please enter your name.");

      if (nameInput) {
        nameInput.focus();
      }

      return;
    }

    /* EMAIL */

    if (email === "") {
      showNotification("Please enter your email.");

      if (emailInput) {
        emailInput.focus();
      }

      return;
    }

    /* EMAIL FORMAT */

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showNotification("Please enter a valid email address.");

      if (emailInput) {
        emailInput.focus();
      }

      return;
    }

    /* PROJECT TYPE */

    if (projectType === "") {
      showNotification("Please select a project type.");

      if (projectTypeInput) {
        projectTypeInput.focus();
      }

      return;
    }

    /* MESSAGE */

    if (message === "") {
      showNotification("Please tell us about your project.");

      if (messageInput) {
        messageInput.focus();
      }

      return;
    }

    /* SUCCESS */

    showNotification(
      "Thank you, " + name + "! Your inquiry has been received.",
    );

    /* CLEAR FORM */

    contactForm.reset();
  });
}

/* ================= NOTIFICATION ================= */

let notificationTimer;

function showNotification(message) {
  if (!successMessage) {
    return;
  }

  const notificationText = successMessage.querySelector("p");

  if (notificationText) {
    notificationText.textContent = message;
  }

  clearTimeout(notificationTimer);

  successMessage.classList.remove("hide");
  successMessage.classList.remove("show");

  /*
       Force browser to restart animation
    */

  void successMessage.offsetWidth;

  successMessage.classList.add("show");

  notificationTimer = setTimeout(function () {
    hideNotification();
  }, 4000);
}

/* ================= HIDE NOTIFICATION ================= */

function hideNotification() {
  if (!successMessage) {
    return;
  }

  clearTimeout(notificationTimer);

  successMessage.classList.remove("show");

  successMessage.classList.add("hide");
}

/* ================= CLOSE SUCCESS MESSAGE ================= */

if (successClose) {
  successClose.addEventListener("click", function () {
    hideNotification();
  });
}

/* ================= SCROLL REVEAL ================= */

const revealItems = document.querySelectorAll(
  ".service-card, .process-item, .project-card, .about-content, .feature-content",
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-show");

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealItems.forEach(function (item) {
    item.classList.add("reveal");

    revealObserver.observe(item);
  });
}
