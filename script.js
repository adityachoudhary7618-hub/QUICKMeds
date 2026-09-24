const medicines = [

  // Fever
  { id: 1, name: "Paracetamol 500mg", price: 30, store: "Gupta Medicos", cat: "Fever" },
  { id: 2, name: "Crocin Advance", price: 45, store: "Apollo Nearby", cat: "Fever" },
  { id: 3, name: "Dolo 650", price: 35, store: "Wellness 24x7", cat: "Fever" },
  { id: 4, name: "Calpol 500mg", price: 32, store: "Gupta Medicos", cat: "Fever" },

  // Cold
  { id: 5, name: "Cetirizine 10mg", price: 25, store: "Gupta Medicos", cat: "Cold" },
  { id: 6, name: "Azithromycin 500mg", price: 120, store: "Wellness 24x7", cat: "Cold" },
  { id: 7, name: "Levocetirizine", price: 40, store: "Apollo Nearby", cat: "Cold" },
  { id: 8, name: "Cough Syrup", price: 85, store: "Gupta Medicos", cat: "Cold" },

  // Pain
  { id: 9, name: "Brufen 400", price: 50, store: "Apollo Nearby", cat: "Pain" },
  { id: 10, name: "Volini Spray", price: 180, store: "Wellness 24x7", cat: "Pain" },
  { id: 11, name: "Moov Spray", price: 155, store: "Gupta Medicos", cat: "Pain" },
  { id: 12, name: "Combiflam", price: 40, store: "Apollo Nearby", cat: "Pain" },

  // Diabetes
  { id: 13, name: "Metformin 500mg", price: 90, store: "Gupta Medicos", cat: "Diabetes" },
  { id: 14, name: "Insulin Pen", price: 550, store: "Apollo Nearby", cat: "Diabetes" },
  { id: 15, name: "Glucometer Strips", price: 350, store: "Wellness 24x7", cat: "Diabetes" },

  // Vitamins
  { id: 16, name: "Vitamin C Tablets", price: 120, store: "Wellness 24x7", cat: "Vitamin" },
  { id: 17, name: "Vitamin D3", price: 150, store: "Gupta Medicos", cat: "Vitamin" },
  { id: 18, name: "Multivitamin Tablets", price: 220, store: "Apollo Nearby", cat: "Vitamin" },
  { id: 19, name: "Calcium Tablets", price: 130, store: "Gupta Medicos", cat: "Vitamin" },

  // First Aid
  { id: 20, name: "Bandage Pack", price: 50, store: "Gupta Medicos", cat: "First Aid" },
  { id: 21, name: "Antiseptic Liquid", price: 95, store: "Apollo Nearby", cat: "First Aid" },
  { id: 22, name: "Cotton Roll", price: 45, store: "Wellness 24x7", cat: "First Aid" },
  { id: 23, name: "Medical Tape", price: 35, store: "Gupta Medicos", cat: "First Aid" }
];


// -----------------------------
// CATEGORY VISUAL SYSTEM
// (custom inline SVGs — no external image dependency)
// -----------------------------

const categoryStyle = {
  "Fever": {
    color: "var(--cat-fever)",
    tint: "#ffe7df",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 15V4a2 2 0 1 0-4 0v11a4 4 0 1 0 4 0Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 6h2M10 9h2M10 12h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="17" r="2" fill="currentColor"/></svg>`
  },
  "Cold": {
    color: "var(--cat-cold)",
    tint: "#e1f0fd",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3c-3 3.5-6 7.8-6 11a6 6 0 0 0 12 0c0-3.2-3-7.5-6-11Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  "Pain": {
    color: "var(--cat-pain)",
    tint: "#ede6fe",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`
  },
  "Diabetes": {
    color: "var(--cat-diabetes)",
    tint: "#ffe4e9",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3c-3.3 3.9-6.5 8.4-6.5 11.6a6.5 6.5 0 0 0 13 0C18.5 11.4 15.3 6.9 12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`
  },
  "Vitamin": {
    color: "var(--cat-vitamin)",
    tint: "#fef3d9",
    icon: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.7"/><path d="M12 3.5V12l6 3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  "First Aid": {
    color: "var(--cat-firstaid)",
    tint: "#dff5f1",
    icon: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M12 10v6M9 13h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 6V5a4 4 0 0 1 8 0v1" stroke="currentColor" stroke-width="1.7"/></svg>`
  }
};

function styleFor(cat) {
  return categoryStyle[cat] || categoryStyle["First Aid"];
}


let cart = JSON.parse(localStorage.getItem("quickmeds-cart")) || [];

const grid = document.getElementById("product-grid");


// -----------------------------
// TOASTS
// -----------------------------

function showToast(message, type = "default") {

  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("leaving");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}


// -----------------------------
// RENDER PRODUCTS
// -----------------------------

function renderProducts(list) {

  grid.innerHTML = "";

  if (list.length === 0) {

    grid.innerHTML = `
      <div class="no-results">
        😕 No medicines found
      </div>
    `;

    return;
  }

  list.forEach((m, i) => {

    const s = styleFor(m.cat);

    const card = document.createElement("div");
    card.className = "card";
    card.style.setProperty("--cat-color", s.color);
    card.style.setProperty("--cat-tint", s.tint);
    card.style.animationDelay = `${Math.min(i, 10) * 0.04}s`;

    card.innerHTML = `
      <div class="medicine-icon">
        ${s.icon}
      </div>

      <p>${m.store}</p>

      <h4>${m.name}</h4>

      <span class="category">
        ${m.cat}
      </span>

      <b class="price">
        ₹${m.price}
      </b>

      <button onclick="addToCart(${m.id})">
        Add to Cart
      </button>
    `;

    grid.appendChild(card);
  });
}


renderProducts(medicines);


// -----------------------------
// ADD TO CART
// -----------------------------

function addToCart(id) {

  const medicine = medicines.find(m => m.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...medicine,
      quantity: 1
    });

  }

  saveCart();
  updateCart();

  showToast(`${medicine.name} added to cart`, "success");

  document.getElementById("cart-sidebar").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
}


// -----------------------------
// SAVE CART
// -----------------------------

function saveCart() {

  localStorage.setItem(
    "quickmeds-cart",
    JSON.stringify(cart)
  );

}


// -----------------------------
// UPDATE CART
// -----------------------------

function updateCart() {

  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  document.getElementById("cart-count").innerText = count;


  const cartItems = document.getElementById("cart-items");

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        🛒
        <p>Your cart is empty</p>
        <small>Add medicines to continue</small>
      </div>
    `;

  } else {

    cartItems.innerHTML = cart.map(item => `

      <div class="cart-item">

        <div>
          <b>${item.name}</b>
          <small>₹${item.price} each</small>
        </div>

        <div class="quantity">

          <button onclick="changeQuantity(${item.id}, -1)">
            −
          </button>

          <span>${item.quantity}</span>

          <button onclick="changeQuantity(${item.id}, 1)">
            +
          </button>

        </div>

        <strong>
          ₹${item.price * item.quantity}
        </strong>

      </div>

    `).join("");

  }


  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  const total = subtotal;


  document.getElementById("subtotal").innerText = subtotal;
  document.getElementById("total").innerText = total;
  document.getElementById("delivery-charge").innerText = "FREE";
  document.getElementById("payment-total").innerText = total;
  document.getElementById("pay-button-total").innerText = total;

}


updateCart();


// -----------------------------
// QUANTITY
// -----------------------------

function changeQuantity(id, change) {

  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {

    cart = cart.filter(item => item.id !== id);

  }

  saveCart();
  updateCart();

}


// -----------------------------
// CART TOGGLE
// -----------------------------

function toggleCart() {

  document.getElementById("cart-sidebar").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");

}


// -----------------------------
// CATEGORY FILTER
// -----------------------------

function filterCategory(category, el) {

  document.querySelectorAll(".cat").forEach(c => c.classList.remove("active"));
  if (el) el.classList.add("active");

  if (category === "All") {

    renderProducts(medicines);

    return;

  }

  const filtered = medicines.filter(
    medicine => medicine.cat === category
  );

  renderProducts(filtered);

}


// -----------------------------
// SEARCH
// -----------------------------

document
  .getElementById("searchInput")
  .addEventListener("input", e => {

    const query = e.target.value.toLowerCase().trim();

    const filtered = medicines.filter(m =>
      m.name.toLowerCase().includes(query) ||
      m.cat.toLowerCase().includes(query) ||
      m.store.toLowerCase().includes(query)
    );

    renderProducts(filtered);

  });


// -----------------------------
// PAYMENT
// -----------------------------

function openPayment() {

  if (cart.length === 0) {

    showToast("Your cart is empty!", "warning");

    return;

  }

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  document.getElementById("payment-total").innerText = total;
  document.getElementById("pay-button-total").innerText = total;

  document.getElementById("payment-modal").classList.remove("hidden");

}


function closePayment() {

  document.getElementById("payment-modal").classList.add("hidden");

}


// -----------------------------
// PAYMENT METHOD CHANGE
// -----------------------------

document
  .querySelectorAll('input[name="payment"]')
  .forEach(radio => {

    radio.addEventListener("change", function () {

      const upiSection = document.getElementById("upi-section");
      const cardSection = document.getElementById("card-section");

      if (this.value === "UPI") {
        upiSection.classList.remove("hidden");
        cardSection.classList.add("hidden");
      }

      if (this.value === "Card") {
        upiSection.classList.add("hidden");
        cardSection.classList.remove("hidden");
      }

      if (this.value === "COD") {
        upiSection.classList.add("hidden");
        cardSection.classList.add("hidden");
      }

    });

  });


// -----------------------------
// CONFIRM PAYMENT
// -----------------------------

function confirmPayment() {

  const method =
    document.querySelector('input[name="payment"]:checked').value;

  if (method === "UPI") {

    const upi = document.getElementById("upi").value.trim();

    if (!upi) {
      showToast("Please enter your UPI ID.", "warning");
      return;
    }

  }

  if (method === "Card") {

    const card = document.getElementById("cardNumber").value.trim();

    if (card.length < 12) {
      showToast("Please enter a valid card number.", "warning");
      return;
    }

  }

  closePayment();
  placeOrder(method);

}


// -----------------------------
// PLACE ORDER
// -----------------------------

function placeOrder(paymentMethod) {

  if (cart.length === 0) {
    showToast("Cart is empty", "warning");
    return;
  }

  const orderId = "QM" + Math.floor(1000 + Math.random() * 9000);

  document.getElementById("order-id").innerText = orderId;

  document.getElementById("cart-sidebar").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");

  document.getElementById("tracker").classList.remove("hidden");

  document.getElementById("s2").classList.remove("active");
  document.getElementById("s3").classList.remove("active");
  document.getElementById("s4").classList.remove("active");

  const progressFill = document.getElementById("progress-fill");
  progressFill.style.width = "5%";

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });

  showToast(`Order ${orderId} placed`, "success");

  setTimeout(() => {
    document.getElementById("s2").classList.add("active");
    progressFill.style.width = "38%";
    showToast("Your order is packed 📦");
  }, 2000);

  setTimeout(() => {
    document.getElementById("s3").classList.add("active");
    progressFill.style.width = "70%";
    showToast("Out for delivery 🛵");
  }, 4000);

  setTimeout(() => {

    document.getElementById("s4").classList.add("active");
    progressFill.style.width = "100%";

    showToast("🎉 Order delivered!", "success");

    launchConfetti();

    cart = [];
    saveCart();
    updateCart();

  }, 6000);

}


// -----------------------------
// CONFETTI
// -----------------------------

function launchConfetti() {

  if (typeof confetti !== "function") return;

  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {

    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#16a999", "#ff6b4a", "#ffb703"]
    });

    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#16a999", "#ff6b4a", "#ffb703"]
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }

  })();

}


// -----------------------------
// EMERGENCY SOS
// -----------------------------

function openSOS() {
  document.getElementById("sos-modal").classList.remove("hidden");
}

function closeSOS() {
  document.getElementById("sos-modal").classList.add("hidden");
}
