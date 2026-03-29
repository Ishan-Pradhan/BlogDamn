import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ page = 1, limit = 10, search = "", category = "", sort = "" } = {}, { rejectWithValue }) => {
    try {
      let url = `/blogs?page=${page}&limit=${limit}`;
      if (search) url += `&search=${search}`;
      if (category) url += `&category=${category}`;
      if (sort) url += `&sort=${sort}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTrendingBlogs = createAsyncThunk(
  "blogs/fetchTrendingBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/blogs?limit=5&sort=popular");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBlog = createAsyncThunk(

  "blogs/createBlog",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/createBlog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  blogs: [],
  trendingBlogs: [],
  currentBlog: null,
  totalBlogs: 0,
  totalPages: 0,
  currentPage: 1,
  searchQuery: "",
  selectedCategory: "Home",
  selectedSort: "newest",
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    clearBlogError: (state) => {
      state.error = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.totalBlogs = action.payload.totalBlogs;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch blogs";
      })
      .addCase(fetchTrendingBlogs.fulfilled, (state, action) => {
        state.trendingBlogs = action.payload.blogs;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.currentBlog = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload.blog;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch blog";
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload.blog);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create blog";
      });
  },
});

export const { 
  setSearchQuery, 
  setSelectedCategory, 
  setSelectedSort, 
  clearBlogError, 
  clearCurrentBlog 
} = blogSlice.actions;
export default blogSlice.reducer;


