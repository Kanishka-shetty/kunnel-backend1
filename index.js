const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json()); // to parse JSON request body
app.use('/uploads', express.static('uploads'));

const aboutRoutes = require('./routes/about-routes');
app.use('/about', aboutRoutes);

// const productRoutes = require('./routes/product-routes');
// app.use('/products', productRoutes);

const footerRoutes = require('./routes/footer-routes');
app.use('/footer', footerRoutes);

const productRoutes = require('./routes/product-routes');
app.use('/products', productRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Stonecraft Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});