const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { categories, name, email, phone, socialHandle } = req.body;
    
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }
    
    // Create new user
    const newUser = new User({
      categories,
      name,
      email,
      phone,
      socialHandle
    });
    
    // Save user to database
    await newUser.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Registration successful',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration',
      error: error.message
    });
  }
});

module.exports = router;