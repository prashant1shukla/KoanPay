import React, { useState, useEffect } from "react";
import { UserContext } from "../App";
import { useContext } from "react";
import { adduser } from "../api/Adduser";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getdetails } from "../api/getbankdetails";


function Admin() {
  let navigate = useNavigate();
  // const [bankdetails, setBankdetails] = useState(null);
  // useEffect(() => {
  //   getdetails().then((data) => {
  //     console.log(data)
  //     setBankdetails(data);
  //   });
  // }, []);

  //pop up form:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const contextuser = useContext(UserContext);
  console.log(contextuser);

  const [userfname, setUserfname] = useState("");
  const [userlname, setUserlname] = useState("");
  const [useremail, setUseremail] = useState("");
  const AddUser = () => {
    let combineduser = {
      fname: userfname,
      lname: userlname,
      email: useremail
    }
    adduser(contextuser[0]?.BankName, combineduser).then((data) => {
      console.log("The status is, ", data);
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
          <MDBBtn className="btn-util my-5 col" onClick={() => { handleShow() }}>Add user</MDBBtn>
          <MDBBtn className="btn-util my-5 col" onClick={() => { return navigate('/define-struct') }}>Define Structure</MDBBtn>
          <MDBBtn className="btn-util my-5 col" onClick={() => { }}>Edit existing structure</MDBBtn>
          <MDBBtn className="btn-util my-5 col" onClick={() => { }}>View user logs</MDBBtn>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Please enter the details of the user</h4>
        
              <MDBInput wrapperClass='mb-4' label='User First Name' id='field2' type='text' onChange={(e) => setUserfname(e.target.value)}
            required={true}/>
              <MDBInput wrapperClass='mb-4' label='User Last Name' id='field3' type='text' onChange={(e) => setUserlname(e.target.value)}
            required={true}/>
              <MDBInput wrapperClass='mb-4' label='Email Address' id='field4' type='email' onChange={(e) => setUseremail(e.target.value)}
            required={true}/>
              <MDBBtn className="btn-util my-5 col" onClick={() => { AddUser() }}>Add user</MDBBtn>

             </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* <div className="existing_bank_conatiner pt-5">
          {bankdetails ? (
            <>
              {bankdetails.map((bank) => {
                return (
                  <>
                    <p>BankName : {bank.bank}, Admin: {bank.admin}</p>
                  </>
                );
              //  {bank.parameters.map((par_name,value))} 
              })}
            </>
          ) : (
            <>No Existing Banks</>
          )}
        </div> */}
      </div>

    </div>
  );
}

export default Admin;
