import React from "react";
import UseAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInGoogle } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location);

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        toast.success("Logged in Successfully");
        navigate(location.state || "/");

        // create user in the database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photURL: result.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data has been stored", res.data);
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full flex items-center gap-2"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
