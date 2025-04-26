const express = require("express");
// const users = require("./DummyData.json")
const fs = require("fs");
const mongoose = require('mongoose')

// const { json } = require("stream/consumers");
// const { type } = require("os");

const app = express();
const PORT = 8000;

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/my-app-1')
    .then(() => console.log("MongoDB conneted"))
    .catch((err) => console.log("Mongo Error", err))

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender: {
        type: String
    }
})

const User = mongoose.model('user', userSchema)

// Middleware
app.use(express.urlencoded({ extended: false }))

// Routes

app.get("/users", async (req, res) => {
    const allUsers = await User.find({})

    const html = `
    <ul>
    ${allUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `

    res.send(html)
})


app.get("/api/users", async (req, res) => {
    const allUsers = await User.find({})

    return res.json(allUsers)
})


// REST API

app.route("/api/users/:id").get(async (req, res) => {
    const user = await User.findById(req.params.id)
    return res.json(user)
}).patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"})
    return res.json({status:"success"})

    // const id = Number(req.params.id)
    // const body = req.body;

    // const userIndex = users.findIndex((user) => Number(user.id) === id)

    // users[userIndex] = { ...users[userIndex], ...body }

    // fs.writeFile("./DummyData.json", JSON.stringify(users), (err, data) => {
    //     return res.json({ status: "success", user: users[userIndex] })
    // })


}).delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    returnres.json({status:"Success"})
    // const id = Number(req.params.id);
    // const body = req.body;

    // const userIndex = users.findIndex((user) => Number(user.id) === id)
    // users.splice(userIndex, 1)

    // fs.writeFile("./DummyData.json", JSON.stringify(users), (err) => {
    //     return res.json({ status: "Deleted", id })
    // })
    // return res.json({ status: "Pending" })
})


app.post('/api/users', async (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are req..." })
    }

    await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    console.log("result", res);

    return res.status(201).json({ msg: "succss" })

    // users.push({...body,id:users.length + 1})
    // fs.writeFile("./DummyData.json",JSON.stringify(users), (err,data)=>{
    //     return res.json({status:"success", id:users.length})
    // })
})





app.listen(PORT, () => console.log(`Server Started at Port`))