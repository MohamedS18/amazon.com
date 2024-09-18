export let cart_data = []
if (JSON.parse(localStorage.getItem('cart')) != null){
    cart_data = JSON.parse(localStorage.getItem('cart'));
}

cart_data = [];
export let total_cart_quantity = 0;



export function addToCart(){
    document.querySelectorAll(".outer-container").forEach( (container)=>{
        container.querySelector(".add-to-cart-button").addEventListener("click", (product) => {
            const cart_id = container.dataset.id;
            if (JSON.parse(localStorage.getItem("cart"))!== null && JSON.parse(localStorage.getItem("cart")).length !== 0){
                cart_data = JSON.parse(localStorage.getItem("cart"));
            }

            // const cart_image = (container.querySelector(".product-image").src);
            // const cart_name = (container.querySelector(".product-name").innerHTML.trim());
            // const cart_price = Number(container.querySelector(".product-price").innerHTML.trim());
            const cart_quantity = Number(container.querySelector(".drop-down-item").value);
    
            total_cart_quantity += cart_quantity;

            let item_exist = false;
            
            cart_data.forEach((item)=>{
                if (item.cart_id === cart_id){
                    item.cart_quantity += cart_quantity;
                    item_exist = true;
                }
            })
            if (!item_exist){
                cart_data.push(
                    {
                        cart_id,
                        cart_quantity,
                        delivery_options_id:"1"
                    }
                )
            }

            localStorage.setItem("cart",JSON.stringify(cart_data));
            update_cart_count();

        })

    
    })

}

export function update_cart_count(){
    let count = 0;
    const car = JSON.parse(localStorage.getItem("cart"));

    if (car === null){
        return;
    }
    car.forEach(c => {
        count += c.cart_quantity;
    })
    document.querySelector(".cart-count-container").innerHTML = count;

}



export function deleteItemFromCheckout(item_id){
    cart_data = JSON.parse(localStorage.getItem('cart'));
    cart_data.forEach( (item,index) => {
        if (item.cart_id == item_id){
            cart_data.splice(index,1);
            total_cart_quantity -= cart_data.cart_quantity;
        }
    })
    localStorage.setItem('cart',JSON.stringify(cart_data));
    
}
