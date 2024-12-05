import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogLikes,
  likeBlog,
  unlikeBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { requireSignIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/createBlog")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createBlog);
router.put("updateBlog/:id", updateBlog);
router.delete("deleteBlog/:id", deleteBlog);

router.post("/blogs/:id/like", requireSignIn, likeBlog);
router.post("/blogs/:id/unlike", requireSignIn, unlikeBlog);
router.get("/blogs/:id/likes", getBlogLikes);
export default router;
