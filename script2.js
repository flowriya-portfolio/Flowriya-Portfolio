/* =========================================================
   FLOWRIYA — PORTFOLIO JAVASCRIPT
   MATCHING index.html + style2.css
========================================================= */

/* ================= SIDEBAR ================= */

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarClose = document.getElementById("sidebarClose");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const navLinks = document.querySelectorAll(".nav-link");

function openSidebar() {
  sidebar.classList.add("open");
  document.body.classList.add("sidebar-open");

  sidebarToggle.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  document.body.classList.remove("sidebar-open");

  sidebarToggle.setAttribute("aria-expanded", "false");
}

sidebarToggle.addEventListener("click", openSidebar);

sidebarClose.addEventListener("click", closeSidebar);

sidebarOverlay.addEventListener("click", closeSidebar);

/* Close sidebar after clicking navigation */

navLinks.forEach((link) => {
  link.addEventListener("click", closeSidebar);
});

/* ESC key */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSidebar();
  }
});

/* ================= ACTIVE NAV LINK ================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
  let currentSection = "home";

  const scrollPosition = window.scrollY + 250;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();

/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".skill-card, .project-card");

revealElements.forEach((element, index) => {
  element.classList.add("reveal");

  element.style.transitionDelay = `${(index % 2) * 0.12}s`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("show");

      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* ================= ABOUT COUNTERS ================= */

const counters = document.querySelectorAll("[data-count]");

let countersStarted = false;

function animateCounter(element) {
  const target = Number(element.dataset.count);

  const suffix = element.dataset.suffix || "";

  const duration = 1500;

  const startTime = performance.now();

  function updateCounter(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);

    const eased = 1 - Math.pow(1 - progress, 3);

    const value = Math.floor(target * eased);

    element.textContent = value + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

const statsSection = document.querySelector(".about");

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;

        counters.forEach((counter) => {
          animateCounter(counter);
        });

        statsObserver.disconnect();
      }
    },
    {
      threshold: 0.35,
    },
  );

  statsObserver.observe(statsSection);
}

/* ================= PROJECT LINKS ================= */

const projectLinks = document.querySelectorAll(".project-content a");

projectLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") {
      event.preventDefault();

      alert("Add your project link here.");
    }
  });
});

/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (targetId === "#" || targetId === "") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* ================= RESPONSIVE SIDEBAR ================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    closeSidebar();
  }
});
