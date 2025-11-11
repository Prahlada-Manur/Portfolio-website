const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenData.userId;
    next();
  } catch (err) {
    console.error('Auth Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;
