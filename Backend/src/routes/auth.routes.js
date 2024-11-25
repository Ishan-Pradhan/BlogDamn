import express from "express";
import {
  registerController,
  loginController,
  // googleCallbackController,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  generateOtpController,
  verifyOtpController,
} from "../controllers/otp.controller.js";
// import passport from "../utils/passport.js";

const router = express.Router();

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   googleCallbackController
// );

// Register route
router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerController);
router.post("/login", loginController);

router.post("/generate-otp", generateOtpController); // Generate OTP route
router.post("/verify-otp", verifyOtpController); // Verify OTP route

export default router;
