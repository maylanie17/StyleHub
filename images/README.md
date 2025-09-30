# Product Images Structure

This folder contains all product images organized by category for easy management.

## Folder Structure
```
images/
├── products/
│   ├── shirts/          # T-shirts, polo shirts, dress shirts
│   ├── pants/           # Jeans, chinos, trousers
│   ├── dresses/          # Summer dresses, evening gowns
│   └── accessories/      # Belts, scarves, jewelry
└── README.md           # This file
```

## Image Naming Convention
- Use descriptive names: `classic-cotton-tshirt.jpg`
- Use lowercase with hyphens: `polo-shirt.jpg`
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- Recommended size: 400x400px or 500x500px for consistency

## How to Add/Replace Images
1. **Add new product images**: Place them in the appropriate category folder
2. **Replace existing images**: Simply overwrite the existing file with the same name
3. **Update product data**: Modify the `imagePath` in `script.js` if you change the filename

## Example Product Images
- `shirts/classic-cotton-tshirt.jpg`
- `shirts/polo-shirt.jpg`
- `shirts/denim-shirt.jpg`
- `pants/classic-jeans.jpg`
- `pants/chino-pants.jpg`
- `dresses/summer-dress.jpg`
- `dresses/evening-gown.jpg`
- `accessories/leather-belt.jpg`
- `accessories/silk-scarf.jpg`

## Fallback System
If an image is not found, the system will display a placeholder with the product's emoji icon as fallback.
