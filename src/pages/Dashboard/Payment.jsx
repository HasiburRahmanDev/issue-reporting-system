import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Payment = () => {
  const { issueId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: issue } = useQuery({
    queryKey: ["issues", issueId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${issueId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: 100,
      issueId: issue._id,
      email: issue.email,
      issueTitle: issue.title,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    console.log(res.data);
    window.location.assign(res.data.url);
  };

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h1>please pay 100Tk: {issue.title}</h1>
      <button onClick={handlePayment} className="btn btn-accent">
        Pay
      </button>
    </div>
  );
};

export default Payment;
