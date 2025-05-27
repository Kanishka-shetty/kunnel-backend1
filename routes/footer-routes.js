const express = require('express');
const router = express.Router();

let footerData = {
  address: "123 Marble Street, Stone City",
  contact: "123-456-7890",
  email: "info@stonecraft.com"
};

// GET footer info
router.get('/', (req, res) => {
  res.json(footerData);
});

// UPDATE footer info
router.put('/', (req, res) => {
  const { address, contact, email } = req.body;
  footerData = { address, contact, email };
  res.json({ message: 'Footer updated successfully', footer: footerData });
});

module.exports = router;
