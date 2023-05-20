import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { getdetails } from "../api/getbankdetails";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBAccordion, 
  MDBAccordionItem,
} from "mdb-react-ui-kit";
import { updatevariable } from "../api/updateVariables";

function User() {
  const contextuser = useContext(UserContext);
  let navigate = useNavigate();

  /*
        user needed --> context API
        bank needed --> context API
        bank details needed --> getbankdetails.js file --> API call
    */
  const [bankdetails, setbankdetails] = useState(null);
  const [variable, setvariable] = useState({
    var_name: "",
    max_size: "",
    min_size: "",
    value: "",
  });
  const [parameter, setParameter] = useState("");
  useEffect(() => {
    getdetails(contextuser[0]?.BankName).then((data) => {
      setbankdetails(data.details);
      console.log(data);
    });
  }, [contextuser]);
  // Submit the updated variable
  const updatethevariable = () => {
    console.log("The param is : ", parameter);
    console.log("The vari is : ", variable);
    updatevariable(
      contextuser[0].BankName,
      parameter.par_name,
      variable,
      contextuser[0].email
    ).then((data) => {
      setbankdetails(data.details);
      setBasicModal(false);
      setParameter(null);
      setvariable({
        var_name: "",
        max_size: "",
        min_size: "",
        value: "",
      });
    });
  };

  // POpUp variables
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = (param, vari) => {
    setBasicModal(!basicModal);
    setParameter(param);
    setvariable(vari);
  };
  return (
    <div className="user-container">
      <div className="user-subcontainer">
        <h1 className="text-center title-padding">Hello user, you can now edit the variables of {contextuser[0]?.BankName}</h1>
        <MDBBtn className="btn-util my-5 col" onClick={() => { return navigate('/create-terminal') }}>Create Terminal</MDBBtn>
        {bankdetails?.parameters.map((param) => {
          return (
            <>
            <MDBAccordion initialActive={0} className="my-3">
              <MDBAccordionItem collapseId={1} headerTitle={param?.par_name}>
                {param.variables.map((vari) => {
                  // setvariable(vari);
                  return (
                    <div className="mx-auto set-width" >
                      <span>{vari.var_name} : </span>
                      <input value={vari.value} readOnly  />
                      <MDBBtn className="btn-gap"
                        onClick={() => {
                          toggleShow(param, vari);
                        }} 
                      >
                        Update
                      </MDBBtn>
                      <br />
                      <br />
                    </div>
                  );
                })}
                <br />
                <br />
              </MDBAccordionItem>
            </MDBAccordion>
            </>
          );
        })}
        {/* PopUp for editing */}
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Modal title</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={() => setBasicModal(false)}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                {variable.var_name} :{" "}
                <input
                  value={variable.value}
                  onChange={(e) =>
                    setvariable({ ...variable, value: e.target.value })
                  }
                />
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={() => setBasicModal(false)}>
                  Close
                </MDBBtn>
                <MDBBtn
                  onClick={() => {
                    updatethevariable();
                  }}
                >
                  Save changes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </div>
  );
}

export default User;
