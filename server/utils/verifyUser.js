import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  let token;

  // First, try to get the token from the cookies.
  if (req.cookies && req.cookies.access_token) {
    token = req.cookies.access_token;
  } 
  // If not found in cookies, try to get it from the Authorization header.
  else if (req.headers.authorization) {
    // Expecting the header format to be: "Bearer <token>"
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

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
