import axios from "./axios";

export const addentry= async(bank, entry)=>{
    const res = await axios.post("/add-entry",{
        bank: bank,
        entry: entry,
    })
    return res.data;
}