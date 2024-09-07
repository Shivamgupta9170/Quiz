const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ success: false, msg: 'No or malformed token provided' });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, msg: 'Invalid token' });
        }

        try {
            const user = await User.findById(decoded.userId).select('-password');
            if (!user) {
                return res.status(404).json({ success: false, msg: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    });
};

module.exports = authenticateToken;

