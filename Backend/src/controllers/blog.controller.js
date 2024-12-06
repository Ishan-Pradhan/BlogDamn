import mongoose from "mongoose";
import { Blog } from "../models/Blog.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/User.models.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, author, image } = req.body; // Destructure author from body
    console.log("Received data:", { title, content, author, image });

    // Ensure author is passed and valid
    if (!author) {
      return res.status(400).json({ message: "Author is required." });
    }

    // Correct usage of ObjectId
    const authorId = new mongoose.Types.ObjectId(author); // Convert to ObjectId

    // Check if the author exists in the database
    const authorDoc = await User.findById(authorId); // Check if the author exists in the User model
    if (!authorDoc) {
      return res.status(400).json({ message: "Author not found." });
    }

    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const imageLocalPath = req.files?.image?.[0]?.path; // Check if image file exists
    console.log("Image Local Path:", imageLocalPath);

    if (!imageLocalPath) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Upload image to Cloudinary
    const blogImage = await uploadOnCloudinary(imageLocalPath);
    if (!blogImage || !blogImage.secure_url) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary." });
    }

    // Create blog entry
    const blog = new Blog({
      title,
      content,
      author: authorId, // Store author as ObjectId
      image: blogImage.secure_url, // Store Cloudinary image URL
    });

    // Save blog to DB
    await blog.save();
    res.status(201).json({ message: "Blog created successfully.", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create blog.",
      error: error.message || error,
    });
  }
};

// Update an existing blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content, image, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json({ message: "Blog updated successfully.", blog });
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog.", error });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog.", error });
  }
};

export const likeBlog = async (req, res) => {
  const { id: blogId } = req.params; // Blog ID from the URL
  const userId = req.user.userId; // Logged-in user's ID from JWT
  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    if (blog.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this blog." });
    }

    blog.likes.push(userId); // Add user to likes array
    await blog.save();

    res.status(200).json({ message: "Blog liked successfully." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const unlikeBlog = async (req, res) => {
  const { id: blogId } = req.params; // Blog ID from the URL
  const userId = req.user.userId; // Logged-in user's ID from JWT

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    if (!blog.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You haven't liked this blog yet." });
    }

    blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    await blog.save();

    res.status(200).json({ message: "Blog unliked successfully." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const getBlogLikes = async (req, res) => {
  const { id: blogId } = req.params; // Blog ID from the URL

  try {
    const blog = await Blog.findById(blogId).populate("likes", "username");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res
      .status(200)
      .json({ likesCount: blog.likes.length, likedBy: blog.likes });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    const blogs = await Blog.find()
      .populate("author", "username avatar") // Populate author details
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit) // Pagination logic
      .limit(parseInt(limit)); // Limit the number of results

    const totalBlogs = await Blog.countDocuments(); // Total number of blogs

    res.status(200).json({
      message: "Blogs retrieved successfully.",
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs.", error });
  }
};
