import express from "express";
import {
  createComment,
  getCommentsByBlog,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { requireSignIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/comment", requireSignIn, createComment);

// Get all comments for a blog post
router.get("/comment/:blogId", getCommentsByBlog);

// Update a comment (authenticated users only)
router.put("/comment/:id", requireSignIn, updateComment);

// Delete a comment (authenticated users or admins only)
router.delete("/comment/:id", requireSignIn, deleteComment);

export default router;
