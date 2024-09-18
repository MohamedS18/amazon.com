import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import customParseFormat from 'https://unpkg.com/dayjs@1.11.10/esm/plugin/customParseFormat/index.js';
import { products } from '../data/products.js';
dayjs.extend(customParseFormat);

function load(){
    let data =JSON.parse(localStorage.getItem('track-cart'));
    let name = "";
    products.forEach((p)=>{
        if (p.id === data.id){
            name = p.name;
        }
    })


    let page = `
        <a href="orders.html"><span class="all-order-button">view all orders</span></a>
            <h2>${data.delivery_date}</h2>
            <p class="text">${name} </p>
            <p class="text">Quantity: ${data.quantity}</p>
            <div class="image-container">
                <img class="product-image" src="${data.image}">
            </div>
            <div class="delivery-status-container"> 
                <p class="text-prepared">Preparing</p>
                <p class="text-shipped">Shipped</p>
                <p class="text-delivered">Delivered</p>
            </div>
            <div class="outer-progress-container">
                <div class="progress-bar progress"></div>
        </div>
    `
    document.querySelector(".outer-flex-container").innerHTML = page;
    

    let date = dayjs(data.delivery_date.split(', ')[1], 'MMM D').year(dayjs().year());

    let today = dayjs();
    let diffInDays = -(today.diff(date, 'day'));

    console.log(diffInDays);
    let p_c = "green";
    let s_c = "black";
    let d_c = "black";
    let p_w = "20%";
    if (diffInDays >= 4){
        p_w = "10%" ;       
    } else if (diffInDays === 3){
        p_w = "30%";
    } else if (diffInDays === 2){
        s_c = "green";
        p_w = "60%";
    } else if (diffInDays === 1){
        s_c = "green";
        p_w = "70%";
    } else if (diffInDays === 0){
        s_c = "green";
        p_w = "90%";
    } else if (diffInDays === -1){
        s_c = "green";
        d_c = "green";
        p_w = "100%";
    }
    document.querySelector(".text-prepared").style.color = p_c;
    document.querySelector(".text-shipped").style.color = s_c;
    document.querySelector(".text-delivered").style.color = d_c;
    document.querySelector(".progress").style.width = p_w;
    console.log(diffInDays);
}

load();