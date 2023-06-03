import axios from "./axios";

export const updateentry= async(bank,tid,parameter,variable,id)=>{
    console.log("hdbnfh hi")
    const res = await axios.post("/update-entry",{
        bank: bank,
        tid:tid,
        parameter:parameter,
        variable:variable,
        id:id,
    })
    return res.data.updatedterminal;
}