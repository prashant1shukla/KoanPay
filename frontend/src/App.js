import React, { useState } from "react";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/LoginComponent";
import SignUp from "./components/SignupComponent";
import SignUpAdmin from "./components/SignupComponentAdmin";
//import Home from "./components/Home";
import BankName from "./components/CreateBank";
import AddParameter from "./components/AddParameter";
import Superuser from "./components/Superuser";
import Admin from "./components/Admin";
import User from "./components/User";

// Creating a Context
import { createContext } from "react";
import DefineStruct from "./components/DefineStruct";
export const UserContext = createContext();

function App() {
  const [user,setUser] = useState(null);
  return (
    <Router>
      <UserContext.Provider value={[user,setUser]}>
        <div className="App">

          {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav> */}

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Login />} />
                {/* <Route exact path="/" element={<Home />} /> */}
                {/* <Route path="/sign-in" element={<Login />} /> */}
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-up-admin" element={<SignUpAdmin />} />
                <Route path="/superuser" element={<Superuser />} />
                <Route path="/user" element={<User />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/define-struct" element={<DefineStruct />} />
                <Route path="/createbank" element={<BankName />} />
                <Route path="/:bank_name" element={<AddParameter />} />
              </Routes>
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
