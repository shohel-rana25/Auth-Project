import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: 'No token, not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select('-password');
    
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired', error: error.message });
  }
};

export default protect;
