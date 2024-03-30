const mongoose = require("mongoose");

const Product_Schema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})

const Product = mongoose.model("e-commerces",Product_Schema);

module.exports = Product;