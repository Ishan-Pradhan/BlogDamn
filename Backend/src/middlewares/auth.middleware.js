import dotenv from "dotenv";
dotenv.config();
import JWT from "jsonwebtoken";
import { User } from "../models/User.models.js";

import { ApiError } from "../utils/ApiError.js";

export const requireSignIn = async (req, res, next) => {
  try {
    console.log(process.env.JWT_SECRET);
    // Check if the Authorization header exists
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ success: false, message: "JWT must be provided" });
    }

    // Get the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify and decode the JWT token
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    console.log(decode);

    // Attach the decoded user information to the request object
    req.user = decode;

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      throw new ApiError(401, "unauthorized access");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
