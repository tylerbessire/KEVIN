const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads')); 
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('media'), (req, res) => {
  console.log('Handling file upload...');
  if (!req.file) {
    console.error('No file uploaded.');
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
  console.log(`File uploaded successfully: ${req.file.path}`);
  res.json({ success: true, message: 'File uploaded successfully', filePath: req.file.path });
});

router.use((err, req, res, next) => {
  console.error('Error handling media route:', err.message);
  console.error('Error stack:', err.stack);
  res.status(500).json({ success: false, message: 'An error occurred during the file upload process.', error: err.message });
});

module.exports = router;