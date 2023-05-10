import React, {useState, useEffect } from "react";
import { userdetails } from "../api/UserDetails";
import { addbank } from "../api/AddBank";

export default function UserDetails() {
  const [bank, setBank] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    userdetails().then((data) => {
      setUserData(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bank);
    addbank(bank).then((data) => {
      console.log(data, "bank created");
      if (data.status === "ok") {
        alert("bank done");
        window.location.href = `/${bank}`;
      }
    });
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
