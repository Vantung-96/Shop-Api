// import Model
const customerModel = require('../model/customerModel');
// khai bao mongoose
const mongoose = require('mongoose');
// POSt
const createCustomer = (req, resp) => {
    // chaun bi
    let bodyReq = req.body;
    // validate
    if (!bodyReq.fullName) {
        return resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "fullName is required"
        })
    }
    if (!bodyReq.phone) {
        return resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "phone is required"
        })
    }
    if (!bodyReq.email) {
        return resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "email is required"
        })
    }
    // thao tac
    let customerCreate = {
        _id: mongoose.Types.ObjectId(),
        fullName: bodyReq.fullName,
        phone: bodyReq.phone,
        email: bodyReq.email,
        address: bodyReq.address,
        city: bodyReq.city,
        country: bodyReq.country

    }
    customerModel.create(customerCreate, (err, data) => {
        if (err) {
            return resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {
            return resp.status(201).json({
                status: "Success: Customer created",
                data: data
            });
        }
    })
}
// GET ALL
const getAllCustomer = (req, resp) => {
    //thao tac
    customerModel.find((err, data) => {
        if (err) {
            return resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {
            return resp.status(200).json({
                status: "Success: Get Customer success",
                data: data
            });
        }
    })
}

// GET By ID
const getCustomerById = (req, resp) => {
    //chuan bi
    let customerId = req.params.customerId;
    //2: validate
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "customerId is  not valid"
        });
    }
    // thao tac
    customerModel.findById(customerId, (err, data) => {
        if (err) {
            return resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            return resp.status(200).json({
                status: "Success: Get Customer By ID success",
                data: data
            });
        }

    })
}
// PUT
const updateCustomer = (req, resp) => {
    // chuan bi
    let customerId = req.params.customerId;
    let bodyReq = req.body;
    //validate
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "customerId is  not valid"
        });
    }
    // thao tac
    let customerUpdate = {
        fullName: bodyReq.fullName,
        phone: bodyReq.phone,
        email: bodyReq.email,
        address: bodyReq.address,
        city: bodyReq.city,
        country: bodyReq.country
    }
    customerModel.findByIdAndUpdate(customerId, customerUpdate, (err, data) => {
        if (err) {
            return resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            return resp.status(200).json({
                status: "Success: Put Customer  success",
                data: data
            });
        }

    })

}
// DELETE
const deleteCustomer = (req, resp) => {
    // chuan bi
    let customerId = req.params.customerId;
    // validate
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "customerId is  not valid"
        });
    }
    // thao tac
    customerModel.findByIdAndDelete(customerId, (err, data) => {
        if (err) {
            return resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {
            return resp.status(204).json({
                status: "Success: Delete Customer success",
            });
        }

    })
}


module.exports = {
    createCustomer,
    getAllCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}