import React, { useEffect } from "react";
import Nav from "./Nav";
import { Outlet, useNavigate } from "react-router-dom";
import  Footer  from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fethUser = async () => {
    try {
      if (userData) return;
      const user = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (error) {
      console.log(`Error: ${error}`);
      navigate("/login");
    }
  };

  useEffect(() => {
    fethUser();
  }, []);
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
