// ================= BEAN CURSOR =================

const beanCursor = document.querySelector("#bean-cursor");

document.addEventListener("mousemove", function (e) {
  beanCursor.style.left = e.clientX + "px";
  beanCursor.style.top = e.clientY + "px";
});
// ================= DARK MODE =================

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}
// ================= SIDEBAR =================

const menuBtn = document.querySelector("#menu-btn");
const sidebar = document.querySelector("#sidebar");
const sidebarClose = document.querySelector("#sidebar-close");
const sidebarOverlay = document.querySelector("#sidebar-overlay");

menuBtn.addEventListener("click", function () {
  sidebar.classList.add("active");
  sidebarOverlay.classList.add("active");
});

sidebarClose.addEventListener("click", function () {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
});

sidebarOverlay.addEventListener("click", function () {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
});

// ================= CART =================

const cart = document.querySelector(".cart");
const cartBtn = document.querySelector("#cart-btn");
const cartClose = document.querySelector("#cart-close");

cartBtn.addEventListener("click", function () {
  cart.classList.add("active");
});

cartClose.addEventListener("click", function () {
  cart.classList.remove("active");
});

// ================= LOCAL STORAGE =================

let cartItems = JSON.parse(localStorage.getItem("coffeeCart")) || [];

// ================= ELEMENTS =================

const cartContent = document.querySelector("#cart-content");
const cartTotal = document.querySelector("#cart-total");
const cartCount = document.querySelector("#cart-count");

// ================= ADD TO CART =================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const image = button.dataset.image;

    const existingItem = cartItems.find(function (item) {
      return item.name === name;
    });

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({
        name: name,
        price: price,
        image: image,
        quantity: 1,
      });
    }

    saveCart();

    showCart();

    cart.classList.add("active");
  });
});

// ================= SHOW CART =================

function showCart() {
  cartContent.innerHTML = "";

  if (cartItems.length === 0) {
    cartContent.innerHTML = `

      <div class="empty-cart">

        <i class="fa-solid fa-mug-hot"></i>

        <p>
          Your cart is empty.
        </p>

      </div>

    `;

    updateCart();

    return;
  }

  cartItems.forEach(function (item, index) {
    const cartBox = document.createElement("div");

    cartBox.classList.add("cart-item");

    cartBox.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
      >


      <div class="cart-item-info">

        <h3>
          ${item.name}
        </h3>


        <strong>
          $${item.price.toFixed(2)}
        </strong>


        <div class="quantity">

          <button class="decrease">
            -
          </button>


          <span>
            ${item.quantity}
          </span>


          <button class="increase">
            +
          </button>

        </div>

      </div>


      <button class="remove-item">

        <i class="fa-solid fa-trash"></i>

      </button>

    `;

    // ================= DECREASE =================

    cartBox.querySelector(".decrease").addEventListener("click", function () {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartItems.splice(index, 1);
      }

      saveCart();

      showCart();
    });

    // ================= INCREASE =================

    cartBox.querySelector(".increase").addEventListener("click", function () {
      item.quantity++;

      saveCart();

      showCart();
    });

    // ================= REMOVE =================

    cartBox
      .querySelector(".remove-item")
      .addEventListener("click", function () {
        cartItems.splice(index, 1);

        saveCart();

        showCart();
      });

    cartContent.appendChild(cartBox);
  });

  updateCart();
}

// ================= UPDATE CART =================

function updateCart() {
  let total = 0;

  let count = 0;

  cartItems.forEach(function (item) {
    total += item.price * item.quantity;

    count += item.quantity;
  });

  cartTotal.textContent = "$" + total.toFixed(2);

  cartCount.textContent = count;
}

// ================= SAVE CART =================

function saveCart() {
  localStorage.setItem("coffeeCart", JSON.stringify(cartItems));
}

// ================= CHECKOUT =================

const checkoutBtn = document.querySelector("#checkout-btn");
checkoutBtn.addEventListener("click", function () {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  window.location.href = "order.html";
});

// ================= SEARCH =================

const searchInput = document.querySelector("#search-input");

const products = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase().trim();

  products.forEach(function (product) {
    const productName = product.querySelector("h3").textContent.toLowerCase();

    if (productName.includes(searchValue)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

// ================= FIRST LOAD =================

showCart();
