import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err}`);
      setError(err?.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      navigate("/profile");
    } catch (err) {
      console.log(`Error: ${err}`);
      setError(err?.response?.data);
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div className="my-2 mb-5">
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name:</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    placeholder="First Name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name:</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    placeholder="Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID:</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                placeholder="E-mail ID / Username"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password:</legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>
            {isLoginForm
              ? "New User? SignUp Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
