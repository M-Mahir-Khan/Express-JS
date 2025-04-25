const express = require("express");
const fs  = require("fs")
const users = require("./contacts.json");

const app = express();
const PORT = 8000;


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.get("/api/contacts", (req, res) => {
    return res.json(users)
})

app.get("/api/contacts/:id", (req, res) => {
    const id = Number(req.params.id)
    const contact = users.find((user) => user.id === id);

    if (!contact) {
        return res.status(404).json({ message: "Contact not found" })
    }
    res.json(contact)
})

app.post("/api/contacts", (req, res) => {
    const body = req.body;

    users.push({ id: users.length + 1, ...body })

    fs.writeFile("./contacts.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "File Write failed" })
        }
        return res.json({ status: "success", id: users.length })

    })
})

app.patch("/api/contacts/:id", (req, res) => {
    const id = Number(req.params.id)

    const user = users.find((user) => user.id === id)

    if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" })
    }

    const { name, email, phone } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    fs.writeFile("contacts.json", JSON.stringify(users), (err) => {
        if (err) {
          return res.status(500).json({ status: "error", message: "File write failed" })
        }
    return res.json({ status: "success" })

    })

})

app.delete("/api/contacts/:id",(req,res)=>{
    const id = Number(req.params.id)

    const userIndex = users.findIndex((user)=> user.id === id)

    if(userIndex === -1){
      return res.status(404).json({status:"error", message:"User not found"})
    }
    users.splice(userIndex,1)

    fs.writeFile("contacts.json",JSON.stringify(users),(err)=>{
        if(err){
            return res.status(500).json({status:"error",message:"File write failed"})
        }
        return res.json({status:"deleted"})
    })
})

app.listen(PORT, () => console.log(`Server Started`))
