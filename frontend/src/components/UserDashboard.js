import React, { useEffect, useState } from "react";
import { getdetails } from "../api/getbankdetails";
import { useContext } from "react";
import { UserContext } from "../App";
import axios from "../api/axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBAccordion,
  MDBAccordionItem,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import { addtermi } from "../api/addterminal";

function AddTerminal() {
  const contextuser = useContext(UserContext);

  const [bankDetails, setBankDetails] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [terminals, setTerminals] = useState(null);
  const [currterminal, setCurrTerminal] = useState(null);
  const [currtid, setCurrTid] = useState("");
  const [currmid, setCurrMid] = useState("");
  const [currname, setCurrName] = useState("");
  const [curradd1, setCurrAdd1] = useState("");
  const [curradd2, setCurrAdd2] = useState("");
  const [currpostal, setCurrPostal] = useState("");
  const [createdby, setCreatedBy] = useState("");
  const [tparameters, setTParameters] = useState(null);

  //   popUp for adding Terminal
  const [basicModalTermi, setBasicModalTermi] = useState(false);

  const toggleShowPopupTermi = () => {
    setBasicModalTermi(!basicModalTermi);
  };

  useEffect(() => {
    getdetails(contextuser[0]?.BankName).then((data) => {
      setBankDetails(data?.details);
      setTerminals(data?.details.terminals);
      setParameters(data?.details.parameters);
    });
    setCreatedBy(contextuser[0]?.email)
  }, [contextuser]);

  //  Creating a New Terminal
  const AddCurrTerminal = () => {
    console.log("the parameters:", parameters);
    var combined_curr_termi = {
      tid: currtid,
      mid: currmid,
      name: currname,
      createdby: createdby,
      add1: curradd1,
      add2: curradd2,
      postal: currpostal,
      tparameters: parameters,
    };

    // Pushing new terminal
    setCurrTerminal(combined_curr_termi);
    console.log("The Curr termi name is : ", currtid);
    var prev_termis = terminals;
    prev_termis.push(combined_curr_termi);
    setTerminals(prev_termis);
    console.log("The prev_termis: ", prev_termis);
    addtermi(contextuser[0]?.BankName, prev_termis).then((res) => {
      console.log("The response is: ", res);
      setBasicModalTermi(!basicModalTermi);
      setCurrTerminal(null);
      setCurrTid("");
      // axios.get('/tid-details', {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization:`{"bank":"${contextuser[0]?.BankName}", "tid":"${currtid}"}`,
      //   }
      // }).then((data) => {
      //   console.log("the tid detail", data);
      // })
    });
  };

  return (
    <div className="struct_container">
      <h1>Create the Terminal of {contextuser[0]?.BankName}</h1>
      {terminals ? (
        <>
          {/* dispaly termianls */}
          {/* <MDBAccordion>
            {terminals.map((par, index) => {
              return (
                <MDBAccordionItem
                  collapseId={index + 1}
                  headerTitle={par?.termi_name}
                >
                  <MDBTable hover responsive>
                    <MDBTableHead>
                      <tr>
                        <th scope="col">Variable</th>
                        <th scope="col">Minimum Size</th>
                        <th scope="col">Maximum Size</th>
                        <th scope="col">Value</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {par?.variables.map((vari) => {
                        return (
                          <tr>
                            <th scope="row">{vari.var_name}</th>
                            <td>{vari.min_size}</td>
                            <td>{vari.max_size}</td>
                            <td>{vari.value}</td>
                          </tr>
                        );
                      })}
                    </MDBTableBody>
                  </MDBTable>
                  
                </MDBAccordionItem>
              );
            })}
          </MDBAccordion> */}
          <br />
          <MDBBtn
            onClick={() => {
              toggleShowPopupTermi();
            }}
          >
            Add Terminal
          </MDBBtn>
        </>
      ) : (
        <></>
      )}

      {/* PopUp for Creating an Extra Terminal  */}
      <MDBModal
        show={basicModalTermi}
        setShow={setBasicModalTermi}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Terminal</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShowPopupTermi}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="Terminal ID"
                id="TerminalId"
                type="text"
                value={currtid}
                onChange={(e) =>
                  setCurrTid(e.target.value)
                }
              />
              <br />
              <MDBInput
                label="Merchant ID"
                id="MerchantId"
                type="text"
                value={currmid}
                onChange={(e) =>
                  setCurrMid(e.target.value)
                }
              />
              <br />
              <MDBInput
                label="Merchant Name"
                id="MerchantName"
                type="text"
                value={currname}
                onChange={(e) =>
                  setCurrName(e.target.value)
                }
              />
              <br />
              <MDBInput
                label="Address Line 1"
                id="AddressLine1"
                type="text"
                value={curradd1}
                onChange={(e) =>
                  setCurrAdd1(e.target.value)
                }
              />
              <br />
              <MDBInput
                label="Address Line 2"
                id="AddressLine2"
                type="text"
                value={curradd2}
                onChange={(e) =>
                  setCurrAdd2(e.target.value)
                }
              />
              <br />
              <MDBInput
                label="Postal Code"
                id="PostalCode"
                type="text"
                value={currpostal}
                onChange={(e) =>
                  setCurrPostal(e.target.value)
                }
              />

            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShowPopupTermi}>
                Close
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  AddCurrTerminal();
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

export default AddTerminal;
