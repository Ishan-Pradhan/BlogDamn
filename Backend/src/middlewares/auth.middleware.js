import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

import { ApiError } from "../utils/ApiError.js";

export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded; // Attach decoded user data (e.g., userId) to request
    next();
  } catch (error) {
    console.error("Token Error:", error.message);
    res.status(401).json({ message: "Invalid or expired access token" });
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
