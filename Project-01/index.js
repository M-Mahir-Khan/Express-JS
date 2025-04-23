const express = require("express");
const users = require("./DummyData.json")
const fs = require("fs");
const { json } = require("stream/consumers");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({extended:false}))

// Routes

app.get("/users",(req,res)=>{
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `

    res.send(html)
})


app.get("/api/users", (req,res)=>{
    return res.json(users)
})


// REST API

app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> Number(user.id) === id)

    return res.json(user)
}).patch((req,res)=>{
    const id = Number(req.params.id)
    const body = req.body;
    
    const userIndex = users.findIndex((user) => Number(user.id) === id)

    users[userIndex] = {...users[userIndex], ... body}

    fs.writeFile("./DummyData.json", JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",user:users[userIndex]})
    })

    
}).delete((req,res)=>{
    const id = Number(req.params.id);
    const body = req.body;

    const userIndex = users.findIndex((user)=> Number(user.id) === id)
    users.splice(userIndex,1)

    fs.writeFile("./DummyData.json",JSON.stringify(users),(err)=>{
        return res.json({status:"Deleted",id})
    })
    return res.json({status:"Pending"})
})


app.post('/api/users', (req,res)=>{
    const body = req.body;

    users.push({...body,id:users.length + 1})
    fs.writeFile("./DummyData.json",JSON.stringify(users), (err,data)=>{
        return res.json({status:"success", id:users.length})
    })
})





app.listen(PORT,()=> console.log(`Server Started at Port`))