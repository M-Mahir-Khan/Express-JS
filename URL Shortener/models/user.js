const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true,
    },

    email: {
        type: String,
        requred: true,
        unique: true,
    },

    password: {
        type: String,
        requred: true,
    },

},   {timestamps: true }
)


const user = mongoose.model("user", userSchema);

module.exports = user;