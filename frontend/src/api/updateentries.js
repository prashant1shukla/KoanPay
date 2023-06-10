import axios from "./axios";

export const updateentry= async(bank,tid,parameter,id_variable,id_entry, value, user)=>{
    console.log("hdbnfh hi")
    const res = await axios.post("/update-entry",{
        bank: bank,
        tid:tid,
        parameter:parameter,
        id_variable: id_variable,
        id_entry:id_entry,
        value : value,
        user : user
    })
    return res.data.updatedterminal;
}