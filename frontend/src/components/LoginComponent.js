import React, { useState } from "react";
import { login } from "../api/Login";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

export default function Login() {
  let navigate = useNavigate();
  const contextuser = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    login(email, password).then((data) => {
      console.log(data, "userRegister");
      if (data.status === "ok") {
        alert("login successful");
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        console.log("The user details are : ", data.userDetails);
        contextuser[1](data.userDetails);
        if(data.userDetails.userType === 'user'){
          return navigate('/user')
        }
        else if(data.userDetails.userType === 'admin'){
            return navigate('/admin')
        }
        else if(data.userDetails.userType === 'superuser'){
            return navigate('/superuser');
        }
      }
    });
  }

  return (
    // <div className="auth-wrapper">
    //   <div className="auth-inner">
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h3>Sign In</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          {/* <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          /> */}
          {/* <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label> */}
        </div>
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      {/* <p className="forgot-password text-right">
        <a href="/sign-up">Sign Up</a>
      </p> */}
    </form>
    // </div>
    // </div>
  );
}
