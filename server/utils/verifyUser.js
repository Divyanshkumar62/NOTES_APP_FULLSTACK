import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    // Try to get token from cookies or Authorization header
    const token = req.cookies?.access_token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        console.error("❌ Unauthorized: No token provided in cookies or headers.");
        return next(errorHandler(401, "Unauthorized"));
    }
    
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log("✅ User authenticated:", user);
        
        next();
    } catch (err) {
        console.error("❌ JWT Verification failed:", err.message);
        return next(errorHandler(403, "Forbidden"));
    }
};
