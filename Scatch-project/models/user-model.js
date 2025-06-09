const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password:String,
    cart:{
        type:Array,
        dafault:[]
    },
    isadmin:Boolean,
    orders:{
        type:Array,
        dafault:[]
    },
    contact:Number,
    picture:String
})

module.exports = mongoose.model("user",userSchema)