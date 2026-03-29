import React, { useState, useEffect } from "react";
import Header from "../components/Navbar/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, clearBlogError } from "../features/blogSlice";
import { Image as ImageIcon, X, Send, Type, FileText, AlertCircle } from "lucide-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ["General", "Anime", "Sports", "Technology", "Travel", "Games", "Food", "Music"];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    const result = await dispatch(createBlog(formData));
    if (createBlog.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center justify-between border-b pb-6">
            <h1 className="text-4xl font-serif font-bold text-gray-900">Create New Story</h1>
            <Button
              type="submit"
              loading={loading}
              disabled={!title || !content || !image}
              color="primary"
              rounded="full"
              className="px-8 py-2.5 flex items-center gap-2"
            >
              <Send size={18} />
              Publish
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Banner Image Upload */}
          <div className="relative group">
            {imagePreview ? (
              <div className="relative aspect-video rounded-3xl overflow-hidden border">
                <img src={imagePreview} alt="Banner Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-900 hover:bg-white transition-colors shadow-lg"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video w-full rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="p-4 rounded-full bg-white shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                  <p className="mb-2 text-sm text-gray-700 font-semibold">
                    Click to upload banner image
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or WEBP (Max. 5MB)
                  </p>
                </div>
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>

          {/* Category Selector */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400 group-within:text-black transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest">Topic</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    category === cat
                      ? "bg-black text-white scale-105 shadow-md shadow-gray-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400 group-within:text-black transition-colors">
              <Type size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Headline</span>
            </div>
            <textarea
              placeholder="Give your story a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl md:text-5xl font-serif font-bold border-none focus:ring-0 placeholder:text-gray-200 resize-none overflow-hidden h-auto"
              rows={2}
            />
          </div>

          {/* Content Input */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400 group-within:text-black transition-colors">
              <FileText size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Content</span>
            </div>
            <textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xl font-light leading-relaxed border-none focus:ring-0 placeholder:text-gray-200 min-h-[400px] resize-none"
            />
          </div>
        </form>
      </div>
    </div>

  );
};

export default CreateBlog;

