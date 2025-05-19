import express from 'express';
import crypto from 'crypto';
import User from '../model/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    user = new User({ name, email });
    await user.save();

    // Generate a strong random token (64-character hex string)
    const token = crypto.randomBytes(32).toString('hex');

    return res.status(201).json({
      message: 'User registered successfully',
      user,
      token, // include the token in the response
    });

  } catch (error) {
    console.error('Error in /register:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
