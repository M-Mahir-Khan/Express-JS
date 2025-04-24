const express = require("express");
const users = require("./contacts.json");

const app = express();
const PORT = 8000;


app.get("/api/contacts",(req,res)=>{
    return res.json(users)
})

app.get("/api/contacts/:id",(req,res)=>{
    const id = Number(req.params.id)
    const contact = users.find((user)=> user.id === id);

    if(!contact){
        return res.status(404).json({message:"Contact not found"})
    }
    res.json(contact)
})

app.listen(PORT,()=> console.log(`Server Started`))
