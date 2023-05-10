import React, {useState, useEffect } from "react";
import { userdetails } from "../api/UserDetails";
import { createbank } from "../api/CreateBank";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  let navigate = useNavigate();
  const [bank, setBank] = useState("");
  const [email, setEmail] = useState("");
  const [FirstName, setFirstname] = useState("");
  const [LastName, setLastName] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    userdetails().then((data) => {
      setUserData(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user_combined = {
      fname:FirstName,
      lname:LastName,
      email:email
    }
    createbank(bank,user_combined).then((data)=>{
      console.log("The data from backend --> ", data);
      if(data.status === 'ok'){
        alert("Created Successfully")
        return navigate('/superuser')
      }
      else alert("An error occured")
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>
          <h2>
            Hello <b>{userData?.fname}</b>, Admin
          </h2>
        </h3>
        <div className="mb-3">
          <label>Type the name of the bank:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Bank Name"
            onChange={(e) => setBank(e.target.value)}
            required={true}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
            required={true}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required={true}
          />
          <br />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Create Bank
          </button>
        </div>
      </form>
    </div>
  );
}
