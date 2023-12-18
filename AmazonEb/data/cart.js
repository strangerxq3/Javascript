export let cart =JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart =[{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId:'1'
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId:'2 '
    }];
} 

export function saveToLocalStorage(){
        localStorage.setItem('cart',JSON.stringify(cart))
}


export function AddToCart(productid) {
    let matchingitem;
    cart.forEach((cart_item) => {
        if (productid === cart_item.productId) {
            matchingitem = cart_item;
        }
    });
    const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productid}`
    );

    const quantity = Number(quantitySelector.value);

    if (matchingitem) {
        matchingitem.quantity += quantity;
    } else {
        cart.push({
            productId: productid,
            quantity: quantity,
            deliveryOptions:'1'
        });
    }
    saveToLocalStorage();
}

export function updateQuantity(productid,NewQuantity){
    let matchingitem;
    cart.forEach((cart_item) => {
        if (productid === cart_item.productId) {
            matchingitem = cart_item;
        }
    });
    matchingitem.quantity = NewQuantity;
    saveToLocalStorage();
    // console.log(cart.quantity)
}

export function removeFromCart(productid) {
    let NewCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productid) {
            NewCart.push(cartItem)
        }
    })
    cart = NewCart;
    saveToLocalStorage()
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }