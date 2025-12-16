import React from "react";
import { Link } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

function AllIssues() {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { data: issues = [] } = useQuery({
    queryKey: ["myIssues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  //   // Static sample issues
  //   const issues = [
  //     {
  //       id: 1,
  //       title: "Broken Streetlight",
  //       category: "Infrastructure",
  //       status: "Open",
  //       priority: "High",
  //       location: "Main Road, Sector 5",
  //       image: "https://via.placeholder.com/300x200.png?text=Streetlight",
  //       upvotes: 12,
  //     },
  //     {
  //       id: 2,
  //       title: "Pothole on Avenue",
  //       category: "Roads",
  //       status: "Resolved",
  //       priority: "Normal",
  //       location: "Downtown Avenue",
  //       image: "https://via.placeholder.com/300x200.png?text=Pothole",
  //       upvotes: 8,
  //     },
  //     {
  //       id: 3,
  //       title: "Damaged Bridge Railings",
  //       category: "Safety",
  //       status: "In Progress",
  //       priority: "High",
  //       location: "River Bridge",
  //       image: "https://via.placeholder.com/300x200.png?text=Bridge",
  //       upvotes: 20,
  //     },
  //   ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">All Issues</h1>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search issues..."
          className="input input-bordered w-full md:w-1/3"
        />
        <select className="select select-bordered w-full md:w-1/4">
          <option disabled selected>
            Filter by Category
          </option>
          <option>Infrastructure</option>
          <option>Roads</option>
          <option>Safety</option>
        </select>
        <select className="select select-bordered w-full md:w-1/4">
          <option disabled selected>
            Filter by Status
          </option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <select className="select select-bordered w-full md:w-1/4">
          <option disabled selected>
            Filter by Priority
          </option>
          <option>High</option>
          <option>Normal</option>
        </select>
      </div>

      {/* Issues Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <div key={issue.id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{issue.title}</h2>
              <p className="text-sm text-gray-600">{issue.location}</p>

              {/* Badges */}
              <div className="flex gap-2 mt-2">
                <span className="badge badge-info">{issue.category}</span>
                <span
                  className={`badge ${
                    issue.status === "Resolved"
                      ? "badge-success"
                      : issue.status === "In Progress"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {issue.status}
                </span>
                <span
                  className={`badge ${
                    issue.priority === "High" ? "badge-error" : "badge-neutral"
                  }`}
                >
                  {issue.priority}
                </span>
              </div>

              {/* Actions */}
              <div className="card-actions justify-between items-center mt-4">
                <button className="btn btn-outline btn-sm flex items-center gap-2">
                  👍 {issue.upvotes}
                </button>
                <Link to="/issue-details" className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllIssues;
