const products = [
  {
    id: 1,
    name: "Rose Velours",
    price: 145,
    category: "women",
    image: "images/img 1.jpg",
  },

  {
    id: 2,
    name: "Noir Élégance",
    price: 175,
    category: "men",
    image: "images/img 12.jpg",
  },

  {
    id: 3,
    name: "Golden and burgendy Aura",
    price: 160,
    category: "unisex",
    image: "images/img 3.jpg",
  },

  {
    id: 4,
    name: "Fleur Blanche",
    price: 135,
    category: "women",
    image: "images/img 4.jpg",
  },

  {
    id: 5,
    name: "Oud Noir",
    price: 185,
    category: "men",
    image: "images/img 5.jpg",
  },

  {
    id: 6,
    name: "Velvet Rose",
    price: 150,
    category: "women",
    image: "images/img 2.jpg",
  },

  {
    id: 7,
    name: "Amber Secret",
    price: 170,
    category: "unisex",
    image: "images/img 7.jpg",
  },

  {
    id: 8,
    name: "Pure Élan",
    price: 125,
    category: "women",
    image: "images/img 8.jpg",
  },

  {
    id: 9,
    name: "Royal Oud",
    price: 195,
    category: "men",
    image: "images/img 9.jpg",
  },

  {
    id: 10,
    name: "Blush Bloom",
    price: 140,
    category: "women",
    image: "images/img 10.jpg",
  },

  {
    id: 11,
    name: "Velvet Musk",
    price: 165,
    category: "unisex",
    image: "images/img 11.jpg",
  },

  {
    id: 12,
    name: "Black Amber",
    price: 180,
    category: "men",
    image: "images/img 12.jpg",
  },

  {
    id: 13,
    name: "Petal Kiss",
    price: 130,
    category: "women",
    image: "images/img 13.jpg",
  },

  {
    id: 14,
    name: "Élan Signature",
    price: 190,
    category: "unisex",
    image: "images/img 14.jpg",
  },

  {
    id: 15,
    name: "Midnight Rose",
    price: 155,
    category: "women",
    image: "images/img 15.jpg",
  },
];

/* =====================================================
   ELEMENTS
===================================================== */

const productsContainer = document.querySelector("#products");

const filters = document.querySelectorAll(".filter");

const searchBtn = document.querySelector("#searchBtn");
const searchBox = document.querySelector("#searchBox");
const searchInput = document.querySelector("#searchInput");
const clearSearch = document.querySelector("#clearSearch");

const cart = document.querySelector("#cart");
const cartBtn = document.querySelector("#cartBtn");
const closeCart = document.querySelector("#closeCart");
const cartOverlay = document.querySelector("#cartOverlay");

const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartHeadCount = document.querySelector("#cartHeadCount");
const cartTotal = document.querySelector("#cartTotal");
const buyBtn = document.querySelector("#buyBtn");

const wishlistCount = document.querySelector("#wishlistCount");
const wishlistHeaderCount = document.querySelector("#wishlistHeaderCount");

const sidebar = document.querySelector("#sidebar");
const openSidebar = document.querySelector("#openSidebar");
const closeSidebar = document.querySelector("#closeSidebar");
const sidebarOverlay = document.querySelector("#sidebarOverlay");

const toast = document.querySelector("#toast");

const storyBtn = document.querySelector("#storyBtn");
const storyButtons = document.querySelectorAll("#storyBtn2");

const storyModal = document.querySelector("#storyModal");
const closeStory = document.querySelector("#closeStory");

const newsletterForm = document.querySelector(".newsletter-form");

/* =====================================================
   LOCAL STORAGE
===================================================== */

let cartData = JSON.parse(localStorage.getItem("elaneCart")) || [];

let wishlistData = JSON.parse(localStorage.getItem("elaneWishlist")) || [];

/* =====================================================
   PAGE
===================================================== */

const page = document.body.dataset.page || "home";

let currentFilter = "all";

let wishlistOnly = false;

/* =====================================================
   TOAST
===================================================== */

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts(list) {
  if (!productsContainer) {
    return;
  }

  productsContainer.innerHTML = "";

  /* EMPTY */

  if (list.length === 0) {
    productsContainer.innerHTML = `
            <div class="empty-products">

                <i class="fa-solid fa-spray-can-sparkles"></i>

                <h3>
                    No perfume found
                </h3>

                <p>
                    Try another fragrance or category.
                </p>

            </div>
        `;

    return;
  }

  /* PRODUCTS */

  list.forEach(function (product) {
    const liked = wishlistData.includes(product.id);

    const card = document.createElement("article");

    card.className = "product";

    card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <button
                    class="wishlist ${liked ? "liked" : ""}"
                    data-id="${product.id}"
                    aria-label="Add to wishlist"
                >

                    <i class="
                        ${liked ? "fa-solid" : "fa-regular"}
                        fa-heart
                    "></i>

                </button>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ÉLANÉ Eau de Parfum
                </p>


                <div class="product-bottom">

                    <strong class="product-price">
                        $${product.price}
                    </strong>

                    <button
                        class="add-cart"
                        data-id="${product.id}"
                    >
                        Add to Bag
                    </button>

                </div>

            </div>
        `;

    productsContainer.appendChild(card);
  });

  /* =================================================
       ADD TO BAG BUTTONS
    ================================================= */

  const addButtons = productsContainer.querySelectorAll(".add-cart");

  addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);

      addToCart(id);
    });
  });

  /* =================================================
       WISHLIST BUTTONS
    ================================================= */

  const wishlistButtons = productsContainer.querySelectorAll(".wishlist");

  wishlistButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);

      toggleWishlist(id);
    });
  });
}

/* =====================================================
   GET PRODUCTS
===================================================== */

function getProducts() {
  let result = products;

  /* HOME = ONLY 6 PRODUCTS */

  if (page === "home") {
    result = products.slice(0, 6);
  }

  /* WISHLIST */

  if (wishlistOnly) {
    result = result.filter(function (product) {
      return wishlistData.includes(product.id);
    });
  }

  /* CATEGORY */

  if (currentFilter !== "all") {
    result = result.filter(function (product) {
      return product.category === currentFilter;
    });
  }

  /* SEARCH */

  if (searchInput) {
    const search = searchInput.value.toLowerCase().trim();

    if (search) {
      result = result.filter(function (product) {
        return (
          product.name.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
        );
      });
    }
  }

  return result;
}

/* =====================================================
   FILTERS
===================================================== */

filters.forEach(function (button) {
  button.addEventListener("click", function () {
    filters.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter = button.dataset.category;

    wishlistOnly = false;

    displayProducts(getProducts());
  });
});

/* =====================================================
   SEARCH OPEN / CLOSE
===================================================== */

if (searchBtn && searchBox) {
  searchBtn.addEventListener("click", function () {
    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active") && searchInput) {
      searchInput.focus();
    }
  });
}

/* =====================================================
   SEARCH INPUT
===================================================== */

if (searchInput) {
  searchInput.addEventListener("input", function () {
    displayProducts(getProducts());
  });
}

/* =====================================================
   CLEAR SEARCH
===================================================== */

if (clearSearch) {
  clearSearch.addEventListener("click", function () {
    if (searchInput) {
      searchInput.value = "";
    }

    displayProducts(getProducts());
  });
}

/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {
  localStorage.setItem("elaneCart", JSON.stringify(cartData));
}

/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {
  const product = products.find(function (item) {
    return item.id === id;
  });

  if (!product) {
    return;
  }

  const existing = cartData.find(function (item) {
    return item.id === id;
  });

  if (existing) {
    existing.quantity++;

    showToast("Quantity updated");
  } else {
    cartData.push({
      id: product.id,

      name: product.name,

      price: product.price,

      image: product.image,

      quantity: 1,
    });

    showToast("Added to your bag");
  }

  saveCart();

  updateCart();
}

/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {
  if (!cartItems) {
    updateCartCountOnly();

    return;
  }

  cartItems.innerHTML = "";

  let total = 0;

  let quantity = 0;

  /* EMPTY CART */

  if (cartData.length === 0) {
    cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>
                    Your bag is empty
                </h3>

                <p>
                    Add your favourite fragrance.
                </p>

            </div>

        `;
  }

  /* CART PRODUCTS */

  cartData.forEach(function (item) {
    total += item.price * item.quantity;

    quantity += item.quantity;

    const box = document.createElement("div");

    box.className = "cart-box";

    box.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="cart-box-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    $${item.price}
                </p>


                <div class="quantity">

                    <button
                        class="minus"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="plus"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-cart"
                data-id="${item.id}"
                aria-label="Remove item"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

    cartItems.appendChild(box);
  });

  /* =================================================
       UPDATE COUNTS
    ================================================= */

  if (cartCount) {
    cartCount.textContent = quantity;
  }

  if (cartHeadCount) {
    cartHeadCount.textContent = `(${quantity})`;
  }

  /* =================================================
       UPDATE TOTAL
    ================================================= */

  if (cartTotal) {
    cartTotal.textContent = `$${total}`;
  }

  /* =================================================
       PLUS
    ================================================= */

  cartItems.querySelectorAll(".plus").forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);

      const item = cartData.find(function (item) {
        return item.id === id;
      });

      if (item) {
        item.quantity++;

        saveCart();

        updateCart();
      }
    });
  });

  /* =================================================
       MINUS
    ================================================= */

  cartItems.querySelectorAll(".minus").forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);

      const item = cartData.find(function (item) {
        return item.id === id;
      });

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartData = cartData.filter(function (item) {
          return item.id !== id;
        });
      }

      saveCart();

      updateCart();
    });
  });

  /* =================================================
       REMOVE
    ================================================= */

  cartItems.querySelectorAll(".remove-cart").forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);

      cartData = cartData.filter(function (item) {
        return item.id !== id;
      });

      saveCart();

      updateCart();

      showToast("Removed from your bag");
    });
  });
}

/* =====================================================
   CART COUNT ONLY
===================================================== */

function updateCartCountOnly() {
  const quantity = cartData.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  if (cartCount) {
    cartCount.textContent = quantity;
  }

  if (cartHeadCount) {
    cartHeadCount.textContent = `(${quantity})`;
  }
}

/* =====================================================
   OPEN CART
===================================================== */

if (cartBtn) {
  cartBtn.addEventListener("click", function () {
    if (!cart) {
      return;
    }

    cart.classList.add("active");

    if (cartOverlay) {
      cartOverlay.classList.add("active");
    }
  });
}

/* =====================================================
   CLOSE CART
===================================================== */

function hideCart() {
  if (cart) {
    cart.classList.remove("active");
  }

  if (cartOverlay) {
    cartOverlay.classList.remove("active");
  }
}

if (closeCart) {
  closeCart.addEventListener("click", hideCart);
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", hideCart);
}

/* =====================================================
   WISHLIST STORAGE
===================================================== */

function saveWishlist() {
  localStorage.setItem("elaneWishlist", JSON.stringify(wishlistData));
}

/* =====================================================
   UPDATE WISHLIST COUNT
===================================================== */

function updateWishlist() {
  if (wishlistCount) {
    wishlistCount.textContent = wishlistData.length;
  }

  if (wishlistHeaderCount) {
    wishlistHeaderCount.textContent = wishlistData.length;
  }
}

/* =====================================================
   TOGGLE WISHLIST
===================================================== */

function toggleWishlist(id) {
  if (wishlistData.includes(id)) {
    wishlistData = wishlistData.filter(function (item) {
      return item !== id;
    });

    showToast("Removed from wishlist");
  } else {
    wishlistData.push(id);

    showToast("Added to wishlist");
  }

  saveWishlist();

  updateWishlist();

  displayProducts(getProducts());
}

/* =====================================================
   SIDEBAR OPEN
===================================================== */

if (openSidebar) {
  openSidebar.addEventListener("click", function () {
    if (sidebar) {
      sidebar.classList.add("open");
    }

    if (sidebarOverlay) {
      sidebarOverlay.classList.add("active");
    }
  });
}

/* =====================================================
   SIDEBAR CLOSE
===================================================== */

function hideSidebar() {
  if (sidebar) {
    sidebar.classList.remove("open");
  }

  if (sidebarOverlay) {
    sidebarOverlay.classList.remove("active");
  }
}

if (closeSidebar) {
  closeSidebar.addEventListener("click", hideSidebar);
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", hideSidebar);
}

/* =====================================================
   CLOSE SIDEBAR AFTER LINK CLICK
===================================================== */

if (sidebar) {
  const sidebarLinks = sidebar.querySelectorAll("a");

  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      hideSidebar();
    });
  });
}

/* =====================================================
   STORY MODAL
===================================================== */

function openStory() {
  if (storyModal) {
    storyModal.classList.add("show");
  }
}

if (storyBtn) {
  storyBtn.addEventListener("click", openStory);
}

storyButtons.forEach(function (button) {
  button.addEventListener("click", openStory);
});

if (closeStory) {
  closeStory.addEventListener("click", function () {
    if (storyModal) {
      storyModal.classList.remove("show");
    }
  });
}

if (storyModal) {
  storyModal.addEventListener("click", function (event) {
    if (event.target === storyModal) {
      storyModal.classList.remove("show");
    }
  });
}

/* =====================================================
   NEWSLETTER
===================================================== */

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    showToast("Welcome to ÉLANÉ");

    newsletterForm.reset();
  });
}

/* =====================================================
   BUY / PLACE ORDER
===================================================== */

if (buyBtn) {
  buyBtn.addEventListener("click", function () {
    if (cartData.length === 0) {
      showToast("Your bag is empty");

      return;
    }

    const orders = JSON.parse(localStorage.getItem("elaneOrders")) || [];

    const total = cartData.reduce(function (sum, item) {
      return sum + item.price * item.quantity;
    }, 0);

    orders.push({
      id: Date.now(),

      date: new Date().toLocaleDateString(),

      status: "Processing",

      items: cartData,

      total: total,
    });

    localStorage.setItem("elaneOrders", JSON.stringify(orders));

    cartData = [];

    saveCart();

    updateCart();

    hideCart();

    showToast("Order placed successfully");
  });
}

/* =====================================================
   SETTINGS
===================================================== */

const saveSettings = document.querySelector("#saveSettings");

if (saveSettings) {
  const settingName = document.querySelector("#settingName");

  const settingEmail = document.querySelector("#settingEmail");

  const currency = document.querySelector("#currency");

  const language = document.querySelector("#language");

  const newArrivals = document.querySelector("#newArrivals");

  const specialOffers = document.querySelector("#specialOffers");

  const savedSettings = JSON.parse(localStorage.getItem("elaneSettings")) || {};

  if (settingName && savedSettings.name) {
    settingName.value = savedSettings.name;
  }

  if (settingEmail && savedSettings.email) {
    settingEmail.value = savedSettings.email;
  }

  if (currency && savedSettings.currency) {
    currency.value = savedSettings.currency;
  }

  if (language && savedSettings.language) {
    language.value = savedSettings.language;
  }

  if (newArrivals && savedSettings.newArrivals !== undefined) {
    newArrivals.checked = savedSettings.newArrivals;
  }

  if (specialOffers && savedSettings.specialOffers !== undefined) {
    specialOffers.checked = savedSettings.specialOffers;
  }

  saveSettings.addEventListener("click", function () {
    const settings = {
      name: settingName ? settingName.value : "",

      email: settingEmail ? settingEmail.value : "",

      currency: currency ? currency.value : "",

      language: language ? language.value : "",

      newArrivals: newArrivals ? newArrivals.checked : false,

      specialOffers: specialOffers ? specialOffers.checked : false,
    };

    localStorage.setItem("elaneSettings", JSON.stringify(settings));

    showToast("Settings saved successfully");
  });
}

/* =====================================================
   MENU PAGE URL FILTER
===================================================== */

if (page === "menu") {
  const params = new URLSearchParams(window.location.search);

  const category = params.get("category");

  const wishlist = params.get("wishlist");

  if (category === "women" || category === "men" || category === "unisex") {
    currentFilter = category;

    filters.forEach(function (button) {
      if (button.dataset.category === category) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  if (wishlist === "true") {
    wishlistOnly = true;

    filters.forEach(function (button) {
      button.classList.remove("active");
    });
  }
}

/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape") {
    return;
  }

  hideCart();

  hideSidebar();

  if (storyModal) {
    storyModal.classList.remove("show");
  }

  if (searchBox) {
    searchBox.classList.remove("active");
  }
});

/* =====================================================
   INITIAL LOAD
===================================================== */

displayProducts(getProducts());

updateCart();

updateCartCountOnly();

updateWishlist();
