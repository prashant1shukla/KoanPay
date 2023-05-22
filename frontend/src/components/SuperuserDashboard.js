import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { getallbanks } from "../api/getAllbankdetails";

function Superuser() {
  let navigate = useNavigate();
  const [allbanks, setAllbanks] = useState(null);
  useEffect(() => {
    getallbanks().then((data) => {
      setAllbanks(data);
    });
  }, []);
  return (
    <div className="superuser_container">
      <div className="superuser_subcontainer text-center">
        <div className="existing_bank_conatiner pt-5">
          {allbanks ? (
            <>
              {allbanks.map((bank) => {
                return (
                  <>
                    <p>BankName : {bank.bank}, Admin: {bank.admin}</p>
                  </>
                );
              })}
            </>
          ) : (
            <>No Existing Banks</>
          )}
        </div>
        {/* <button onClick={()=>{return navigate('/createbank')}} >Create New Bank</button> */}
        <MDBBtn
          className="w-10 btn-util my-5"
          onClick={() => {
            return navigate("/create_bank");
          }}
        >
          Create New Bank
        </MDBBtn>
      </div>
    </div>
  );
}

export default Superuser;
