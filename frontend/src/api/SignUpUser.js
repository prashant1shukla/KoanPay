import axios from "./axios";

export const signupuser = async (fname,email,lname,password,userType)=>{
    const res = await axios.post('/register',{
        fname,email,lname,password,userType
    })
    return res.data;
}