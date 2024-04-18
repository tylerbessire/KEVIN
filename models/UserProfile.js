const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preferences: { type: Map, of: String },
  language: { type: String, default: 'en' }
});

userProfileSchema.pre('save', function(next) {
  console.log(`Saving user profile for user ID: ${this.userId}`);
  next();
});

userProfileSchema.post('save', function(doc, next) {
  console.log(`User profile saved for user ID: ${doc.userId}`);
  next();
});

userProfileSchema.methods.logError = function(error) {
  console.error(`Error for user ID ${this.userId}: ${error.message}\n${error.stack}`);
};

module.exports = mongoose.model('UserProfile', userProfileSchema);