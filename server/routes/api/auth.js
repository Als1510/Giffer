const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User')
require('dotenv').config();

router.post('/register', [
  (check('name', 'Name is required').not().isEmpty()),
  (check('email', 'Please include a valid email').isEmail()),
  (check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }))
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, favourites } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    user = new User({
      name,
      email,
      password,
      favourites: []
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json({ msg: "Registered Successfully!" })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error!')
  }
})

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Please register your account' }] })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw error;
        res.json({ token, name: user.name, id: user.id });
      }
    )
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error!')
  }
})

module.exports = router;