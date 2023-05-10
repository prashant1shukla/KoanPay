import axios from "./axios";

export const adduser = async (bank,user)=>{
    const res = await axios.post('/adduser',{
        bank:bank,
        user:user
    })
    return res.data;
}