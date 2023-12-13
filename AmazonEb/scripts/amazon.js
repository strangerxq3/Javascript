import { cart, AddToCart } from '../data/cart.js';
import { product } from '../data/products.js';
import { FormatPrice } from './utilities/money.js';
// import { updatecartQuantity } from './checkout.js';


let productHTML = '';

product.forEach((product) => {
    productHTML += `
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src=${product.image}>
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
     $${FormatPrice(product.priceCents)}
    </div>

    <div class="product-quantity-container">
    <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
    <img src="images/icons/checkmark.png">
        Added
    </div>

    <button class="button-primary js-addCart-btn" data-product-id ="${product.id}">
    Add to Cart
    </button>
    </div>
    `
})


function addedcart(productid) {

    const Addedmsg = document.querySelector(`.js-added-to-cart-${productid}`);
    Addedmsg.classList.add('added-to-cart-visible');

    setTimeout(() => {
        Addedmsg.classList.remove('added-to-cart-visible')
    }, 2000);
}
function updatecart(){
    let cartQuantity = 0;
    cart.forEach((cart_item) => {
        cartQuantity += cart_item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
updatecart()
document.querySelector('.js-product-grid').innerHTML = productHTML;
document.querySelectorAll('.js-addCart-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const productid = btn.dataset.productId;
        AddToCart(productid);
        updatecart(productid);
        addedcart(productid)

        // console.log(cartQuantity)
        // console.log(cart)
    })
})