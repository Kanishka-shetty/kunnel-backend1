const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: "Marble Tile", price: 50 },
  { id: 2, name: "Granite Tile", price: 70 }
];


// Get products list (Read operation(cRud operation - Read-GET))
router.get('/products', (req, res) => {
  res.json(products);
});

// Create a new product (Crud operation - Create-POST)
router.post('/products', (req, res) => {
  //  console.log(req.body);
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product by id(crUd operation - Update-PUT)
router.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price } = req.body;

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (name) product.name = name;
  if (price) product.price = price;

  res.json(product);
});

// Delete a product by id(cruD operation - Delete)
router.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
