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
