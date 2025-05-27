const express = require('express');
const router = express.Router();

// In-memory About Us content
let aboutContent = {
  title: "Welcome to Stonecraft Tiles & Marbles",
  description: "We offer a wide range of quality tiles and marbles to transform your space."
};

// GET /about
router.get('/', (req, res) => {
  res.json(aboutContent);
});

// PUT /about
router.put('/', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  aboutContent = { title, description };
  res.json({ message: 'About Us updated successfully', aboutContent });
});

module.exports = router;