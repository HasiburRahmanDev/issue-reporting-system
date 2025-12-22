import React, { Children } from "react";
import UseAuth from "../hooks/UseAuth";
import { CiPlay1 } from "react-icons/ci";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { loading } = UseAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <p>Lodaing</p>;
  }
  if (role !== "admin") {
    return <p>forbidden</p>;
  }
  return children;
};

export default AdminRoute;
