const express = require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json());
const cors= require("cors");
app.use(cors());
const mongoUrl="mongodb+srv://prashant1shukla:PassWord@koanpay.9rjwa0c.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{console.log("Connected to database");})
.catch(e=>console.log(e))

// require("./userDetails");
// const User=mongoose.model("UserInfo");


app.listen(5000,()=>{
    console.log("Server started!");
})

app.post("/post", async(req,res)=>{
    console.log(req.body);
    const {data}= req.body;

    try{
        if(data=="prashant"){
            res.send({status:"ok"});
        }
        else{
            res.send({status: "User not found"});
        }
    }
    catch(error){
        res.send({status:"Something went wrong, try again"});
    }
     
});

require("./userDetails");

const User=mongoose.model("UserInfo");

app.post("/register",async(req, res)=>{
    const{fname, lname, email, password}= req.body;
    try{
        await User.create({
            fname,
            lname,
            email,
            password,
        });
        res.send({status: "ok"});
    }catch(error){
        res.send({status: "error"});
    }
})
 