import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyIssues = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { data: issues = [] } = useQuery({
    queryKey: ["myIssues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>All of my issues: {issues.length}</h1>
    </div>
  );
};

export default MyIssues;
