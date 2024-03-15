const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username,email,password,role } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = new User({
      username,
      email,
      password,
      role,
      // Add other user fields as needed
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
};
