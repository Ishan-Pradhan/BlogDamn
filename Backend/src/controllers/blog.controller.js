import mongoose from "mongoose";
import { Blog } from "../models/Blog.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/User.models.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const authorId = req.user._id || req.user.userId;
 // Support both just in case

    if (!authorId) {
      return res.status(401).json({ message: "Authentication required." });
    }

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const imageLocalPath = req.files?.image?.[0]?.path;
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
      category,
      author: authorId,
      image: blogImage.secure_url,
    });


    // Save blog to DB
    await blog.save();
    
    // Populate author before sending response
    await blog.populate("author", "username avatar");

    res.status(201).json({ message: "Blog created successfully.", blog });
  } catch (error) {
    console.error("Create Blog Error:", error);
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
    const { page = 1, limit = 10, search, category, sort } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }
    if (category && category !== "Home") {
      query.category = { $regex: category, $options: "i" };
    }

    let blogsQuery = Blog.find(query).populate("author", "username avatar");

    if (sort === "popular") {
      // Sorting by likes length using aggregation would be better, but for now:
      // We'll use aggregation to include likesCount
      const blogs = await Blog.aggregate([
        { $match: query },
        {
          $addFields: {
            likesCount: { $size: "$likes" },
          },
        },
        { $sort: { likesCount: -1, createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: parseInt(limit) },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorDetails",
          },
        },
        { $unwind: "$authorDetails" },
        {
          $project: {
            title: 1,
            content: 1,
            category: 1,
            image: 1,
            likes: 1,
            createdAt: 1,
            author: {
              _id: "$authorDetails._id",
              username: "$authorDetails.username",
              avatar: "$authorDetails.avatar",
            },
          },
        },
      ]);
      const totalBlogs = await Blog.countDocuments(query);
      return res.status(200).json({
        blogs,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
      });
    } else {
      // Default: sort by newest
      const blogs = await blogsQuery
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const totalBlogs = await Blog.countDocuments(query);

      res.status(200).json({
        blogs,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
      });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs.", error });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", "username avatar");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ message: "Failed to fetch blog.", error });
  }
};

