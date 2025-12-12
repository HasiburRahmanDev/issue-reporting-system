import React from "react";
import UseAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { signInGoogle } = UseAuth();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        toast.success("Logged in Successfully");
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
