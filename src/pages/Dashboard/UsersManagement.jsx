import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  const hadnleMakeUser = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          title: "Issued!",
          text: `${user.displayName} marked as admin`,
          icon: "success",
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          text: `${user.displayName} removed from admin`,
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Admin Actions</th>
            <th>Others Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={user.photoURL} alt={user.displayName} />
                  </div>
                </div>
              </td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`badge ${
                    user.role === "admin"
                      ? "badge-primary"
                      : user.role === "staff"
                      ? "badge-secondary"
                      : "badge-ghost"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td>
                {user.role === "admin" ? (
                  <button
                    onClick={() => handleRemoveAdmin(user)}
                    className="btn"
                  >
                    <FiShieldOff></FiShieldOff>
                  </button>
                ) : (
                  <button onClick={() => hadnleMakeUser(user)} className="btn">
                    <FaUserShield></FaUserShield>
                  </button>
                )}
              </td>
              <th>Actions</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;
