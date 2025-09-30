// ===========================================
// DESIGN PATTERNS IMPLEMENTATION
// ===========================================

// 1. FACTORY PATTERN - Product Factory
class ProductFactory {
    static createProduct(type, data) {
        const t = (type || '').toLowerCase();
        switch (t) {
            case 'shirt':
            case 'shirts':
                return new Shirt(data);
            case 'pant':
            case 'pants':
                return new Pants(data);
            case 'dress':
            case 'dresses':
                return new Dress(data);
            case 'accessory':
            case 'accessories':
                return new Accessory(data);
            default:
                throw new Error(`Unknown product type: ${type}`);
        }
    }
}

// Base Product Class
class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.image = data.image;
        this.category = data.category;
        this.description = data.description || '';
    }

    getPrice() {
        return this.price;
    }

    getDisplayInfo() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            image: this.image,
            category: this.category,
            description: this.description
        };
    }
}

// Specific Product Types
class Shirt extends Product {
    constructor(data) {
        super(data);
        this.sleeveType = data.sleeveType || 'short';
        this.material = data.material || 'cotton';
    }
}

class Pants extends Product {
    constructor(data) {
        super(data);
        this.fit = data.fit || 'regular';
        this.length = data.length || 'full';
    }
}

class Dress extends Product {
    constructor(data) {
        super(data);
        this.style = data.style || 'casual';
        this.length = data.length || 'midi';
    }
}

class Accessory extends Product {
    constructor(data) {
        super(data);
        this.type = data.type || 'general';
        this.material = data.material || 'mixed';
    }
}

// 2. DECORATOR PATTERN - Product Decorators
class ProductDecorator {
    constructor(product) {
        this.product = product;
    }

    getPrice() {
        return this.product.getPrice();
    }

    getDisplayInfo() {
        return this.product.getDisplayInfo();
    }
}

class GiftWrapDecorator extends ProductDecorator {
    constructor(product) {
        super(product);
        this.giftWrapPrice = 5.00;
    }

    getPrice() {
        return this.product.getPrice() + this.giftWrapPrice;
    }

    getDisplayInfo() {
        const info = this.product.getDisplayInfo();
        return {
            ...info,
            features: [...(info.features || []), 'Gift Wrap (+$5.00)']
        };
    }
}

class DiscountDecorator extends ProductDecorator {
    constructor(product, discountPercent = 10) {
        super(product);
        this.discountPercent = discountPercent;
    }

    getPrice() {
        const originalPrice = this.product.getPrice();
        const discount = originalPrice * (this.discountPercent / 100);
        return originalPrice - discount;
    }

    getDisplayInfo() {
        const info = this.product.getDisplayInfo();
        return {
            ...info,
            features: [...(info.features || []), `${this.discountPercent}% Discount`]
        };
    }
}

class WarrantyDecorator extends ProductDecorator {
    constructor(product) {
        super(product);
        this.warrantyPrice = 10.00;
    }

    getPrice() {
        return this.product.getPrice() + this.warrantyPrice;
    }

    getDisplayInfo() {
        const info = this.product.getDisplayInfo();
        return {
            ...info,
            features: [...(info.features || []), 'Extended Warranty (+$10.00)']
        };
    }
}

// 3. OBSERVER PATTERN - Cart Observer
class CartObserver {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

// Cart Observer Implementation
class CartUpdateObserver {
    update(cartData) {
        this.updateCartDisplay(cartData);
        this.updateCartSummary(cartData);
    }

    updateCartDisplay(cartData) {
        const cartContent = document.getElementById('cartContent');
        const cartTitle = document.getElementById('cartTitle');
        
        if (cartData.items.length === 0) {
            cartContent.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
            cartTitle.textContent = 'Shopping Cart (0 items)';
            document.getElementById('cartSummary').style.display = 'none';
            return;
        }

        cartTitle.textContent = `Shopping Cart (${cartData.totalItems} items)`;
        document.getElementById('cartSummary').style.display = 'block';

        cartContent.innerHTML = cartData.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.originalPrice.toFixed(2)} each</div>
                    <div class="cart-item-total">Total: $${item.totalPrice.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', -1)">-</button>
                        <span class="quantity-display">x${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="btn btn-danger" onclick="cartManager.removeItem('${item.id}')">Remove</button>
            </div>
        `).join('');
    }

    updateCartSummary(cartData) {
        document.getElementById('subtotal').textContent = `$${cartData.subtotal.toFixed(2)}`;
        document.getElementById('discount').textContent = `$${cartData.discount.toFixed(2)}`;
        document.getElementById('giftWrap').textContent = `$${cartData.giftWrap.toFixed(2)}`;
        document.getElementById('warranty').textContent = `$${cartData.warranty.toFixed(2)}`;
        document.getElementById('total').textContent = `$${cartData.total.toFixed(2)}`;
    }
}

// 4. CART MANAGER
class CartManager {
    constructor() {
        this.items = [];
        this.observer = new CartObserver();
        this.cartUpdateObserver = new CartUpdateObserver();
        this.observer.subscribe(this.cartUpdateObserver);
    }

    addItem(product, quantity = 1, decorators = []) {
        const existingItemIndex = this.items.findIndex(item => 
            item.id === product.id && 
            JSON.stringify(item.decorators) === JSON.stringify(decorators)
        );

        if (existingItemIndex !== -1) {
            this.items[existingItemIndex].quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                image: product.image,
                originalPrice: product.getPrice(),
                totalPrice: this.calculateDecoratedPrice(product, decorators),
                quantity: quantity,
                decorators: decorators,
                product: product
            });
        }

        this.notifyObservers();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.notifyObservers();
    }

    updateQuantity(itemId, change) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(itemId);
            } else {
                this.notifyObservers();
            }
        }
    }

    calculateDecoratedPrice(product, decorators) {
        let decoratedProduct = product;
        decorators.forEach(decoratorType => {
            switch (decoratorType) {
                case 'giftWrap':
                    decoratedProduct = new GiftWrapDecorator(decoratedProduct);
                    break;
                case 'discount':
                    decoratedProduct = new DiscountDecorator(decoratedProduct);
                    break;
                case 'warranty':
                    decoratedProduct = new WarrantyDecorator(decoratedProduct);
                    break;
            }
        });
        return decoratedProduct.getPrice();
    }

    notifyObservers() {
        const cartData = this.getCartData();
        this.observer.notify(cartData);
    }

    getCartData() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = this.items.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
        
        let discount = 0;
        let giftWrap = 0;
        let warranty = 0;

        this.items.forEach(item => {
            item.decorators.forEach(decorator => {
                switch (decorator) {
                    case 'discount':
                        discount += item.originalPrice * item.quantity * 0.1;
                        break;
                    case 'giftWrap':
                        giftWrap += 5.00 * item.quantity;
                        break;
                    case 'warranty':
                        warranty += 10.00 * item.quantity;
                        break;
                }
            });
        });

        const total = subtotal - discount + giftWrap + warranty;

        return {
            items: this.items,
            totalItems,
            subtotal,
            discount,
            giftWrap,
            warranty,
            total
        };
    }
}

// ===========================================
// APPLICATION INITIALIZATION
// ===========================================

// Sample Products Data
const productsData = [
    // Shirts
    {
        id: '1',
        name: 'Classic Cotton T-Shirt',
        price: 29.99,
        image: 'images/products/shirts/classic-cotton-tshirt.jpg',
        category: 'shirts',
        description: 'Comfortable cotton t-shirt',
        sleeveType: 'short',
        material: 'cotton'
    },
    {
        id: '2',
        name: 'Polo Shirt',
        price: 39.99,
        image: 'images/products/shirts/polo-shirt.jpg',
        category: 'shirts',
        description: 'Classic polo shirt',
        sleeveType: 'short',
        material: 'cotton'
    },
    {
        id: '3',
        name: 'Denim Shirt',
        price: 49.99,
        image: 'images/products/shirts/denim-shirt.jpg',
        category: 'shirts',
        description: 'Stylish denim shirt',
        sleeveType: 'long',
        material: 'denim'
    },
    // Pants
    {
        id: '4',
        name: 'Classic Jeans',
        price: 59.99,
        image: 'images/products/pants/classic-jeans.jpg',
        category: 'pants',
        description: 'Classic blue jeans',
        fit: 'regular',
        length: 'full'
    },
    {
        id: '5',
        name: 'Chino Pants',
        price: 45.99,
        image: 'images/products/pants/chino-pants.jpg',
        category: 'pants',
        description: 'Comfortable chino pants',
        fit: 'slim',
        length: 'full'
    },
    // Dresses
    {
        id: '6',
        name: 'Summer Dress',
        price: 49.99,
        image: 'images/products/dresses/summer-dress.jpg',
        category: 'dresses',
        description: 'Light summer dress',
        style: 'casual',
        length: 'midi'
    },
    {
        id: '7',
        name: 'Evening Gown',
        price: 89.99,
        image: 'images/products/dresses/evening-gown.jpg',
        category: 'dresses',
        description: 'Elegant evening gown',
        style: 'formal',
        length: 'long'
    },
    // Accessories
    {
        id: '8',
        name: 'Leather Belt',
        price: 24.99,
        image: 'images/products/accessories/leather-belt.jpg',
        category: 'accessories',
        description: 'Genuine leather belt',
        type: 'belt',
        material: 'leather'
    },
    {
        id: '9',
        name: 'Silk Scarf',
        price: 34.99,
        image: 'images/products/accessories/silk-scarf.jpg',
        category: 'accessories',
        description: 'Luxurious silk scarf',
        type: 'scarf',
        material: 'silk'
    }
];

// Global Variables
let cartManager;
let currentProducts = [];
let currentFilter = 'all';

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    cartManager = new CartManager();
    initializeProducts();
    initializeEventListeners();
    cartManager.notifyObservers();
});

function initializeProducts() {
    currentProducts = productsData.map(data => {
        const product = ProductFactory.createProduct(data.category, data);
        return product;
    });
    renderProducts(currentProducts);
}

function renderProducts(products) {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) {
        console.error('Product grid element not found!');
        return;
    }
    
    productGrid.innerHTML = products.map(product => {
        const info = product.getDisplayInfo();
        return `
            <div class="product-card" onclick="openProductModal('${info.id}')">
                <img src="${info.image}" alt="${info.name}" class="product-image">
                <div class="product-name">${info.name}</div>
                <div class="product-category">${info.category.toUpperCase()}</div>
                <div class="product-price">$${info.price.toFixed(2)}</div>
                <button class="btn btn-primary" onclick="event.stopPropagation(); openProductModal('${info.id}')">Add to Cart</button>
            </div>
        `;
    }).join('');
}

function initializeEventListeners() {
    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            currentFilter = category;
            
            if (category === 'all') {
                renderProducts(currentProducts);
            } else {
                const filteredProducts = currentProducts.filter(product => 
                    product.category === category
                );
                renderProducts(filteredProducts);
            }
        });
    });

    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Add to cart from modal
    document.getElementById('addToCartBtn').addEventListener('click', addToCartFromModal);
}

function openProductModal(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (!product) return;

    const info = product.getDisplayInfo();
    document.getElementById('modalProductImage').src = info.image;
    document.getElementById('modalProductName').textContent = info.name;
    document.getElementById('modalProductCategory').textContent = info.category.toUpperCase();
    document.getElementById('modalProductPrice').textContent = `$${info.price.toFixed(2)}`;
    
    // Reset decorator options
    document.getElementById('giftWrapOption').checked = false;
    document.getElementById('discountOption').checked = false;
    document.getElementById('warrantyOption').checked = false;

    document.getElementById('productModal').style.display = 'block';
    window.currentModalProduct = product;
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    window.currentModalProduct = null;
}

function addToCartFromModal() {
    if (!window.currentModalProduct) return;

    const decorators = [];
    if (document.getElementById('giftWrapOption').checked) decorators.push('giftWrap');
    if (document.getElementById('discountOption').checked) decorators.push('discount');
    if (document.getElementById('warrantyOption').checked) decorators.push('warranty');

    cartManager.addItem(window.currentModalProduct, 1, decorators);
    closeModal();
    
    // Add animation to cart
    document.querySelector('.cart-card').classList.add('cart-update');
    setTimeout(() => {
        document.querySelector('.cart-card').classList.remove('cart-update');
    }, 500);
}
