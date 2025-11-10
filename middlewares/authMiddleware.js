const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('../utils/tokenBlacklist');
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    // Check if token exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided or invalid format',
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    
    // Store token in req for controllers that need it (like logout)
    req.token = token;
    
    // Check blacklist
    if (isBlacklisted(token)) {
      return res.status(401).json({ success: false, message: 'Token is revoked. Please login again.' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('JWT Verification Error:', err.message);
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired token',
        });
      }

      // Attach decoded user info to request
      req.user = decoded;

      // Continue to next middleware or route
      next();
    });
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

module.exports = authMiddleware;
