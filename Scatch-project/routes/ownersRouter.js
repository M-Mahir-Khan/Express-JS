const express = require("express")
const router = express.Router();
const ownerModel = require("../models/owners-model")

router.get("/", function (req, res) {
    res.send("hey it's working")
})


if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find()
console.log(owners);

        if (owners.length > 0) return res.status(503).send("You don't have permission to create a new owner")

        let {fullname, email, password} = req.body
    
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        
     
     
    return res.status(201).res.send(createOwner)

    })
}


module.exports = router;