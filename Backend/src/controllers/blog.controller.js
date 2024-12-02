import { Blog } from "../models/Blog.models.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    if (!title || !content || !author || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const blog = new Blog({
      title,
      content,
      author,
      image,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully.", blog });
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog.", error });
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
