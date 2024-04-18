const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

router.post('/profile', async (req, res) => {
  const { userId, preferences, language } = req.body;
  try {
    const profile = await UserProfile.create({ userId, preferences, language });
    console.log('User profile created successfully');
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Error creating user profile:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ success: false, message: 'Error creating user profile', error: error.message });
  }
});

module.exports = router;