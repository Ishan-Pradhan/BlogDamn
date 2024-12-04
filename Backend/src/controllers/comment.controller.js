import { Comment } from "../models/Comment.models.js";
import { Blog } from "../models/Blog.models.js";

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { content, blog } = req.body;

    // Check if user information is attached
    if (!req.user || !req.user.userId) {
      return res
        .status(400)
        .json({ success: false, message: "User information is missing" });
    }

    // Validate required fields
    if (!content.trim() || !blog) {
      return res
        .status(400)
        .json({ success: false, message: "Content and blog ID are required" });
    }

    // Ensure the referenced blog exists
    const blogExists = await Blog.findById(blog);
    if (!blogExists) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Create and save the comment
    const newComment = new Comment({
      content,
      user: req.user.userId,
      blog,
    });

    const savedComment = await newComment.save();

    res.status(201).json({ success: true, comment: savedComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
// Get all comments for a blog post
export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blog: blogId })
      .populate("user", "username avatar") // Fetch user info (username and avatar)
      .sort({ createdAt: -1 }); // Sort by latest comments

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a comment (only the owner can update)
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params; // Comment ID
    const { content } = req.body;

    if (!content.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Content is required" });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    // Check if the user owns the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ success: true, comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a comment (only the owner or admin can delete)
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // Comment ID

    const comment = await Comment.findById(id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    // Check if the user owns the comment or is an admin
    if (
      comment.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    await comment.deleteOne();

    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { createComment };
