import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register as registerAction, clearError } from "../../features/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Lock, Camera, ArrowRight, AlertCircle, CheckCircle2, UserPlus, X } from "lucide-react";
import Button from "../../components/Button";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignupPage = () => {
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarError, setAvatarError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setAvatarError("Avatar must be less than 5MB");
        return;
      }
      setAvatar(file);
      setAvatarError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
  };

  const onSubmit = (data) => {
    if (!avatar) {
      setAvatarError("Please upload an avatar");
      return;
    }
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", avatar);
    dispatch(registerAction(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-xl w-full space-y-10 bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-gray-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="text-center relative z-10">
          <div className="mx-auto h-20 w-20 bg-black rounded-3xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform shadow-xl shadow-gray-200">
            <UserPlus className="text-white" size={40} />
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900 tracking-tight">Join the fold.</h2>
          <p className="mt-3 text-lg text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-black hover:underline underline-offset-4 decoration-2">
              Sign in here
            </Link>
          </p>
        </div>

        <form className="mt-12 space-y-8 relative z-10" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl flex items-center gap-4 animate-shake">
              <AlertCircle size={24} />
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div
                className={`w-32 h-32 rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed flex items-center justify-center transition-all ${
                  avatarError ? "border-red-300 bg-red-50" : "border-gray-200 group-hover:border-black group-hover:bg-white"
                }`}
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-black">
                    <Camera size={28} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Avatar</span>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {avatarPreview && (
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="absolute -top-3 -right-3 bg-white border border-gray-100 p-1.5 rounded-full shadow-lg hover:bg-gray-50 transition-colors text-red-500 hover:scale-110"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {avatarError && <p className="mt-2.5 text-xs text-red-500 font-bold uppercase tracking-wide">{avatarError}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">
                Display Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                  <User size={20} />
                </div>
                <input
                  {...register("username")}
                  type="text"
                  className={`block w-full pl-12 pr-6 py-4 bg-gray-50 border rounded-2xl text-gray-900 focus:bg-white transition-all outline-none ${
                    errors.username ? "border-red-300 ring-4 ring-red-50" : "border-gray-100 focus:border-black shadow-sm"
                  }`}
                  placeholder="The Wanderer"
                />
              </div>
              {errors.username && <p className="mt-2 text-xs text-red-500 font-medium ml-1">{errors.username.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className={`block w-full pl-12 pr-6 py-4 bg-gray-50 border rounded-2xl text-gray-900 focus:bg-white transition-all outline-none ${
                    errors.email ? "border-red-300 ring-4 ring-red-50" : "border-gray-100 focus:border-black shadow-sm"
                  }`}
                  placeholder="wanderer@fold.com"
                />
              </div>
              {errors.email && <p className="mt-2 text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className={`block w-full pl-12 pr-6 py-4 bg-gray-50 border rounded-2xl text-gray-900 focus:bg-white transition-all outline-none ${
                    errors.password ? "border-red-300 ring-4 ring-red-50" : "border-gray-100 focus:border-black shadow-sm"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-2 text-xs text-red-500 font-medium ml-1">{errors.password.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-6">
            <Button
              type="submit"
              loading={loading}
              color="primary"
              rounded="full"
              className="w-full py-5 flex items-center justify-center gap-3 group text-xl"
            >
              Start Writing
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckCircle2 size={24} className="text-green-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">Premium Reader Plan Enabled</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By signing up, you get full access to all stories and the ability to publish your own.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
