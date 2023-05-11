import axios from "./axios";

export const updatevariable = async (bank,parameter,variable,user)=>{
    const res = await axios.post('/updateVariable',{
        user:user,
        parameter:parameter,
        bank:bank,
        variable:variable
    })
    return res.data;
}