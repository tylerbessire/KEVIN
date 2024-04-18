const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/auth/register', (req, res) => {
  res.render('register');
});

router.post('/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // User model will automatically hash the password using bcrypt
    await User.create({ username, password });
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send(error.message);
  }
});

router.get('/auth/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/chat');
  }
  res.render('login');
});

router.post('/auth/login', async (req, res) => {
  if (req.session.userId) {
    return res.redirect('/chat');
  }
  try {
    const { username, password } = req.body;
    console.log(`Attempting login for user: ${username}`); // Log the attempt to login
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Login failed: User not found'); // Log the failure
      return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.userId = user._id;
      console.log(`Login successful for user: ${username}`); // Log the success
      return res.redirect('/chat'); // Redirect to chat after successful login
    } else {
      console.log('Login failed: Password is incorrect'); // Log the failure
      return res.status(400).send('Password is incorrect');
    }
  } catch (error) {
    console.error('Login error:', error);
    console.error(error.stack); // Log the full error stack
    return res.status(500).send(error.message);
  }
});

router.get('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error during session destruction:', err);
      console.error(err.stack); // Log the full error stack
      return res.status(500).send('Error logging out');
    }
    res.redirect('/auth/login');
  });
});

module.exports = router;