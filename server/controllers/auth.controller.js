import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    const isValidUser = await User.findOne({ email })

    if(isValidUser){
        return next(errorHandler(400, "User already Exists"))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try{
        await newUser.save()

        res.status(201).json({
            success: true,
            message: "User Created Successfully"
        })
    } catch(error){
        next(error)
    }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Credentials"));
    }
    // Generate the JWT token. You can add an expiry if you wish.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Remove the password field from the user object before sending back
    const { password: pass, ...rest } = validUser._doc;
    
    // Set the cookie with options that support cross-domain requests:
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // true if running on HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" in production for cross-site; "lax" for local testing
      path: "/" // cookie available to the entire site
    })
    .status(200)
    .json({
      success: true,
      message: "Login Successful",
      rest
    });
  } catch (err) {
    next(err);
  }
};



export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    });
    res.status(200).json({
      success: true,
      message: "User Signed out"
    });
  } catch (err) {
    next(err);
  }
};
