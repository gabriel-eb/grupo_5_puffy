const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
    // check if prodcut already exist in cart
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id);
    } else {
        const item = products.find((product) => product.id === id);

        cart.push({
            ...item,
            quantity: 1,
        });
    }

    updateCart();
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
    let totalPrice = 0.0,
        totalItems = 0,
        shipping = 65.0;

    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
    });

    subtotalEl.innerHTML = `<p>Subtotal (${totalItems} items):</p><p> $ ${totalPrice.toFixed(2)} mxn</p>`;
    totalItemsInCartEl.innerHTML = `$ ${(totalPrice + shipping).toFixed(2)} mxn `;
}

// render cart items
function renderCartItems() {
    cartItemsEl.innerHTML = ""; // clear cart element
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
        <div class="postre">
            <h2 class="fuente-may">${item.name}</h2>
            <div class="imagen" onclick="removeItemFromCart(${item.id})">
                <img src="${item.url}" alt="${item.name}">
            </div>
            <div class="cantidad units">
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
                <div class="number">${item.quantity}</div>
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
            </div>

            <a href="/users/<%= userCart.userId %>/carrito/<%=idCarrito%>?idProduct=<%=producto.id %>">Eliminar</a>
            <div>
                <p class="product-price bold unit-price">Precio: $ ${item.price}
                </p>
            </div>
            <input class="nota" type="text" name="eliminar" placeholder="Agrega una nota aquí para la tienda..."
                id="eliminar" />
        </div>
      `;
    });
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