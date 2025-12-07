import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center">
        <h1 className="text-6xl font-bold text-error mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link className="btn btn-primary">Go Back Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
