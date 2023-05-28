import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { TerminalContext } from "../App";
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
  MDBTable,
  MDBTableHead,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBTableBody
} from "mdb-react-ui-kit";
import { updatevariable } from "../api/updateVariables";
import ReactPaginate from "react-paginate";

function ViewAndUpdateTerminal() {
  const contextterminal = useContext(TerminalContext);
  //console.log("the context is: ", contextterminal[0]);
  const contextuser = useContext(UserContext);
  let navigate = useNavigate();

  const [bankdetails, setbankdetails] = useState(null);
  const [variable, setvariable] = useState({
    var_name: "",
    max_size: "",
    min_size: "",
    value: "",
  });

  const [parameter, setParameter] = useState("");
  const [parameters, setParameters] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getdetails(contextuser[0]?.BankName).then((data) => {
      setbankdetails(data.details);
      setParameters(data.details.parameters);
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

  //Parameters tab

  const [basicActive, setBasicActive] = useState(`${contextterminal[0]?.tparameters[0]?.par_name}`);

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };


  // POpUp variables
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = (param, vari) => {
    setBasicModal(!basicModal);
    setParameter(param);
    setvariable(vari);
  };

  const NextPage = (e) => {
    setPage(e.selected + 1);
  };

  return (
    <div className="view-terminal-container">

        {/* <h1 className="text-center title-padding">Hello user, you can now edit the variables of {contextuser[0]?.BankName}</h1>
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
        })} */}

        <>
          <MDBTabs className='mb-3 param-tabs'>
            {contextterminal[0]?.tparameters.map((tparam) => {
              return (
                <>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick(`${tparam.par_name}`)} active={basicActive === `${tparam.par_name}`}>
                      {tparam.par_name}
                    </MDBTabsLink>
                  </MDBTabsItem>
                </>
              );
            })}
          </MDBTabs>
          {contextterminal[0]?.tparameters.map((tparam) => {
              return (
                <>
                  <MDBTabsContent>
                    <MDBTabsPane show={basicActive === `${tparam.par_name}`}>
                            {tparam.variables?.map((vari) => {
                              return (
                                <>
                                  <h5>{vari.var_name}</h5>
                                  <MDBTable className="var-table">
                                    <MDBTableHead>
                                      <tr className="text-center">
                                        <th scope="col">Variable</th>
                                        <th scope="col">Minimum Size</th>
                                        <th scope="col">Maximum Size</th>
                                        <th scope="col">Value</th>
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                      {vari.entries?.map((entry) => {
                                        return (
                                          <tr className="text-center">
                                            <td>{vari.var_name}</td>
                                            <td>{vari.min_size}</td>
                                            <td>{vari.max_size}</td>
                                            <td>{entry.value}</td>
                                          </tr>
                                        );
                                      })}
                                    </MDBTableBody>
                                  </MDBTable>

                                  <ReactPaginate className="pagination"
                                    nextLabel="next >"
                                    onPageChange={(e) => {
                                      NextPage(e);
                                    }}
                                    pageRangeDisplayed={5}
                                    marginPagesDisplayed={2}
                                    pageCount={Math.ceil(vari.entries.length / 5)}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                  />
                                </>
                              );
                            })}
                    </MDBTabsPane>
                  </MDBTabsContent>
                </>
              );
            })}
        </>

        

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

export default ViewAndUpdateTerminal;
