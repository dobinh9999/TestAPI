const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware kiểm tra token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer token

    if (!token) return res.status(401).json({ message: 'Access token missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Gắn user vào request
        next();
    });
};

// Middleware kiểm tra quyền
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập chức năng này.' });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
