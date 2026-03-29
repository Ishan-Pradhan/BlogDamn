import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../features/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, LogIn, AlertCircle, ArrowRight } from "lucide-react";
import Button from "../../components/Button";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, location, dispatch]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="text-center group">
          <div className="mx-auto h-16 w-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
            <LogIn className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-black hover:underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 animate-shake">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50 border rounded-2xl text-gray-900 focus:bg-white transition-all outline-none ${
                    errors.email ? "border-red-300 ring-2 ring-red-50" : "border-gray-100 focus:border-black"
                  }`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 font-medium ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50 border rounded-2xl text-gray-900 focus:bg-white transition-all outline-none ${
                    errors.password ? "border-red-300 ring-2 ring-red-50" : "border-gray-100 focus:border-black"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 font-medium ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link to="/forgot-password" size="sm" className="text-xs font-bold text-gray-400 hover:text-black transition-colors">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            loading={loading}
            color="primary"
            rounded="full"
            className="w-full py-4 flex items-center justify-center gap-2 group text-lg"
          >
            Sign in
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-300 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              color="secondary"
              rounded="full"
              className="py-3.5 flex items-center justify-center gap-3 border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              <span className="text-sm font-bold text-gray-700">Google Account</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
