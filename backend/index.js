const express = require("express");
const app = express();

app.get("/home",(req,res)=>{
    res.send("hello express")
})

app.listen(9000,()=>{
    console.log("listening at 9000")
})