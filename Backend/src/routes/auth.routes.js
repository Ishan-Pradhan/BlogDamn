import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  // googleCallbackController,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  generateOtpController,
  verifyEmailController,
} from "../controllers/otp.controller.js";
// import passport from "../utils/passport.js";

const router = express.Router();

// Register route
router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerController);
router.post("/login", loginController);

router.post("/generate-otp", generateOtpController); // Generate OTP route
router.post("/verify-email", verifyEmailController); // Verify OTP route
router.post("/forgot-password", forgotPasswordController); // Forgot password route
router.post("/reset-password", resetPasswordController);

export default router;
