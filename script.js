class Product {
    constructor(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;  // Ajout de l'URL de l'image
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.updateCartCount();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateCartCount();
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    displayItems() {
        const modalContent = document.querySelector('.modal-content');
        const cartItemsHtml = this.items.map(item => `
            <div class="newdisplay">
                <img src="${item.product.imageUrl}" alt="${item.product.name}" width="200">
                <span>${item.product.name} </span>
                <span> Quantity: ${item.quantity}  </span>
                 <span>Total: ${item.getTotalPrice().toFixed(2)}DT</span>
                <i class="fa-solid fa-trash trash" onclick="removeFromCart(${item.product.id})"></i>
            </div>
        `);
        modalContent.innerHTML += cartItemsHtml;
        modalContent.innerHTML += `<div class="total">Total Price: ${this.getTotalPrice().toFixed(2)}DT</div>`;
    }

    updateCartCount() {
        document.getElementById('quantity').innerText = this.getTotalItems();
    }
}

const cart = new ShoppingCart();

function addProduct(id, name, price, imageUrl) {
    const product = new Product(id, name, price, imageUrl);
    cart.addItem(product, 1);
}

function removeFromCart(productId) {
    cart.removeItem(productId);
    refreshCartDisplay();
}

function refreshCartDisplay() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `<span class="close-button" id="closeModal">&times;</span><h2>Shopping Cart</h2>`;
    cart.displayItems();
}

// Modal functionality
const modal = document.getElementById('modal');
const cartIcon = document.getElementById('cartIcon');
const closeModal = document.getElementById('closeModal');

cartIcon.onclick = function () {
    modal.style.display = 'block';
    refreshCartDisplay();
};

closeModal.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};


closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});