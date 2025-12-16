import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyIssues = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { data: issues = [], refetch } = useQuery({
    queryKey: ["myIssues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?email=${user.email}`);
      return res.data;
    },
  });

  const handleIssueDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issues/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Issues</h1>

      {/* Issues Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {issues.map((issue) => (
          <div key={issue.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{issue.title}</h2>
              <p>{issue.location}</p>
              <div className="flex gap-2 mt-2">
                <span className="badge badge-info">{issue.category}</span>
                <span
                  className={`badge ${
                    issue.status === "Resolved"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {issue.status}
                </span>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-warning btn-sm">Edit</button>
                <button
                  onClick={() => handleIssueDelete(issue._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
                <Link
                  to={`/issue/${issue.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyIssues;
