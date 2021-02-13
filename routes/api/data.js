const { Router } = require('express');
const express = require('express');
const router = express.Router();

// @route   GET api/data
// @desc    Sample for protected data. Replace with your own
// @access  Private
router.get('/', (req, res) => res.send('Protected Data route'));

module.exports = router;