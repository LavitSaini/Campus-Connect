import React, { useState } from "react";
import useAuthStore from "../stores/authStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { login, isUserAuthenticating } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required!");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const successValidated = validateForm();

    if (successValidated === true) login(formData);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen px-8 py-10">
      <div className="absolute inset-0 bg-[url('/assets/images/hero.png')] bg-cover bg-center bg-no-repeat ">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="relative w-full max-w-lg flex flex-col gap-6 bg-white rounded-lg p-8 shadow-md z-10">
        <div className="text-center">
          <div className="flex flex-col items-center gap-2 group">
            <img src="../assets/images/logo.png" alt="Logo" className="w-24" />
            <h1 className="text-2xl font-bold">Login your existing account</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full text-primary-500 border-2 border-primary-500 bg-transparent hover:bg-primary-500 hover:text-white hover:border-primary-500 mt-5"
            disabled={isUserAuthenticating}
          >
            {isUserAuthenticating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline text-primary-500">
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
