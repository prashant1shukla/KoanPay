import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { getTerminalDetails } from "../api/getTerminalDetails";
import { useParams } from "react-router-dom";
import { addentry } from "../api/addentries";
import { updateentry } from "../api/updateentries";

// For Tabs
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

// For accordians
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";

// Tabulate Formation
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

// Edit Icon
import { MDBIcon } from "mdb-react-ui-kit";

// For Paginaiton
import ReactPaginate from "react-paginate";

// For popup
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

function ViewAndUpdateTerminal() {
  const contextuser = useContext(UserContext);
  const { tid } = useParams();
  const [terminaldetails, setterminaldetails] = useState(null);
  const [currparameter, setCurrentparameter] = useState(null);
  const [currentry, setcurrententry] = useState(null);

  // Tabs StateVariables
  const [basicActive, setBasicActive] = useState(null);

  const handleBasicClick = (param) => {
    if (param.par_name === basicActive) {
      return;
    }
    setCurrentparameter(param);
    setBasicActive(param.par_name);
  };
  // ----------------End of Tabs----------

  // Pages
  const [page, setPage] = useState(1);
  // For next page
  const NextPage = (e) => {
    setPage(e.selected + 1);
  };

  // PopUp
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = (entry) => {
    setcurrententry(entry);
    setBasicModal(!basicModal);
  };

  // UseEffect
  useEffect(() => {
    console.log("The terminal id is: ", tid);
    getTerminalDetails(tid, contextuser[0]?.BankName).then((data) => {
      setterminaldetails(data);
      setCurrentparameter(data.tparameters[0]);
      setBasicActive(data.tparameters[0].par_name);
    });
  }, []);

  // Adding an Entry
  const AddTheEntry = (vari) => {
    addentry(
      contextuser[0].BankName,
      tid,
      currparameter.par_name,
      vari.var_name
    ).then((data) => {
      setterminaldetails(data.updatedterminal);
      var entrieslength = vari.entries.length + 1;
      setPage(Math.ceil(entrieslength / 3));
    });
  };
  // Editing an Entry
  const editEntry = () => {
    console.log(currentry);
    updateentry(
      contextuser[0].BankName,
      tid,
      currparameter.par_name,
      currentry,
      currentry?.id
    ).then((data) => {
      console.log("The data is: ", data);
      setterminaldetails(data);
      setBasicModal(false);
      setcurrententry(null);
    });
  };
  return (
    <div className="viewandupdateterminal_container">
      <h4>View TID {tid}</h4>
      <br />
      {/* Tabs Heading --> Displaying Parameters */}
      <div className="params_container">
        <MDBTabs>
          {terminaldetails?.tparameters.map((parameter) => {
            return (
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleBasicClick(parameter)}
                  active={basicActive === parameter.par_name}
                >
                  {parameter.par_name}
                </MDBTabsLink>
              </MDBTabsItem>
            );
          })}
        </MDBTabs>
        <MDBTabsContent className="tabs_content">
          {terminaldetails?.tparameters.map((parameter) => {
            return (
              // <>{parameter.par_name}</>
              <MDBTabsPane show={basicActive === parameter.par_name}>
                <MDBAccordion>
                  {parameter.variables.map((vari, index) => {
                    return (
                      <>
                        <MDBAccordionItem
                          collapseId={index + 1}
                          headerTitle={vari.var_name}
                        >
                          <MDBTable>
                            <MDBTableHead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Maximum Size</th>
                                <th scope="col">Minimum Size</th>
                                <th scope="col">Value</th>
                                <th scope="col"></th>
                              </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                              {vari.entries.map((entry, index) => {
                                return (
                                  <>
                                    {index >= (page - 1) * 3 &&
                                    index <= page * 3 - 1 ? (
                                      <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{entry.max_size}</td>
                                        <td>{entry.min_size}</td>
                                        <td>{entry.value}</td>
                                        <td>
                                          <MDBIcon
                                            fas
                                            icon="pen"
                                            className="edit_icon"
                                            onClick={() => {
                                              toggleShow(entry);
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                );
                              })}
                            </MDBTableBody>
                          </MDBTable>
                          <div className="add_entry_pagination">
                            {/* <button>Add Entry</button> */}
                            <MDBBtn
                              onClick={() => {
                                AddTheEntry(vari);
                              }}
                            >
                              Add Entry
                            </MDBBtn>
                            <ReactPaginate
                              nextLabel="next >"
                              onPageChange={(e) => {
                                NextPage(e);
                              }}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={2}
                              pageCount={Math.ceil(vari.entries.length / 3)}
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
                          </div>
                        </MDBAccordionItem>
                      </>
                    );
                  })}
                </MDBAccordion>
              </MDBTabsPane>
            );
          })}
        </MDBTabsContent>
      </div>

      {/* For PopUp */}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit the value of the Entry</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => {
                  setBasicModal(false);
                }}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                id="entry_value"
                type="text"
                value={currentry?.value}
                onChange={(e) => {
                  setcurrententry({ ...currentry, value: e.target.value });
                }}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={()=>{setBasicModal(false);}}>
                Close
              </MDBBtn>
              <MDBBtn onClick={()=>{editEntry()}} >Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default ViewAndUpdateTerminal;
