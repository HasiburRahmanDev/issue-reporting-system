import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const SubmitIssue = () => {
  const navigate = useNavigate();

  // Example user data (replace with real auth/user context)
  const user = {
    id: "citizen123",
    subscription: "free", // "free" or "premium"
    reportedIssuesCount: 2, // track how many issues user has already reported
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (user.subscription === "free" && user.reportedIssuesCount >= 3) {
      return; // prevent submission
    }

    setSubmitting(true);

    // Simulate saving to DB
    const newIssue = {
      ...data,
      submittedBy: user.id,
      status: "Pending",
      priority: "Normal",
      upvotes: 0,
      boosted: false,
      timeline: [
        {
          status: "Pending",
          message: "Issue reported by citizen",
          updatedBy: "Citizen",
          date: new Date().toLocaleString(),
        },
      ],
    };

    console.log("Saved issue:", newIssue);

    // TODO: save to Firebase/Backend here

    setSubmitting(false);

    // Navigate to My Issues page
    navigate("/my-issues");
  };

  const handleSubmitIssue = (data) => {
    console.log(data.title);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "issued!",
          text: "Your issue has been submitted",
          icon: "success",
        });
      }
    });
  };

  const isLimitReached =
    user.subscription === "free" && user.reportedIssuesCount >= 3;

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-lg shadow-lg bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">
            Report an Issue
          </h2>

          {isLimitReached ? (
            <div className="alert alert-warning">
              <span>
                Free users can report a maximum of 3 issues. Upgrade to premium
                for unlimited reporting.
              </span>
              <button
                className="btn btn-primary ml-4"
                onClick={() => navigate("/profile")}
              >
                Subscribe Now
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleSubmitIssue)}
              className="space-y-4"
            >
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter issue title"
                  className="input input-bordered w-full"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <span className="text-error text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="Describe the issue"
                  className="textarea textarea-bordered w-full"
                  rows="4"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <span className="text-error text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  defaultValue=""
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Roads">Roads</option>
                  <option value="Safety">Safety</option>
                  <option value="Environment">Environment</option>
                </select>
                {errors.category && (
                  <span className="text-error text-sm">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* Upload Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upload Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  {...register("image")}
                />
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="input input-bordered w-full"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <span className="text-error text-sm">
                    {errors.location.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Issue"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitIssue;
