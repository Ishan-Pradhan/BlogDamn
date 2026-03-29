import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogLikes,
  getBlogs,
  getBlogById,
  likeBlog,

  unlikeBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { requireSignIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/createBlog")
  .post(
    requireSignIn,
    upload.fields([{ name: "image", maxCount: 1 }]),
    createBlog
  );

router.put("/update-blog/:id", requireSignIn, updateBlog);
router.delete("/delete-blog/:id", requireSignIn, deleteBlog);

router.post("/blogs/:id/like", requireSignIn, likeBlog);
router.post("/blogs/:id/unlike", requireSignIn, unlikeBlog);
router.get("/blogs/:id", getBlogById);
router.get("/blogs", getBlogs);
export default router;


