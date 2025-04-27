const User = require("../Models/user")

async function handleGetAllUsers(req,res) {
    const allUsers = await User.find({})
    return res.json(allUsers)
    
}

async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({erron:"user not found"})
    return res.json(user)
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{lastName:Changed})
    return res.json({status:"Success"})
}

async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id)
    returnres.json({status:"Success"})
}

async function handleCreateNewUser(req,res) {
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

    return res.status(201).json({ msg: "succss",id:result._id })
}
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}