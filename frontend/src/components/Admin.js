import React, { useState } from "react";
import { UserContext } from "../App";
import { useContext } from "react";
import { adduser } from "../api/Adduser";
import { useNavigate } from "react-router-dom";

function Admin() {
    let navigate = useNavigate();
  const contextuser = useContext(UserContext);
  console.log(contextuser);
  const [userfname, setUserfname] = useState("userfirstname2");
  const [userlname, setUserlname] = useState("userlastname2");
  const [useremail, setUseremail] = useState("useradded2@gmail.com");

  const AddUser = ()=>{
    let combineduser = {
        fname:userfname,
        lname:userlname,
        email:useremail
    }
    adduser(contextuser[0]?.BankName,combineduser).then((data)=>{
        console.log("The status is, ",data);
    })
  }
  return (
    <div className="admin_container">
      <h1>Hello {contextuser[0]?.fname}</h1>
      <h2>Admin for {contextuser[0]?.BankName}</h2>
      <button onClick={() => {AddUser()}}>Add user</button>
      <button onClick={() => {return navigate('/define-struct')}}>Define Structure</button>
      <button onClick={() => {}}>View Structure</button>
    </div>
  );
}

export default Admin;
