const mongoose = require("mongoose");

const User_schema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
    },
})

const Users = mongoose.model("subscribers",User_schema);

module.exports = Users;
