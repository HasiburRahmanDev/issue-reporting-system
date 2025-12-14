import React from "react";
import { Link } from "react-router";

const DashboardOverview = () => {
  return (
    <div>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Overview</h1>
        <button className="btn btn-primary">+ Report Issue</button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">My Issues</h2>
            <p>Total: 5</p>
            <Link
              to="/dashboard/my-issues"
              className="btn btn-sm btn-primary mt-2"
            >
              View
            </Link>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">All Issues</h2>
            <p>Total: 25</p>
            <Link to="/all-issues" className="btn btn-sm btn-primary mt-2">
              View
            </Link>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Upvotes</h2>
            <p>Total: 120</p>
          </div>
        </div>
      </div>

      {/* Recent Issues Table */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Issues</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Broken Streetlight</td>
                  <td>Infrastructure</td>
                  <td>
                    <span className="badge badge-error">Pending</span>
                  </td>
                  <td>
                    <span className="badge badge-neutral">Normal</span>
                  </td>
                  <td>Main Road</td>
                </tr>
                <tr>
                  <td>Pothole on Avenue</td>
                  <td>Roads</td>
                  <td>
                    <span className="badge badge-success">Resolved</span>
                  </td>
                  <td>
                    <span className="badge badge-error">High</span>
                  </td>
                  <td>Downtown</td>
                </tr>
                <tr>
                  <td>Damaged Bridge Railings</td>
                  <td>Safety</td>
                  <td>
                    <span className="badge badge-warning">In Progress</span>
                  </td>
                  <td>
                    <span className="badge badge-error">High</span>
                  </td>
                  <td>River Bridge</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
