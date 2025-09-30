 StyleHub - Mini E-commerce Application

A modern e-commerce website for clothing with cart functionality, built using HTML, CSS, and JavaScript with three key design patterns.

 Features

- Product Catalog: Browse different clothing categories (Shirts, Pants, Dresses, Accessories)
- Shopping Cart: Add/remove items, update quantities
- Product Features: Add Gift Wrap, Discount, or Extended Warranty to products
- Responsive Design: Works on desktop and mobile devices
- Real-time Updates: Cart updates automatically when items are added/removed

 Design Patterns Implemented

 1. Factory Pattern
- Purpose: Create different product types (Shirt, Pants, Dress, Accessory)
- Implementation: `ProductFactory.createProduct()` method
- Benefits: Easy to add new product types without modifying existing code

 2. Decorator Pattern
- Purpose: Add features (Gift Wrap, Discount, Warranty) to products
- Implementation: `ProductDecorator` and its subclasses
- Benefits: Add features dynamically without changing original product classes

 3. Observer Pattern
- Purpose: Update UI automatically when cart changes
- Implementation: `CartObserver` and `CartUpdateObserver`
- Benefits: Loose coupling between cart logic and UI updates

 File Structure

```
├── index.html               Main HTML structure
├── styles.css               CSS styling
├── script.js               JavaScript with design patterns
├── images/                 Product images
│   ├── tshirt1.svg
│   ├── polo1.svg
│   ├── jeans1.svg
│   ├── dress1.svg
│   ├── belt1.svg
│   └── bag1.svg
├── class-diagram.md        Class diagram documentation
├── sequence-diagram.md     Sequence diagram documentation
└── README.md              This file
```

 How to Use

1. Open the Application: Open `index.html` in a web browser
2. Browse Products: Use category filters to view different product types
3. Add to Cart: Click on any product to open the modal and select features
4. Select Features: Choose from Gift Wrap (+$5.00), 10% Discount, or Extended Warranty (+$10.00)
5. Manage Cart: Use quantity controls to adjust item quantities or remove items
6. View Summary: See real-time updates of subtotal, discounts, and total price

 Technical Implementation

 Factory Pattern Usage
```javascript
// Create different product types
const shirt = ProductFactory.createProduct('shirt', data);
const pants = ProductFactory.createProduct('pants', data);
```

 Decorator Pattern Usage
```javascript
// Add features to products
let decoratedProduct = new GiftWrapDecorator(product);
decoratedProduct = new DiscountDecorator(decoratedProduct);
```

 Observer Pattern Usage
```javascript
// Subscribe to cart updates
cartManager.observer.subscribe(cartUpdateObserver);
// Notify observers when cart changes
cartManager.observer.notify(cartData);
```

 Product Categories

- Shirts: T-shirts, Polo shirts
- Pants: Jeans, Trousers
- Dresses: Summer dresses, Formal dresses
- Accessories: Belts, Handbags

 Features Available

- Gift Wrap: Add $5.00 to product price
- Discount: Apply 10% discount to product price
- Extended Warranty: Add $10.00 to product price

 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

 Future Enhancements

- User authentication
- Order history
- Payment integration
- Product reviews
- Wishlist functionality
- Advanced filtering options

 Design Pattern Benefits

1. Factory Pattern: Easy to extend with new product types
2. Decorator Pattern: Flexible feature addition without code modification
3. Observer Pattern: Maintainable and scalable UI updates

This application demonstrates how design patterns can create a clean, maintainable, and extensible e-commerce system using only frontend technologies.
