import React, { useEffect, useState } from "react";
import { getdetails } from "../api/getbankdetails";
import { useContext } from "react";
import { UserContext } from "../App";

function DefineStruct() {
  const contextuser = useContext(UserContext);
  const [parameter, setParameter] = useState(null);
  const [variable, setVariable] = useState(null);
  useEffect(() => {
    getdetails(contextuser[0]?.BankName).then((data)=>{
        setParameter(data?.details.parameters);
    });
  });
  return (
    <div className="struct_container">
      <button>Add Paramater</button>
      <button>Add Variable</button>
    </div>
  );
}

export default DefineStruct;
