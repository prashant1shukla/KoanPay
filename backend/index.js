const express = require("express");
const app=express();
const mongoose=require
app.use(express.json());

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
 