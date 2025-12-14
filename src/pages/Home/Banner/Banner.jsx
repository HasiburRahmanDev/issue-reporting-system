import React from "react";
import bannerImg from "../../../assets/clean.jpg";
import { NavLink } from "react-router";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-base-200 p-8 rounded-lg shadow-md">
      {/* Left Side: Article */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold text-primary">
          Report Infrastructure Issues
        </h1>
        <p className="text-lg text-gray-700">
          Help us improve our city by reporting problems with roads,
          streetlights, bridges, and other public facilities. Your feedback
          ensures safer and better infrastructure for everyone.
        </p>
        <NavLink to="/submit-issue" className="btn btn-primary">
          Report an Issue
        </NavLink>
      </div>

      {/* Right Side: Image */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <img
          src={bannerImg}
          alt="City Infrastructure"
          className="rounded-lg shadow-lg max-h-72"
        />
      </div>
    </div>
  );
};

export default Banner;
