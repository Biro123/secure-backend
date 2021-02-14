const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('User route'));

// @route   GET api/users/me
// @desc    Get user id for current logged-in user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // find the user in the database with the id from the token
    // as decoded in auth middleware. Exclude password from db read
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Not a valid email').isEmail(),
  check('password', 'Please enter 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try{
    // See if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ 
        errors: [{ msg: 'User already exists' 
      }] });
    }

    // Get user's gravatr
    const avatar = gravatar.url(email, { 
      s: 200, r: 'pg', d: 'mm' 
    });

    user = new User({
      name,
      email,
      avatar,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Write record to db
    await user.save();

    // Return jsonwebtoken to automatically log in newly-registered user
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 }, // Totdo prod should be 3600
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }


});

module.exports = router;