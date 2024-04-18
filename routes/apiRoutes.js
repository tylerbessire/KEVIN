const express = require('express');
const router = express.Router();

// Sample API route for checking API status
router.get('/status', (req, res) => {
  console.log('API status check requested');
  res.json({ status: 'API is operational' });
});

module.exports = router;