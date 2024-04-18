require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { google } = require('googleapis');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const apiRoutes = require('./routes/apiRoutes');
const mediaRoutes = require('./routes/mediaRoutes'); // Added for media upload
const userRoutes = require('./routes/userRoutes'); // Added for user profile system
const { isAuthenticated } = require('./routes/middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB:', err);
  console.error(err.stack);
});

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Google Drive API client
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'credentials/google-service-account.json'), // Ensure this path matches the location of your Google service account key file
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({ version: 'v3', auth });

// View engine setup
app.set('view engine', 'ejs');

// Make session data available to all views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Routes
app.use(authRoutes);
app.use('/api', apiRoutes); // Use apiRoutes for handling API requests
app.use('/api/media', mediaRoutes); // Route for media upload
app.use('/api/user', userRoutes); // Route for user profile system

app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/chat');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/chat', isAuthenticated, (req, res) => {
  res.render('index', { error: null });
});

// Serve translation files for i18next
app.use('/locales', express.static(path.join(__dirname, 'locales')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});