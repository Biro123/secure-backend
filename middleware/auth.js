const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check token present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorisation denied' });
  }

  // Verify token
  try {
    // decode token with secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // extract the user from the decoded token
    req.user = decoded.user;

    // execute callback
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};