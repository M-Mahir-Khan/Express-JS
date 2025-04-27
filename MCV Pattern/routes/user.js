const express = require("express");
const {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser} = require("../controllers/user")


const router = express.Router()


router.route("/" )
.get(handleGetAllUsers)
.post(handleCreateNewUser)


// REST API

router.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)


// router.post('/')

module.exports = router;