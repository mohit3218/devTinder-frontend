import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

const Body = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
