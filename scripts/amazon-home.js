import {
  cart_data,
  total_cart_quantity,
  addToCart,
  update_cart_count
} from "./amazon-cart.js";
import { products } from "../data/products.js";
update_cart_count();

let product_data = "";

products.forEach((item) => {
  product_data += `
        <div class="outer-container" data-id=${item.id}>
            <div class="product-image-container">
                <img class="product-image" src="${item.image}">
            </div>
            <div class="item-container">
                <p class="item-name">${item.name}</p>
                <div class="ratings-container">
                    <img class="ratings-image" src="images/ratings/rating-${
                      item.rating.stars * 10
                    }.png">
                    <p class="no-of-reviews">${item.rating.count}</p>
                </div>

                <h3 class="price">₹${item.priceCents}</h3>
                <select class="drop-down-item">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                
            </div>
            <div class="product-spacer">
            </div>
            <div class="cart-container">
                <button class="add-to-cart-button" >Add to cart</button>
            </div>
        </div>    
    `;
});
document.querySelector(".all-item-container").innerHTML = product_data;
addToCart();

document.querySelector(".search-button").addEventListener("click", () => {
    let tep ="";
  const key = document.querySelector(".homepage-search").value;
  if (!key) {
    (document.querySelector(".all-item-container").innerHTML) = product_data;
    return;
  }
  products.forEach((item) => {
    let flag = true;
    item.keywords.forEach((i) => {
        console.log((key));
      if (flag && i.includes(key)) {
        tep += `
          <div class="outer-container" data-id=${item.id}>
              <div class="product-image-container">
                  <img class="product-image" src="${item.image}">
              </div>
              <div class="item-container">
                  <p class="item-name">${item.name}</p>
                  <div class="ratings-container">
                      <img class="ratings-image" src="images/ratings/rating-${
                        item.rating.stars * 10
                      }.png">
                      <p class="no-of-reviews">${item.rating.count}</p>
                  </div>
  
                  <h3 class="price">₹${item.priceCents}</h3>
                  <select class="drop-down-item">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                  </select>
                  
              </div>
              <div class="product-spacer">
              </div>
              <div class="cart-container">
                  <button class="add-to-cart-button" >Add to cart</button>
              </div>
          </div>    
      `;
        flag = false;
        return;
      }
    });
  });
  (document.querySelector(".all-item-container").innerHTML) = tep;
  addToCart();
  update_cart_count();

});
