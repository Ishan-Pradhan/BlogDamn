import express from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/createBlog")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
