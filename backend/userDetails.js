const mongoose=require("mongoose");

const UserDetailsSchema= new mongoose.Schema(
    {
        fname: String,
        lname: String,
        email: {type:String, unique:true},
        phoneNo: String,
    },
    {
        collection:"UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);