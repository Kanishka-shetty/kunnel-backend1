const multer = require('multer');
const path = require('path');

const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

let products = [
  { id: 1, name: "Marble Tile", price: 50 },
  { id: 2, name: "Granite Tile", price: 70 }
];

// Get products list (Read operation(cRud operation - Read-GET))
router.get('/', (req, res) => {
  res.json(products);
});

// Create a new product (Crud operation - Create-POST)

// router.post('/', upload.single('image'), (req, res) => {
//   const { name, price } = req.body;
//   const imageFile = req.file; 
// image: `${req.protocol}://${req.get('host')}/uploads/${imageFileName}`
 


//   if (!name || !price || !imageFile) {
//     return res.status(400).json({ message: 'Name, price, and image are required' });
//   }

//   const newProduct = {
//     id: products.length + 1,
//     name,
   
//     price: Number(price), 
//     image: `${req.protocol}://${req.get('host')}/uploads/${imageFile.filename}`
//   };

//   products.push(newProduct);
//   res.status(201).json(newProduct);
//   console.log('req.file:', req.file);
// });
router.post('/', upload.single('image'), (req, res) => {
  const { name, price } = req.body;
  const imageFile = req.file; // req.file is the full file object

  if (!name || !price || !imageFile) {
    return res.status(400).json({ message: 'Name, price, and image are required' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price: Number(price),
    image: `${req.protocol}://${req.get('host')}/uploads/${imageFile.filename}`
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
  console.log('req.file:', req.file);
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
