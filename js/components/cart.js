// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const product = {
                    id: productCard.dataset.id,
                    name: productCard.querySelector('.product-title').textContent,
                    price: parseFloat(productCard.querySelector('.product-price').textContent.replace(/[^0-9.]/g, '')),
                    image: productCard.querySelector('.product-image img').src,
                    color: productCard.querySelector('.color-select')?.value || 'default',
                    size: productCard.querySelector('.size-select')?.value || 'M',
                    quantity: 1
                };
                this.addItem(product);
            });
        });

        // Cart page specific functionality
        if (document.querySelector('.cart-items')) {
            this.renderCart();
        }
    }

    addItem(product) {
        const existingItem = this.items.find(item => 
            item.id === product.id && 
            item.color === product.color && 
            item.size === product.size
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push(product);
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item added to cart');
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartCount();
        if (document.querySelector('.cart-items')) {
            this.renderCart();
        }
    }

    updateQuantity(index, quantity) {
        this.items[index].quantity = Math.max(1, quantity);
        this.saveCart();
        this.updateCartCount();
        if (document.querySelector('.cart-items')) {
            this.renderCart();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    calculateTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    renderCart() {
        const cartContainer = document.querySelector('.cart-items');
        if (!cartContainer) return;

        if (this.items.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }

        const html = this.items.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Color: ${item.color}</p>
                    <p>Size: ${item.size}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="item-price">
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        cartContainer.innerHTML = html + `
            <div class="cart-total">
                <h3>Total: $${this.calculateTotal().toFixed(2)}</h3>
                <button class="checkout-btn">Proceed to Checkout</button>
            </div>
        `;

        // Add event listeners for cart controls
        cartContainer.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const item = this.items[index];
                if (btn.classList.contains('minus')) {
                    this.updateQuantity(index, item.quantity - 1);
                } else {
                    this.updateQuantity(index, item.quantity + 1);
                }
            });
        });

        cartContainer.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.remove-item').dataset.index);
                this.removeItem(index);
            });
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove notification after animation
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});
