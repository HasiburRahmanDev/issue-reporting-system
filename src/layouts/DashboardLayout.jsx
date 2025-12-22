import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaCog,
  FaListAlt,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  console.log("in the dashboard", role);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-gradient-to-r from-primary to-secondary text-white shadow-md">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
            >
              <FaListAlt className="text-xl" />
            </label>
            <span className="ml-4 font-bold text-lg tracking-wide">
              Dashboard
            </span>
          </div>
          <div className="flex-none">
            <button className="btn btn-ghost btn-circle">
              <FaCog className="text-xl" />
            </button>
          </div>
        </nav>

        {/* Page content */}
        <main className="p-6 bg-base-100 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="flex min-h-full flex-col bg-base-200 w-64 shadow-lg">
          <div className="p-4 text-center border-b border-base-300">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
          </div>
          <ul className="menu p-4 text-base-content">
            <li>
              <Link to="/" className="flex items-center gap-2">
                <FaHome className="text-lg" />
                Homepage
              </Link>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-issues"
                className="flex items-center gap-2"
              >
                <FaListAlt className="text-lg" />
                My Issues
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="flex items-center gap-2"
              >
                <FaMoneyBillWave className="text-lg" />
                Payment History
              </NavLink>
            </li>
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/approve-staffs"
                    className="flex items-center gap-2"
                  >
                    <FaListAlt className="text-lg" />
                    Approve staffs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className="flex items-center gap-2"
                  >
                    <FaUsers className="text-lg" />
                    Users Management
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <button className="flex items-center gap-2">
                <FaCog className="text-lg" />
                Settings
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
