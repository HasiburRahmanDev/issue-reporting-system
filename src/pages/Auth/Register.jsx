import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = UseAuth();

  const handleRegistration = (data) => {
    console.log(data);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const imageAPIURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(imageAPIURL, formData).then((res) => {
          console.log("after image upload", res);
          const userProfile = {
            displayName: data.name,
            photURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
            })
            .catch((error) => console.log(error));
        });

        toast.success("Registered successfully");
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-lg bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-4"
          >
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
            </div>
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            {/* Photo */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Photo</span>
              </label>

              <input
                type="file"
                {...register("photo", { required: true })}
                placeholder="your photo"
                className="file-input input-bordered w-full"
              />
            </div>
            {errors.file?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )}

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
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                })}
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">minimum length should be 6</p>
              )}
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p>
                  Must have at least one uppercase, at lease one lowercase, at
                  least one number and min length 6
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Register
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Sign-Up */}

          <SocialLogin></SocialLogin>
          {/* Already have account */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
