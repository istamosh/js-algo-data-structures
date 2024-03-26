const cartContainer = document.getElementById('cart-container')
const productsContainer = document.getElementById('products-container')
const dessertCards = document.getElementById('dessert-card-container')

const cartBtn = document.getElementById('cart-btn')
const clearCartBtn = document.getElementById('clear-cart-btn')

const totalNumberOfItems = document.getElementById('total-items')
const cartSubTotal = document.getElementById('subtotal')
const cartTaxes = document.getElementById('taxes')
const cartTotal = document.getElementById('total')

const showHideCartSpan = document.getElementById('show-hide-cart')

let isCartShowing = false;

const products = [
    {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
},
    {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
},
    {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
},
    {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
},
    {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
},
    {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
},
    {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
},
    {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
},
    {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
},
    {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
},
    {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
},
    {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
},
];

products.forEach(({name, id, price, category}) => {
    dessertCards.innerHTML += 
    `
    <div class="dessert-card">
        <h2>${name}</h2>

        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>

        <button id="${id}" class="btn add-to-cart-btn">Add to cart</button>
    </div>
    `;
})

// declaring a javascript class
class ShoppingCart {
    // declaring constructor method
    // The this keyword in JavaScript is used to refer to the current object. Depending on where this is used, what it references changes. In the case of a class, it refers to the instance of the object being constructed. You can use the this keyword to set the properties of the object being instantiated
    constructor() {
        this.items = [];
        this.total = 0;
        this.taxRate = 8.25;
    }
    addItem(id, products) {
        // In your addItem function, declare a product variable, and assign it the value of calling the .find() method on the products array.
        // For the callback to .find(), pass a function that takes a single parameter item, and returns whether the id property of item is strictly equal to the id parameter passed to addItem.
        const product = products.find(item => item.id === id)

        // destructure name and price vars. from product
        const {name, price} = product;

        // push the product into the cart's items array. Remember to use the this keyword.
        this.items.push(product);

        const totalCountPerProduct = {};

        this.items.forEach(dessert => {
            // In your forEach callback, you need to update the totalCountPerProduct object
            // Using the id of the current dessert as your property, update the value of the property to be the current value plus one.
            // Do not use the addition assignment operator for this.
            // You now have a small bug. When you try to access a property of an object and the property doesn't exist, you get undefined. This means if the dessert isn't already present in the totalCountPerProduct object, you end up trying to add 1 to undefined, which results in NaN.
            // To fix this, you can use the || operator to set the value to 0 if it doesn't exist.
            totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
        });

        // Now you need to get prepared to update the display with the new product the user added. Declare a currentProductCount variable, and assign it the value of the totalCountPerProduct object's property matching the id of product.
        const currentProductCount = totalCountPerProduct[product.id];

        // You haven't written the code to generate the HTML yet, but if a product has already been added to the user's cart then there will be a matching element which you'll need.
        const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);
        
        // The behaviour of the addItem method needs to change if the product is already in the cart or not. Create a ternary that checks if the current product is already in the cart
        currentProductCount > 1
        ? currentProductCountSpan.textContent = `${currentProductCount}x` 
        : productsContainer.innerHTML += `
        <div class="product" id="dessert${id}">
            <p>
                <span class="product-count" id="product-count-for-id${id}"></span>${name}
            </p>
            <p>${price}</p>
        </div>
        `;
    }
    getCounts() {
        return this.items.length;
    }
    clearCart() {
        if (!this.items.length) {
            alert('Your shopping cart is already empty');
            return;
        }
        const isCartCleared = confirm('Are you sure you want to clear all items from your shopping cart?');
    
        if (isCartCleared) {
            this.items = [];
            this.total = 0;

            productsContainer.innerHTML = '';
            totalNumberOfItems.textContent = 0;
            cartSubTotal.textContent = 0;
            cartTaxes.textContent = 0;
            cartTotal.textContent = 0;
        }
    }
    calculateTaxes(amount) {
        // Because of the way computers store and work with numbers, calculations involving decimal numbers can result in some strange behavior. For example, 0.1 + 0.2 is not equal to 0.3. This is because computers store decimal numbers as binary fractions, and some binary fractions cannot be represented exactly as decimal fractions.
        // We want to clean up the number result from your calculation.
        // This will round the number to two decimal places and return a string.
        return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }
    calculateTotal() {
        const subTotal = this.items.reduce((total, item) => total + item.price, 0)
    
        const tax = this.calculateTaxes(subTotal);

        this.total = subTotal + tax;

        cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;

        cartTaxes.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${this.total.toFixed(2)}`;

        return this.total;
    }
};

// instantiate a new ShoppingCart object and assign it to a variable
const cart = new ShoppingCart();

const addToCartBtns = document.getElementsByClassName('add-to-cart-btn');

// addToCartBtns is considered Collection, not an array, so you need to spread it into an array to invoke forEach()
[...addToCartBtns].forEach(btn => {
    btn.addEventListener('click', event => {
        cart.addItem(Number(event.target.id), products);

        totalNumberOfItems.textContent = cart.getCounts();

        cart.calculateTotal();
    });
});

cartBtn.addEventListener('click', () => {
    isCartShowing = !isCartShowing;
    showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
    cartContainer.style.display = isCartShowing ? "block" : "none";
});

// Add a click event listener to the clearCartBtn. For the callback, you can pass in cart.clearCart directly.
// However, doing so will not work, because the context of this will be the clearCartBtn element. You need to bind the clearCart method to the cart object.
clearCartBtn.addEventListener('click', cart.clearCart.bind(cart));