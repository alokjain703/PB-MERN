const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); // For password hashing

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Convert email to lowercase
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hash with 10 salt rounds
  }
  next();
});

// Method to compare candidate password with the stored hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


export const User = mongoose.model("User", UserSchema);
module.exports = User;
