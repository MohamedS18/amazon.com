
function renderOrders(){
    const cart =JSON.parse(localStorage.getItem("OCart"));
    console.log(cart);
    let total_page = "";
    if (cart == null){
        checkEmpty();
        return;
    }
    cart.forEach((cart_details) => {
        let elementHTML = "";
        cart_details.slice(3).forEach((element)=>{
            elementHTML+= `
                <div class="items-container">
                    <div class="product-grid">
                        <div class="product-image">
                            <img class="product-img" src="${element.item_img}" />
                        </div>
                        <div class="product-description">
                            <h4 class="text">${element.item_name}</h4>
                            <p class="text">Arriving on ${element.delivery_date}</p>
                            <p class="text">Quantity: ${element.quantity}</p>

                        </div>
                        <div class="track-package-container" >
                            <a href="trackpage.html">
                            <button data-delivery="${element.delivery_date}" 
                            data-img="${element.item_img}" data-quantity="${element.quantity}" 
                            data-id="${element.item_id}"
                            class="track-package-button">Track package</button>
                            </a>                            
                        </div>

                    </div>
                </div>
            `;
        })
        total_page += `
            <div class="main-container">
                        <div class="cart-deatails-container">
                            <div class="order-placed-container">
                                <span class="font-700">Order Placed:</span><br />
                                <span>${cart_details[1]}</span>

                            </div>
                            <div class="total-contaier">
                                <span class="font-700">Total:</span><br />
                                <span>&#8377;${cart_details[0]}</span>
                            </div>
                            <div class="order-id-container">
                                <span class="font-700">Order Id:</span><br />
                                <span>${cart_details[2]}</span>
                            </div>
                        </div>
                        <div class="items-outer-container">
                        ${elementHTML}                      
                        </div>
                    </div>    
        `;
        document.querySelector(".items-grid").innerHTML = total_page;

        
    })
    document.querySelectorAll(".track-package-button").forEach((e)=>{
        
        e.addEventListener('click',(element)=>{
            let data = {
                delivery_date:e.dataset.delivery,
                quantity:e.dataset.quantity,
                image:e.dataset.img,
                id:e.dataset.id
            };
        
            console.log(data);
            localStorage.setItem('track-cart',JSON.stringify(data));
        
        })

    })
    

    //document.querySelector(".items-outer-container").innerHTML = elementHTML;
}


function checkEmpty(){
    if (JSON.parse(localStorage.getItem("OCart"))=== null || JSON.parse(localStorage.getItem("OCart")).length === 0){
      document.body.querySelector(".outer-container").innerHTML = `
      <div class="empty_cart">
            <div class="inner-container">
                <img class="empty-cart-image" src="images/icons/empty_cart.svg">
            </div>
            <div style="padding:20px">
                <span style="display:block; margin:5px 5px;">Your Orders appear here</span>
                <a href="index.html"><button class="continue-shopping">Continue Shopping</button></a>
            </div>
        </div>`;
    } 
  }
  

renderOrders();

