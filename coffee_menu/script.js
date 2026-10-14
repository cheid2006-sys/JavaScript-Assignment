const menu = [
  { name: "Espresso", price: 3.0 },
  { name: "Latte", price: 4.5 },
  { name: "Mocha", price: 5.0 },
  { name: "Muffin", price: 2.5 },
];
let cart = [];
 
// Grab the elements we need once.
const menuList = document.getElementById("menu-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const rewardMsg = document.getElementById("reward-msg");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const errorMsg = document.getElementById("error-msg");
const addCustomBtn = document.getElementById("add-custom-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
 
// Part A: clears #menu-list and builds one <li> (text + Add button) per menu item.
function renderMenu() {
  menuList.textContent = "";
  menu.forEach((item) => {
    const li = document.createElement("li");
 
    const text = document.createElement("span");
    text.textContent = item.name + " \u2014 $" + item.price.toFixed(2);
 
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", () => {
      cart.push({ name: item.name, price: item.price });
      renderCart();
    });
 
    li.appendChild(text);
    li.appendChild(addBtn);
    menuList.appendChild(li);
  });
}
 
// Part B: rebuilds the cart list, the item count and the total.
function renderCart() {
  cartList.textContent = "";
  cart.forEach((entry, index) => {
    const li = document.createElement("li");
 
    const text = document.createElement("span");
    text.textContent = entry.name + " \u2014 $" + entry.price.toFixed(2);
 
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.dataset.index = index; // stored in data-index
 
    li.appendChild(text);
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
  cartCount.textContent = cart.length;
  updateTotal();
}
 
// Part C: computes the cart total with reduce, shows it, and toggles red color + reward message.
function updateTotal() {
  const total = cart.reduce((sum, entry) => sum + entry.price, 0);
  cartTotal.textContent = total.toFixed(2);
 
  if (total > 15) {
    cartTotal.style.color = "red";
    rewardMsg.classList.remove("hidden");
  } else {
    cartTotal.style.color = "";
    rewardMsg.classList.add("hidden");
  }
}
 
// Part B.5: one listener on #cart-list handles every Remove button (event delegation).
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const index = Number(event.target.dataset.index);
    cart.splice(index, 1); // removes only this one entry
    renderCart();
  }
});
 
// Part D: validates the custom item form and adds a new item to the menu.
function addCustomItem() {
  const name = itemNameInput.value.trim();
  const priceText = itemPriceInput.value.trim();
  const price = Number(priceText);
 
  if (name === "") {
    errorMsg.textContent = "Name is required.";
    return;
  }
  if (priceText === "" || isNaN(price) || price <= 0) {
    errorMsg.textContent = "Price must be a positive number.";
    return;
  }
  const exists = menu.some((item) => item.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    errorMsg.textContent = "This item is already on the menu.";
    return;
  }
 
  menu.push({ name, price });
  renderMenu();
  itemNameInput.value = "";
  itemPriceInput.value = "";
  errorMsg.textContent = "";
}
addCustomBtn.addEventListener("click", addCustomItem);
 
// Part E: empties the cart, or shows "Your cart is empty." if it was already empty.
function clearCart() {
  if (cart.length === 0) {
    cartList.textContent = "";
    const li = document.createElement("li");
    li.textContent = "Your cart is empty.";
    cartList.appendChild(li);
    return;
  }
  cart = [];
  renderCart();
}
clearCartBtn.addEventListener("click", clearCart);
 
// Render everything when the page loads.
renderMenu();
renderCart();
 