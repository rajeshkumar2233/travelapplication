// const express = require('express');
// const userController = require('../controllers/userController');

// const router = express.Router();

// router.post('/register', userController.register);
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);

// module.exports = router;



const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    req.session.user = { _id: user._id, name: user.name, email: user.email };
    res.json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    req.session.user = { _id: user._id, name: user.name, email: user.email };
    res.json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Logout a user
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ msg: 'User logged out' });
});

module.exports = router;
