import express from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/createBlog", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
