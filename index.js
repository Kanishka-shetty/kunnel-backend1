const express = require('express');
const app = express();
const PORT = 5000;

let products = [
  { id: 1, name: "Marble Tile", price: 50 },
  { id: 2, name: "Granite Tile", price: 70 }
];

let footer = {
  address: "123 Marble Street, Cityville",
  phone: "+91-9876543210",
  email: "contact@stonecraft.com"
};

app.use(express.json()); // to parse JSON request body

// Home route
app.get('/', (req, res) => {
  res.send('Stonecraft Backend is running!');
});

// Sample route for /about
app.get('/about', (req, res) => {
  res.json({
    title: "Welcome to Stonecraft Tiles & Marbles",
    description: "We offer a wide range of quality tiles and marbles to transform your space."
  });
});

// Get products list (Read operation(cRud operation - Read-GET))
app.get('/products', (req, res) => {
  res.json(products);
});

// Create a new product (Crud operation - Create-POST)
app.post('/products', (req, res) => {
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
app.put('/products/:id', (req, res) => {
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
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Get footer info
app.get('/footer', (req, res) => {
  res.json(footer);
});

// Update footer info
app.put('/footer', (req, res) => {
  const { address, phone, email } = req.body;

  // Validate inputs
  if (!address || !phone || !email) {
    return res.status(400).json({ message: 'All fields (address, phone, email) are required.' });
  }

  // Update
  footer = { address, phone, email };
  res.json({ message: 'Footer updated successfully', footer });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});