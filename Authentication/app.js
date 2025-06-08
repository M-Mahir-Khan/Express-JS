const express = require('express')
const app = express();
const bcrypt  = require("bcrypt")



app.get("/",function(req,res){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("pololololoo", salt, function(err, hash) {
            console.log(hash);
            
        });
    });
})

app.listen(3000)