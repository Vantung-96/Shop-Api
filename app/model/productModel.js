const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productModel = new Schema({
    _id:{
        type: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    type:{
      type: mongoose.Types.ObjectId,
      ref: "productType",
      required: true  
    },
    imageUrl:{
        type: String,
        required: true
    },
    buyPrice:{
        type: Number,
        required: true
    },
    promotionPrice:{
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("product" , productModel);