import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Register route
router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerController);
router.post("/login", loginController);

export default router;
