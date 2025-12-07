import React from "react";

const ResolvedIssues = () => {
  return (
    <section className="my-12 px-6">
      <h2 className="text-3xl font-bold mb-8 text-primary">
        Latest Resolved Issues
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title">issue.title</h3>
            <p className="text-sm text-gray-500">issue.location</p>
            <p className="mt-2">issue.description</p>
            <div className="card-actions justify-end mt-4">
              <span className="badge badge-success">Resolved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: View More Button */}
      <div className="mt-8 text-center">
        <button className="btn btn-outline btn-primary">View More</button>
      </div>
    </section>
  );
};

export default ResolvedIssues;
