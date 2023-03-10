const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function(req, res, next) {
  // const token = req.header('x-auth-token');
  const token = req.headers['authorization']
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}