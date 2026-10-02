/* =====================================================
   VEXORA DIGITAL AGENCY
===================================================== */

/* ================= MOBILE MENU ================= */

const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

/* Close mobile menu after clicking a link */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});
/* ================= CONTACT FORM ================= */

const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();

  if (name === "") {
    showMessage("Please enter your name.");
    return;
  }

  showMessage(`Thank you, ${name}! Your message has been received.`);

  contactForm.reset();
});

/* ================= CUSTOM MESSAGE ================= */

function showMessage(message) {
  const oldMessage = document.querySelector(".success-message");

  if (oldMessage) {
    oldMessage.remove();
  }

  const messageBox = document.createElement("div");

  messageBox.className = "success-message";

  messageBox.innerHTML = `
        <div class="success-icon">
            <i class="fa-solid fa-check"></i>
        </div>

        <div class="success-content">
            <strong>Message Sent</strong>
            <p>${message}</p>
        </div>

        <button class="success-close">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

  document.body.appendChild(messageBox);

  const closeButton = messageBox.querySelector(".success-close");

  closeButton.addEventListener("click", () => {
    messageBox.classList.add("hide");

    setTimeout(() => {
      messageBox.remove();
    }, 400);
  });

  setTimeout(() => {
    if (document.body.contains(messageBox)) {
      messageBox.classList.add("hide");

      setTimeout(() => {
        messageBox.remove();
      }, 400);
    }
  }, 4000);
}

/* ================= ACTIVE NAVBAR ================= */

const sections = document.querySelectorAll("section[id]");

const links = document.querySelectorAll(".navbar nav a");

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

  links.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
