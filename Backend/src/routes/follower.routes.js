import express from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/follower.controller.js";
import { requireSignIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Follow a user
router.post("/user/:id/follow", requireSignIn, followUser);

// Unfollow a user
router.post("/user/:id/unfollow", requireSignIn, unfollowUser);

// Get followers
router.get("/user/:id/followers", requireSignIn, getFollowers);

// Get following
router.get("/user/:id/following", requireSignIn, getFollowing);

export default router;
