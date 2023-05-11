import React, { useEffect, useState } from "react";
import { getdetails } from "../api/getbankdetails";
import { useContext } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";


import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DefineStruct() {
  const contextuser = useContext(UserContext);

  const [bankDetails, setBankDetails] = useState(null);
  const [parameters, setParameters] = useState([]);
  const [variable, setVariable] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getdetails(contextuser[0]?.BankName).then((data) => {
      setParameters(data?.details.parameters);
    });
  });

  
  const { bank_name } = useParams();

  const SettingVariable = (varName, varValue) => {
    let temp = {
      varName: varName,
      varValue: varValue,
    };
    setVariable(temp);
  };

  const SettingParamater = () => {
    console.log(" these are the updated variables!", variable);
    setParameters([...parameters, variable]);
  };

  const SettingBankDetails = () => {
    var temp = bankDetails;
    temp["parameters"] = parameters;
    console.log(" these are the updated parameters!", parameters);
    setBankDetails(temp);
  };
  return (
    <div className="struct_container">
      <button>Add Paramater</button>
      <button>Add Variable</button>

      <div className="admin_container">
        <div className="admin_subcontainer text-center">
          <h1 className="pt-5">Hello, {contextuser[0]?.fname} <b>(admin)</b></h1>
          {/* <h2>Admin for {contextuser[0]?.BankName}</h2> */}
          {/* <button onClick={() => {AddUser()}}>Add user</button>
        <button onClick={() => {return navigate('/define-struct')}}>Define Structure</button>
        <button onClick={() => {}}>View Structure</button> */}
          <div className="row gap-5 mx-auto">
            <MDBBtn className="btn-util my-5 col" onClick={() => { handleShow() }}>Click here to give the name to your structure</MDBBtn>
            {/* <MDBBtn className="btn-util my-5 col" onClick={() => { return navigate('/define-struct') }}>Define Structure</MDBBtn> */}


            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Please enter the name of your structure:</h4>

                <MDBInput wrapperClass='mb-4' label='Admin First Name' id='field2' type='text' onChange={(e) => setParameters(e.target.value)}
                  required={true} />
                {/*
              <MDBInput wrapperClass='mb-4' label='Admin Last Name' id='field3' type='text' onChange={(e) => setUserlname(e.target.value)}
            required={true}/>
              <MDBInput wrapperClass='mb-4' label='Email Address' id='field4' type='email' onChange={(e) => setUseremail(e.target.value)}
            required={true}/>
              <MDBBtn className="btn-util my-5 col" onClick={() => { AddUser() }}>Add user</MDBBtn> */}
                <button onClick={() => {
                    SettingVariable("ip", "1234");
                  }}>Add variable
                </button>
                <button onClick={SettingParamater}>Add Paramater</button>
                <button onClick={SettingBankDetails}>Update Bank Details</button>

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

        </div>

      </div>
    </div>





  );
}

export default DefineStruct;