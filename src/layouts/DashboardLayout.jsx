import React from "react";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-md">
        <div className="p-4 text-xl font-bold text-primary">Dashboard</div>
        <ul className="menu p-4">
          <li>
            <Link to="/dashboard">Overview</Link>
          </li>
          <li>
            <Link to="/dashboard/my-issues">My Issues</Link>
          </li>
          <li>
            <Link to="/report-issue">Report Issue</Link>
          </li>
          <li>
            <Link to="/all-issues">All Issues</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
