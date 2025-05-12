const express = require("express");
const app = express()

const userModel = require('./usermodel');
const usermodel = require("./usermodel");
 
app.get("/",(req,res) => {
    res.send("hey")
})

app.get("/create",async (req,res) => {
    let createdUser = await userModel.create({
        name:"Mahir",
        email:"mahirmahir8951@gmail.com",
        username:"Mahir"
    })
    res.send(createdUser)
})

app.get("/read", async (req,res)=>{
    let users = await usermodel.find()
    res.send(users)
})


app.get("/update",async (req,res) => {
    let updatedUser = await userModel.findOneAndUpdate({username:"Mahir"},{name:"Mohammed Mahir"},{new:true})
    res.send(updatedUser)
})


app.get("/delete", async (req,res) => {
    let deletedUser  = await userModel.findOneAndDelete({name:"Mahir"})
    res.send(deletedUser)
})

app.listen(3000)