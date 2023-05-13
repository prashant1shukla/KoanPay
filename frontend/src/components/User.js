import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
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
} from "mdb-react-ui-kit";
import { updatevariable } from "../api/updateVariables";

function User() {
  const contextuser = useContext(UserContext);
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
    <div className="user_container">
      Hello user, you can now edit the variables of {contextuser[0]?.BankName}
      {bankdetails?.parameters.map((param) => {
        return (
          <>
            <h3>{param.par_name} : </h3>
            {param.variables.map((vari) => {
              // setvariable(vari);
              return (
                <>
                  <span>{vari.var_name} : </span>
                  <input value={vari.value} readOnly />
                  <button
                    onClick={() => {
                      toggleShow(param, vari);
                    }}
                  >
                    Update
                  </button>
                  <br />
                  <br />
                </>
              );
            })}
            <br />
            <br />
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
  );
}

export default User;
