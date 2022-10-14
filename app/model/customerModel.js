const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerModel = new Schema({
    _id:String,
    fullName: {
        type: String,
        
    },
    phone: {
        type: String,
        required:true,
        unique: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    address: {
        type: String,
        default:""
    },
    city: {
        type: String,
        default:""
    },
    country: {
        type: String,
        default:""
    },
    orders:[
        {
            type: mongoose.Types.ObjectId,
            ref: "order"
        }
    ],
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("customer" , customerModel);