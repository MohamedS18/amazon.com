import { products } from "../data/products.js";
import { deleteItemFromCheckout } from "./amazon-cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

if (JSON.parse(localStorage.getItem("OCart")) === null) {
  localStorage.setItem("OCart", JSON.stringify([]));
}

if (
  JSON.parse(localStorage.getItem("cart")) !== null &&
  JSON.parse(localStorage.getItem("cart")).length !== 0
) {
  document.querySelector(".container").innerHTML = `
        
        <div class="main">
            <div class="all-products">
                <div class="product-container">
                    <div class="details">
                    
                    </div>
                </div>
            </div>

            <div class="order-summary">
                
            </div>
        </div>
        `;
}

let total_cart_item = 0;
let cart = [];

let total_inc_tax = "";

checkEmpty();

function checkEmpty() {
  if (
    JSON.parse(localStorage.getItem("cart")) === null ||
    JSON.parse(localStorage.getItem("cart")).length === 0
  ) {
    document.body.querySelector(".container").innerHTML = `
    <div class="empty_cart">
          <div class="inner-container">
              <img class="empty-cart-image" src="images/icons/empty_cart.svg">
          </div>
          <div style="padding:20px">
              <span style="display:block; margin:5px 5px;">Your Cart is empty</span>
              <a href="index.html"><button class="continue-shopping">Continue Shopping</button></a>
          </div>
      </div>`;
  }
}

displayCart();

if (JSON.parse(localStorage.getItem("cart")) !== null) {
  createSummary();
}

function displayCart() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null || cart.length === 0) {
    return 0;
  }
  let order_data = ``;

  const date = dayjs();
  const today = date.format("dddd, MMM DD");
  const dO1 = date.add(7, "day").format("dddd, MMM DD");
  const dO2 = date.add(4, "day").format("dddd, MMM DD");
  const dO3 = date.add(1, "day").format("dddd, MMM DD");

  cart.forEach((item) => {
    products.forEach((data_item) => {
      if (item.cart_id === data_item.id) {
        order_data += `<div class="product-container" data-id="${data_item.id}">
                    <div class="date-title s-${item.cart_id}">
                        Delivery date: ${dO1}
                    </div>
                    <div class="details">
                        <div class="product-details">
                            <div class="product-image">
                                <img class="product-img" src="${data_item.image}" />
                            </div>
                            <div class="product-description">
                                <p class="product-description-name">${data_item.name}</p>
                                <p class="product-description-price">&#8377; ${data_item.priceCents}</p>
                                <div class="quantity-container">
                                    <p class="product-description-quantity">Quantity: ${item.cart_quantity}</p>
                                    <u style="color:rgb(49, 116, 240);"><span class="quantity-mod">Delete</span></u>
                                </div>
                            </div>
                        </div>
                        <div class="delivery-details">
                            <div class="delivery-options-title">
                                choose a delivery options
                            </div>
                            <div class="delivery-options-grid">
                                <div class="delivery-options-grid-left"> <input class="date-input" data-id="1" name="date ${item.cart_id}" type="radio"
                                        value="1" checked /> </div>
                                <div class="delivery-options-grid-right">
                                    <label class="delivery-dates" for="date">${dO1}</label>
                                    <label>FREE Shipping</label>
                                </div>
                                <div class="delivery-options-grid-left"> <input class="date-input" data-id="2" name="date ${item.cart_id}" type="radio"
                                        value="2" />
                                </div>
                                <div class="delivery-options-grid-right">
                                    <label class="delivery-dates" for="date">${dO2}</label>
                                    <label>&#8377; +99</label>
                                </div>
                                <div class="delivery-options-grid-left"> <input class="date-input" data-id="3" name="date ${item.cart_id}" type="radio"
                                        value="3" />
                                </div>
                                <div class="delivery-options-grid-right">
                                    <label class="delivery-dates" for="date">${dO3}</label>
                                    <label>&#8377; +299</label>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>`;
      }
    });
  });
  if (cart !== null || cart.length !== 0) {
    document.querySelector(".all-products").innerHTML = order_data;
  }
  deliveryOptionsListen();
  deleteListen();
}

function deliveryOptionsListen() {
  cart = JSON.parse(localStorage.getItem("cart"));
  document.querySelectorAll(".date-input").forEach((inputElement) => {
    inputElement.addEventListener("click", () => {
      cart.forEach((cartt) => {
        const input_name_id = inputElement.name.split(" ")[1];

        if (cartt.cart_id === input_name_id) {
          let date = dayjs();
          if (inputElement.dataset.id === "2") {
            date = date.add(4, "day").format("dddd, MMM DD");
          } else if (inputElement.dataset.id == "3") {
            date = date.add(1, "day").format("dddd, MMM DD");
          } else if (inputElement.dataset.id == "1") {
            date = date.add(7, "day").format("dddd, MMM DD");
          }
          document.querySelector(
            `.s-${input_name_id}`
          ).innerHTML = `Delivery date: ${date}`;

          cartt.delivery_options_id = inputElement.dataset.id;
          localStorage.setItem("cart", JSON.stringify(cart));
          createSummary();
        }
      });
    });
  });
}

function deleteListen() {
  document.querySelectorAll(".product-container").forEach((container) => {
    container.querySelector(".quantity-mod").addEventListener("click", () => {
      deleteItemFromCheckout(container.dataset.id);
      displayCart();
      createSummary();
      checkEmpty();
    });
  });
}

function createSummary() {
  total_cart_item = 0;
  cart = JSON.parse(localStorage.getItem("cart"));
  let total_cost = 0;
  let shipping_cost = 0;
  cart.forEach((item) => {
    products.forEach((product) => {
      if (item.cart_id === product.id) {
        total_cart_item += item.cart_quantity;
        total_cost += item.cart_quantity * product.priceCents;
        if (item.delivery_options_id === "2") {
          shipping_cost += 99;
        } else if (item.delivery_options_id == "3") {
          shipping_cost += 299;
        } else if (item.delivery_options_id == "1") {
          shipping_cost += 0;
        }
      }
    });
  });
  let cost_tax = Number(((total_cost + shipping_cost) * 0.1).toFixed(2));
  total_inc_tax = (cost_tax + total_cost + shipping_cost).toFixed(2);

  document.querySelector(
    ".top-checkout-count"
  ).innerHTML = ` ${total_cart_item} item `;
  const summary_HTML = `
                <div class="summary-title">Order Summary</div>
                <div class="text-grid">
                    <p class="summary-items">Items (${total_cart_item})</p>
                    <div class="summary-items-right">
                        <p class="summary-items">${total_cost.toFixed(2)}</p>
                    </div>
                    <p class="summary-items">Shipping & handling:</p>
                    <div class="summary-items-right">
                        <p class="summary-items">${shipping_cost.toFixed(2)}</p>
                    </div>
                    <p class="summary-items">Total before tax:</p>
                    <div class="summary-items-right m-above">
                        <p class="summary-items">${(
                          total_cost + shipping_cost
                        ).toFixed(2)}</p>
                    </div>
                    <p class="summary-items">Estimated tax (10%):</p>
                    <div class="summary-items-right">
                        <p class="summary-items">${cost_tax.toFixed(2)}</p>
                    </div>
                    <p class="order-total m-above total">Order total</p>
                    <div class="summary-items-right m-above">
                        <p class="total-price">${total_inc_tax}</p>
                    </div>
                </div>
                <div class="paypal-input">
                    <label>Use PayPal</label>
                    <input type="checkbox" name="paypal" />
                </div>
                <a href="orders.html">
                    <button class="place-your-order-button">Place your order</button>
                </a>
  `;
  if (cart !== null || cart.length !== 0) {
    document.querySelector(".order-summary").innerHTML = summary_HTML;
  }
}

console.log(JSON.parse(localStorage.getItem("cart")) !== null);
if (JSON.parse(localStorage.getItem("cart")) !== null) {
  document.querySelector(".place-your-order-button").addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart"));

      let orders_cart = [
        total_inc_tax,
        dayjs().format("dddd, MMM DD"),
        cart[0].cart_id,
      ];

      cart.forEach((cart) => {
        const dOption = cart.delivery_options_id;
        let item_name = "";
        let date = dayjs();
        if (dOption === "2") {
          date = date.add(4, "day").format("dddd, MMM DD");
        } else if (dOption == "3") {
          date = date.add(1, "day").format("dddd, MMM DD");
        } else if (dOption == "1") {
          date = date.add(7, "day").format("dddd, MMM DD");
        }
        products.forEach((p) => {
          if (cart.cart_id === p.id) {
            item_name = p.name;
            orders_cart.push({
              item_img: p.image,
              item_id: cart.cart_id,
              item_name,
              quantity: cart.cart_quantity,
              delivery_date: date,
            });
          }
        });
      });
      let existing_cart = JSON.parse(localStorage.getItem("OCart"));
      existing_cart.splice(0, 0, orders_cart);
      localStorage.setItem("OCart", JSON.stringify(existing_cart));
      localStorage.setItem("cart", JSON.stringify(null));
      console.log(JSON.parse(localStorage.getItem("OCart")));

    });
}
