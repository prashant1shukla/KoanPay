import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AddParameter() {
    const [bankDetails, setBankDetails] = useState(null);
    const [parameters, setParameters]= useState([]);
    const [variable, setVariable]= useState(null);

    const { bank_name } = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/getBankdetails", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                bank: bank_name,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "these are the bank details");
                setBankDetails(data.details);
            });
    }, []);

    const SettingVariable=(varName, varValue)=>{
        let temp={
            varName: varName, 
            varValue: varValue,
        }
        setVariable(temp);
    };

    const SettingParamater=()=>{
        console.log(" these are the updated variables!", variable);
        setParameters([...parameters, variable]);
    };

    const SettingBankDetails=()=>{
        var temp=bankDetails;
        temp["parameters"]=parameters;
        console.log(" these are the updated parameters!", parameters);
        setBankDetails(temp);
        
    };

    const UpdateInDatabase=()=>{UpdateInDatabase();
        fetch("http://localhost:5000/UpdateBankDetails", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                bank: bankDetails,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "these are the updated bank details in database");
                setBankDetails(data.details);
            });
    }
    return (
        <div>
            <h3>Hello {bankDetails?.bank} Bank</h3>
            <button onClick={SettingParamater}>Add Paramater</button>
            <button onClick={()=>{SettingVariable("ip", "1234")}}>Add Variable</button>
            <button onClick={SettingBankDetails}>Update Bank Details</button>
        </div>
    );
}
