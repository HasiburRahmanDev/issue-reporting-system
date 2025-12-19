import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

function IssueDetails() {
  //   const { id } = useParams();

  //   // Example static issue data
  //   const issue = {
  //     id,
  //     title: "Broken Streetlight",
  //     category: "Infrastructure",
  //     status: "Pending",
  //     priority: "Normal",
  //     location: "Main Road, Sector 5",
  //     description: "Streetlight near the main road is broken and needs repair.",
  //     image: "https://via.placeholder.com/600x300.png?text=Streetlight",
  //     upvotes: 12,
  //     submittedBy: "citizen123",
  //     assignedStaff: { name: "John Doe", role: "Maintenance Staff" },
  //     boosted: false,
  //   };

  // Example static timeline
  const timeline = [
    {
      status: "Pending",
      message: "Issue reported by citizen",
      updatedBy: "Citizen",
      date: "2025-12-10 14:30",
    },
    {
      status: "In-Progress",
      message: "Issue assigned to Staff: John Doe",
      updatedBy: "Admin",
      date: "2025-12-11 09:00",
    },
    {
      status: "In-Progress",
      message: "Work started on the issue",
      updatedBy: "Staff",
      date: "2025-12-11 10:00",
    },
    {
      status: "Resolved",
      message: "Issue marked as resolved",
      updatedBy: "Staff",
      date: "2025-12-12 16:00",
    },
  ];

  //   // Example logged-in user
  //   const loggedInUser = "citizen123";

  const { issueId } = useParams();
  console.log("IssueDetails - issueId from params:", issueId); // Debug log
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: issue } = useQuery({
    queryKey: ["issues", issueId],
    queryFn: async () => {
      console.log("Fetching issue with ID:", issueId); // Debug log
      const res = await axiosSecure.get(`/issues/${issueId}`);
      console.log("Issue data received:", res.data); // Debug log
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Issue Details</h1>

      {/* Issue Info */}
      <div className="card bg-base-100 shadow-md mb-8">
        <figure>
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body">
          <p className="text-gray-600">{issue.description}</p>
          <p className="mt-2">
            <strong>Category:</strong> {issue.category}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge ${
                issue.status === "Resolved"
                  ? "badge-success"
                  : issue.status === "In-Progress"
                  ? "badge-warning"
                  : "badge-error"
              }`}
            >
              {issue.status}
            </span>
          </p>
          <p>
            <strong>Priority:</strong>{" "}
            <span
              className={`badge ${
                issue.priority === "High" ? "badge-error" : "badge-neutral"
              }`}
            >
              {issue.priority}
            </span>
          </p>
          <p>
            <strong>Location:</strong> {issue.location}
          </p>
          <p>
            <strong>Upvotes:</strong> 👍 {issue.upvotes}
          </p>

          {/* Staff Info */}
          {issue.assignedStaff && (
            <div className="mt-4 p-4 border rounded bg-base-200">
              <h3 className="font-semibold">Assigned Staff</h3>
              <p>
                {issue.assignedStaff.name} ({issue.assignedStaff.role})
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="card-actions mt-6 flex gap-4">
            <button className="btn btn-warning">Edit</button>

            <button className="btn btn-error">Delete</button>
            {issue.paymentStatus === "paid" ? (
              <p className="btn btn-info">Boosted</p>
            ) : (
              <Link
                to={`/dashboard/payment/${issue._id}`}
                className="btn btn-accent"
              >
                Boost Priority (100tk)
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Issue Timeline</h2>
          <ul className="timeline timeline-vertical">
            {timeline.map((entry, index) => (
              <li key={index}>
                <div className="timeline-start">{entry.date}</div>
                <div className="timeline-middle">
                  <span
                    className={`badge ${
                      entry.status === "Resolved"
                        ? "badge-success"
                        : entry.status === "In-Progress"
                        ? "badge-warning"
                        : entry.status === "Closed"
                        ? "badge-neutral"
                        : "badge-error"
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>
                <div className="timeline-end timeline-box">
                  <p>{entry.message}</p>
                  <p className="text-sm text-gray-500">
                    Updated by: {entry.updatedBy}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default IssueDetails;
