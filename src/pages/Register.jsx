import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Link as LinkIcon,
  LogIn,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Register = () => {
  const { SignUp, profileUpdate, SignInGoogle, setUser } =
    useContext(AuthContext);
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutation = useMutation({
    mutationFn: (newUser) => axios.post("http://localhost:5000/users", newUser),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: lang === "bn" ? "অভিনন্দন!" : "Success!",
        text:
          lang === "bn" ? "রেজিস্ট্রেশন সফল হয়েছে" : "Registration Successful",
        confirmButtonColor: "#2D5A27",
      });
      navigate("/");
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await SignUp(data.email, data.password);
      await profileUpdate(data.name, data.photo);

      const userData = {
      name: data.name,
      email: data.email,
      photo: data.photo,
      uid: result.user.uid,
      role: 'user', 
      createdAt: new Date(),
    };
      mutation.mutate(userData);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="bg-white dark:bg-earth-brown/10 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-nature-green/10">
        <h2 className="text-3xl font-bold text-nature-green text-center mb-6">
          {lang === "bn" ? "নতুন অ্যাকাউন্ট" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-earth-brown">
              <User size={16} className="text-nature-green" />
              {lang === "bn" ? "নাম" : "Name"}
            </label>
            <input
              {...register("name", { required: true })}
              className={`w-full p-3 rounded-xl border ${
                errors.name ? "border-red-500" : "border-nature-green/20"
              } focus:ring-2 focus:ring-nature-green outline-none transition-all`}
              placeholder={lang === "bn" ? "আপনার নাম" : "Your Name"}
            />
          </div>

          {/* Photo Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-earth-brown">
              <LinkIcon size={16} className="text-nature-green" />
              {lang === "bn" ? "ফটো লিঙ্ক" : "Photo URL"}
            </label>
            <input
              {...register("photo")}
              className="w-full p-3 rounded-xl border border-nature-green/20 focus:ring-2 focus:ring-nature-green outline-none transition-all"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-earth-brown">
              <Mail size={16} className="text-nature-green" />
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full p-3 rounded-xl border border-nature-green/20 focus:ring-2 focus:ring-nature-green outline-none transition-all"
              placeholder="pothik@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1 relative">
            <label className="flex items-center gap-2 text-sm font-semibold text-earth-brown">
              <Lock size={16} className="text-nature-green" />
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[a-z])/,
                })}
                type={showPassword ? "text" : "password"}
                className="w-full p-3 rounded-xl border border-nature-green/20 focus:ring-2 focus:ring-nature-green outline-none transition-all"
                placeholder="******"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-nature-green/60 hover:text-nature-green transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-[10px] text-red-500 mt-1 block leading-tight">
                {lang === "bn"
                  ? "কমপক্ষে ৬ অক্ষর, বড় ও ছোট হাতের অক্ষর প্রয়োজন"
                  : "Min 6 chars, uppercase & lowercase required."}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-nature-green text-white py-3 mt-4 rounded-xl font-bold hover:bg-earth-brown transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <span className="animate-pulse">
                {lang === "bn" ? "প্রক্রিয়াধীন..." : "Processing..."}
              </span>
            ) : (
              <>
                <LogIn size={20} />
                {lang === "bn" ? "নিবন্ধন করুন" : "Register Now"}
              </>
            )}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() =>
              SignInGoogle().then((res) =>
                mutation.mutate({
                  name: res.user.displayName,
                  email: res.user.email,
                })
              )
            }
            className="w-full flex items-center justify-center gap-3 border-2 border-nature-green/20 py-3 rounded-xl hover:bg-nature-green/5 transition-all font-medium text-earth-brown"
          >
            {/* Google এর জন্য Lucide এ সরাসরি রঙিন লোগো নেই, তাই SVG ব্যবহার করা বেস্ট */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {lang === "bn" ? "গুগল দিয়ে সাইন-আপ" : "Sign up with Google"}
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-earth-brown/70">
          {lang === "bn" ? "অ্যাকাউন্ট আছে?" : "Already have an account?"}
          <Link
            to="/login"
            className="text-nature-green font-bold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
