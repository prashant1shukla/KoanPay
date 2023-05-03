const mongoose=require("mongoose");

const UserDetailsSchema= new mongoose.Schema(
    {
        uname: String,
        email: String,
        phoneNo: String,
    },
    {
        collation:"UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);