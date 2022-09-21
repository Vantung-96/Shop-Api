const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderModel = new Schema({
    _id:String
    ,
    orderDate: {
        type: Date,
        default: Date.now()
    },
    shippedDate: {
        type: Date
    },
    note: {
        type: String
    },
    orderDetail: {
        type: Array
    },
    cost: {
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

module.exports = mongoose.model("order" , orderModel);