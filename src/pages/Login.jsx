import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, LogIn } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { Login, SignInGoogle, setUser, setLoading } = useContext(AuthContext);
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";
  const { register, handleSubmit, setValue } = useForm();

  const handleDemoLogin = () => {
    setValue("email", "spsiam99@gmail.com");
    setValue("password", "Sp999999");

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title:
        lang === "bn" ? "ডেমো তথ্য বসানো হয়েছে" : "Demo credentials applied",
      showConfirmButton: false,
      timer: 1500,
      background: "#F5F5DC",
      color: "#5C4033",
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await Login(data.email, data.password);
      setUser(res.user);
      Swal.fire({
        icon: "success",
        title: lang === "bn" ? "স্বাগতম!" : "Welcome Back!",
        timer: 1500,
        showConfirmButton: false,
        confirmButtonColor: "#2D5A27",
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: lang === "bn" ? "লগইন ব্যর্থ" : "Login Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white dark:bg-earth-brown/10 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-nature-green/10">
        <h2 className="text-3xl font-bold text-nature-green text-center mb-8">
          {lang === "bn" ? "লগইন করুন" : "Login to Pothik"}
        </h2>

        {/* Demo Credential Button */}
        <button
          onClick={handleDemoLogin}
          className="w-full mb-6 py-3 px-4 bg-harvest-gold/10 text-earth-brown border border-dashed border-harvest-gold/50 rounded-xl hover:bg-harvest-gold/20 transition-all text-sm font-bold flex items-center justify-center gap-2 group"
        >
          <ShieldCheck
            size={18}
            className="text-harvest-gold group-hover:scale-110 transition-transform"
          />
          {lang === "bn" ? "ডেমো ইউজার ব্যবহার করুন" : "Use Demo Credentials"}
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-earth-brown">
              <Mail size={16} className="text-nature-green" />
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full p-3 rounded-xl border border-nature-green/20 focus:ring-2 focus:ring-nature-green outline-none transition-all"
              placeholder="example@mail.com"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-earth-brown">
              <Lock size={16} className="text-nature-green" />
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", { required: true })}
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-nature-green text-white py-3 rounded-xl font-bold hover:bg-earth-brown transition-all shadow-lg transform active:scale-95 flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            {lang === "bn" ? "প্রবেশ করুন" : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-earth-brown/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-earth-brown/50 font-medium">
              {lang === "bn" ? "অথবা" : "Or continue with"}
            </span>
          </div>
        </div>

        {/* Google Login */}
        <button
          onClick={() => SignInGoogle().then(() => navigate(from))}
          className="w-full flex items-center justify-center gap-3 border-2 border-nature-green/20 py-3 rounded-xl hover:bg-nature-green/5 transition-all font-medium text-earth-brown group"
        >
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
          >
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
          Google
        </button>

        <p className="text-center mt-8 text-sm text-earth-brown/70">
          {lang === "bn" ? "নতুন ইউজার?" : "New here?"}
          <Link
            to="/register"
            className="text-nature-green font-bold ml-1 hover:underline"
          >
            {lang === "bn" ? "অ্যাকাউন্ট তৈরি করুন" : "Create Account"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
