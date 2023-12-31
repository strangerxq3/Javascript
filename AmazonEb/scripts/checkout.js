import { cart, removeFromCart, updateQuantity, calculateCartQuantity } from '../data/cart.js';
import { product } from '../data/products.js';
import { deliveryOptions,getDeliveryOption } from '../data/deleveryOptions.js';
// import { updatecart } from './amazon.js';
import { FormatPrice } from './utilities/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



let cartSummarHTML = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  
  let matchingProducts;

  product.forEach((p_item) => {
    if (p_item.id === productId) {
      matchingProducts = p_item;}
  });
  
  const deliveryoptionId  =cartItem.deliveryOptionId;

  const today = dayjs();
  const deliveryOp =getDeliveryOption(deliveryoptionId)
  let day =deliveryOp.day
  let day1= day
  const deliveryDate = today.add(day1, 'days');
    
  //   const datestring = deliveryDate.format( 'dddd, MMMM D');
    
    
    
    cartSummarHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProducts.id}">
    <div class="delivery-date">
    Delivery date: {datestring}
    </div>
    
    <div class="cart-item-details-grid">
    <img class="product-image"
        src="${matchingProducts.image}">
        
      <div class="cart-item-details">
      <div class="product-name">
          ${matchingProducts.name}
          </div>
          <div class="product-price">
          $${FormatPrice(matchingProducts.priceCents)}
          </div>
          <div class="product-quantity">
          <span>
          Quantity: <span class="quantity-label js-quantity-label-${matchingProducts.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProducts.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-${matchingProducts.id}">
          <span class="save-quantity-link link-primary js-save-link" data-product-id = "${matchingProducts.id}">Save</span>
          <span class="delete-quantity-link link-primary" data-product-id = "${matchingProducts.id}">
            Delete
          </span>
          </div>
          </div>
          
          <div class="delivery-options">
          <div class="delivery-options-title">
          Choose a delivery option:</div>
          ${DeliveryOptionHTML(matchingProducts,cartItem)}      
      </div>
    </div>
  </div>`
})

function DeliveryOptionHTML(matchingProducts,cartitem) {

  let optionHTML = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.day, 'days');

    const datestring = deliveryDate.format( 'dddd, MMMM D');

    const pricestr = deliveryOption.Price === 0 ? 'FREE' : `$${FormatPrice(deliveryOption.Price)} -`

    const isChecked = deliveryOption.id === cartitem.deliveryOptionId;

    optionHTML +=`        
      <div class="delivery-option">
        <input type="radio"
          ${isChecked ? 'checked': ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProducts.id}">
      <div>
        <div class="delivery-option-date">
          ${datestring}
        </div>
        <div class="delivery-option-price">
           ${pricestr} Shipping
        </div>
      </div>
    </div>`
  }
  ) 
  return optionHTML;
}


document.querySelector('.js-order-summary').innerHTML = cartSummarHTML;

document.querySelectorAll('.delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    // console.log(cart);
    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.remove()
  })
})

function cartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cart_item) => {
    cartQuantity += cart_item.quantity;
  })
  document.querySelector('.js-checkout-items').innerHTML = `${cartQuantity} items`;

};

cartQuantity()

document.querySelectorAll('.js-update-link').
  forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.productId;
      // console.log(productId)
      const cantainer = document.querySelector(`.js-cart-item-container-${productId}`);
      cantainer.classList.add('is-editing-quantity');
    });
  });


document.querySelectorAll('.js-save-link').
  forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.productId;
      // console.log(productId)

      const quantityInput = document.querySelector(`.js-quantity-${productId}`);
      const NewQuantity = Number(quantityInput.value);
      if (NewQuantity < 0 || NewQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      updateQuantity(productId, NewQuantity);

      const cantainer = document.querySelector(`.js-cart-item-container-${productId}`);
      cantainer.classList.remove('is-editing-quantity');

      const QuantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      QuantityLabel.innerHTML = NewQuantity;
      calculateCartQuantity()
    });
  });