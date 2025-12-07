import React from "react";
import Banner from "../Banner/Banner";
import ResolvedIssues from "../ResolvedIssues/ResolvedIssues";
import Features from "../feature/Features";
import HowItWorks from "../howItWorks/HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ResolvedIssues></ResolvedIssues>
      <Features></Features>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
