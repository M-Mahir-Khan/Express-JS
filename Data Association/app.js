const express = require("express");
const app = express();
const userModel = require("./models/user")
const postModel = require("./models/posts")

app.get("/", function (req, res) {
    res.send("hey")
})

app.get("/create", async function (req, res) {
    let user = await userModel.create({
        username: "harsh",
        age: 25,
        email: "harsh@gmail.com"
    })
    res.send(user)
})

app.get("/post/create", async function (req, res) {
    let post = await postModel.create({
        postdata: "hello",
        user: "683da112a619f151f6053bbf"
    })

   let user = await userModel.findOne({_id:"683da112a619f151f6053bbf"})
   user.posts.push(post._id)
   await user.save();

   res.send({post,user})
})


app.listen(3000);