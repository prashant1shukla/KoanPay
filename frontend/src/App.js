import React, { useState } from "react";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/LoginComponent";
import BankName from "./components/CreateBank";
import AddParameter from "./components/AddParameter";
import Superuser from "./components/Superuser";
import Admin from "./components/Admin";
import User from "./components/EditVariable";

// Creating a Context
import { createContext } from "react";
import DefineStruct from "./components/DefineStruct";
import CreateTerminal from "./components/CreateTerminal";

export const UserContext = createContext();

function App() {
  const [user,setUser] = useState(null);
  return (
    <Router>
      <UserContext.Provider value={[user,setUser]}>
        <div className="App">

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/superuser" element={[<Header />, <Superuser />, <Footer />]} />
                <Route path="/user" element={[<Header />, <User />, <Footer />]} />
                <Route path="/admin" element={[<Header />, <Admin />, <Footer />]} />
                <Route path="/define-struct" element={[<Header />, <DefineStruct />, <Footer />]} />
                <Route path="/create-terminal" element={[<Header />, <CreateTerminal />, <Footer />]} />
                <Route path="/createbank" element={[<Header />, <BankName />, <Footer />]} />
                <Route path="/:bank_name" element={[<Header />, <AddParameter />, <Footer />]} />
              </Routes>
            </div>
          </div>
        
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
