const express = require('express');
const app = express();
const PORT = 5000;

// Home route
app.get('/', (req, res) => {
  res.send('Stonecraft Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
