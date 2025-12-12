import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = UseAuth();

  const location = useLocation();
  const navigate = useNavigate();
  console.log("in the login page", location);

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        toast.success("Logged in Successfully");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-lg bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500">password is required</p>
            )}

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Sign-In */}
          <SocialLogin></SocialLogin>
          <p>
            New to this website? please{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
