// middlewares/isAdmin.js
const isAdmin = (req, res, next) => {
    // Assuming the authenticateToken middleware has already attached user data to req.user
    if (!req.user) {
        return res.status(401).json({ success: false, msg: 'User not authenticated' });
    }

    // Check if the user is an admin based on the role field
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, msg: 'Access denied. Admins only' });
    }

    // If user is an admin, proceed to the next middleware/route handler
    next();
};

module.exports = isAdmin;

