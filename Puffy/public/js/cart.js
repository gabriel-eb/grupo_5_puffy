const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// render cart items
function renderCartItems() {
    cartItemsEl.innerHTML = ""; // clear cart element
    cart.forEach((item) => {
        console.log(item.quantity)
        console.log(item.instock)
        cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" >
                <img src="${item.url}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.quantity}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
            <div>
                <p onclick="removeItemFromCart(${item.id})">Eliminar</p>
            </div>
        </div>
      `;
    });
}


// update cart
function updateCart() {
    renderCartItems();
    renderSubtotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
    let totalPrice = 0;
    let totalItems = 0;

    cart.map(item => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
    });

    subtotalEl.innerHTML = `Subtotal (${totalItems} postre(s)): $${totalPrice.toFixed(2)} mxn`;
}

// remove item from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        let quantity = item.quantity;
        if (item.id === id) {
            if (action === "minus" && quantity > 1) {
                quantity--;
            } else if (action === "plus" && quantity < item.instock) {
                quantity++;
            }
        }
        return {
            ...item,
            quantity,
        };
    });
    updateCart();
}