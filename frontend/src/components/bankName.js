import React, { Component, useState, render} from "react";

export default function UserDetails() {
  const [bank, setBank] = useState("");
  const [userData, setUserData] = useState(""); 
   
  axios({
    url:"http://localhost:5000/userData",
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setUserData( data.data);
      });
  
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const{bank}=this.state;
    console.log(bank);
    
    axios({
      url:"http://localhost:5000/bank-name",
        method: "POST",
        crossDomain: true,
        headers:{
            "Content-Type":"application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            bank,
        }),
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data, "bank created");
        if (data.status == "ok") {
          alert("bank done");
          // window.localStorage.setItem("token", data.data);
          // window.localStorage.setItem("loggedIn", true);

          window.location.href = `/${bank}`;
        }
    }); 
}

  
    return (
        <div>
            <form onSubmit={this.handleSubmit}> 
              <h3><h2>Hello <b>{this.state.userData.fname}</b>, Admin</h2></h3>
              <div className="mb-3">
                <label>Type the name of the bank:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  onChange={(e)=>setBank({bank:e.target.value})}
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