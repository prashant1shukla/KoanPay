import axios from "./axios";

export const addbank = async(bank)=>{
    const res = await axios.post('/bank-name',{
        bank:bank
    })
    return res.data;
}