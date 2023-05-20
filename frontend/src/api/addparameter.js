import axios from "./axios";

export const addparam = async(bank, parameter)=>{
    const res = await axios.post("/updatestructure",{
        bank: bank,
        parameter: parameter,
    })
    return res.data;
}