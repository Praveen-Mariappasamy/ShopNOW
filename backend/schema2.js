const mongoose = require("mongoose");

const User_schema = new mongoose.Schema({
    password:{
        type: String,
        required: true,
    },
    cartData:{
        type:Object,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

const Users = mongoose.model("users",User_schema);

module.exports = Users;