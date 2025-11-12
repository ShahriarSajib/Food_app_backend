const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('../utils/tokenBlacklist');

const adminMiddleware = (req, res, next) => {
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
    req.token = token; // Store token for controllers that might need it

    // Check blacklist
    if (isBlacklisted(token)) {
      return res.status(401).json({
        success: false,
        message: 'Token is revoked. Please login again.',
      });
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

      // Attach user info to request
      req.user = decoded;

      // Check admin role
      if (req.user.userType !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admins only.',
        });
      }

      // Continue to next middleware or route
      next();
    });
  } catch (error) {
    console.error('Admin Middleware Error:', error);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message,
    });
  }
};

module.exports = adminMiddleware;
