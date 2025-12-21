import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApproveStaffs = () => {
  const axiosSecure = useAxiosSecure();
  const { data: staffs = [] } = useQuery({
    queryKey: ["staffs", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs");
      return res.data;
    },
  });

  const updateStaffStatus = (staff, status) => {
    const updateInfo = { status: status, email: staff.email };
    axiosSecure.patch(`/staffs/${staff._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Issued!",
          text: `Staff status is set to ${status}`,
          icon: "success",
        });
      }
    });
  };

  const handleApproval = (staff) => {
    updateStaffStatus(staff, "approved");
  };
  const handleRejection = (staff) => {
    updateStaffStatus(staff, "rejected");
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, index) => (
            <tr key={staff._id}>
              <td>{index + 1}</td>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>
                <span
                  className={`badge ${
                    staff.status === "pending"
                      ? "badge-warning"
                      : staff.status === "approved"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {staff.status}
                </span>
              </td>
              <td>{new Date(staff.createdAt).toLocaleString()}</td>
              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApproval(staff)}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejection(staff)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveStaffs;
