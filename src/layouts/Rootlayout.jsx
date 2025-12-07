import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/shared/Footer";
import NavBar from "../pages/shared/NavBar";

const Rootlayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Rootlayout;
