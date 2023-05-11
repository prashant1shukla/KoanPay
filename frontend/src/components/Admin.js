import React, { useState } from "react";
import { UserContext } from "../App";
import { useContext } from "react";
import { adduser } from "../api/Adduser";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { MDBBtn } from 'mdb-react-ui-kit';

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
/*
  api-folder
    ->addparameter.js -> Adding Parameter or Updating the structure
    ->getbandetails.js -> Can get the bank details to show the structure -> use this in UseEffect
*/
  return (
    <div className="admin_container">
      <div className="admin_subcontainer text-center"> 
        <h1 className="pt-5">Hello, {contextuser[0]?.fname} <b>(admin)</b></h1>
        {/* <h2>Admin for {contextuser[0]?.BankName}</h2> */}
        {/* <button onClick={() => {AddUser()}}>Add user</button>
        <button onClick={() => {return navigate('/define-struct')}}>Define Structure</button>
        <button onClick={() => {}}>View Structure</button> */}
        <div className="row gap-5 mx-auto row-width">
          <MDBBtn className="btn-util my-5 col" onClick={() => {AddUser()}}>Add user</MDBBtn>
          <MDBBtn className="btn-util my-5 col" onClick={() => {return navigate('/define-struct')}}>Define Structure</MDBBtn>
          <MDBBtn className="btn-util my-5 col" onClick={() => {}}>Edit existing structure</MDBBtn>
          <MDBBtn className="btn-util my-5 col" onClick={() => {}}>View user logs</MDBBtn>
          </div>
      </div>
    </div>
  );
}

export default Admin;
