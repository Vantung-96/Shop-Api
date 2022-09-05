// import Model
const customerModel = require('../model/customerModel');
const orderModel = require('../model/orderModel');
// khai bao mongoose
const mongoose =require('mongoose');

//POST
const createOrderOfCustomer = (req , resp) => {
    // chuan bi
    let customerId = req.params.customerId;
    let bodyReq = req.body;
    //validate
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return  resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "customerId is  not valid"
        });
    }
    // thao tac
    let createOrder = {
        _id: mongoose.Types.ObjectId(),
        shippedDate: bodyReq.shippedDate,
        note: bodyReq.note,
        orderDetail: bodyReq.orderDetail,
        cost: bodyReq.cost
        
       
    }
    orderModel.create(createOrder , (err ,data) => {
        if (err) {
            return  resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {
            customerModel.findByIdAndUpdate( customerId ,{
                $push: { orders: data._id } 
             }, (error , updatedCustomer) => {
                if(error) {
                    return resp.status(500).json({
                        status: "Error 500: Internal server error",
                        message: err.message
                    })
                } else {
                    return resp.status(201).json({
                        status: "Create Review Success",
                        data: data
                    })
                }
             })
        }
    })
}
// GET ALL ORDER
const getAllOrder = (req ,resp ) => {
    //thao tac
    orderModel.find((err, data)=> {
        if (err) {
            return   resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {
            return   resp.status(200).json({
                status: "Success: Get Order success",
                data: data
            });
        }
    } )
}

// GET ALL ORDER OF CUSTOMER
const getAllOrderOfCustomer = (req, resp) => {
     //B1: Chuẩn bị dữ liệu
     let customerId = req.params.customerId;
     //B2: Validate dữ liệu
     if(!mongoose.Types.ObjectId.isValid(customerId)) {
         return resp.status(400).json({
             status: "Error 400: Bad Request",
             message: "customer ID is invalid"
         })
     }
     //B3: Thao tác với cơ sở dữ liệu
     customerModel.findById(customerId)
         .populate("orders")
         .exec((error, data) => {
             if(error) {
                 return resp.status(500).json({
                     status: "Error 500: Internal server error",
                     message: error.message
                 })
             } else {
                 return resp.status(200).json({
                     status: "Get data success",
                     data: data.orders
                 })
             }
         })
}

// GET ORDER BY ID
const getOrderById = (req, resp) => {
    // chuan bhi
    let orderId = req.params.orderId;
    // validate
    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "order ID is invalid"
        })
    }
    // thao tac
    orderModel.findById(orderId , (err , data) => {
        if (err) {
            return  resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            return  resp.status(200).json({
                status: "Success: Get order By ID success",
                data: data
            });
        }

    })
}

// PUT
const updateOrder = (req , resp) => {
     // chuan bi
     let orderId = req.params.orderId;
     let bodyReq = req.body;
     //validate
     if (!mongoose.Types.ObjectId.isValid(orderId)) {
         return resp.status(400).json({
             status: "Error 400: Bad Request",
             message: "orderId is  not valid"
         });
     }
     // thao tac
     let orderUpdate = {
        shippedDate: bodyReq.shippedDate,
        note: bodyReq.note,
        orderDetail: bodyReq.orderDetail,
        cost: bodyReq.cost
     }
     orderModel.findByIdAndUpdate(orderId, orderUpdate, (err, data) => {
         if (err) {
             return resp.status(500).json({
                 status: "Error 500: Internal server error",
                 message: err.message
             })
         } else {
 
             return resp.status(200).json({
                 status: "Success: Put Order  success",
                 data: data
             });
         }
 
     })
}

// DELETE 
const deleteOrder = (req , resp) => {
     // chuan bi
     let orderId = req.params.orderId;
     // validate
     if (!mongoose.Types.ObjectId.isValid(orderId)) {
         return resp.status(400).json({
             status: "Error 400: Bad Request",
             message: "orderId is  not valid"
         });
     }
     // thao tac
     orderModel.findByIdAndDelete(orderId, (err, data) => {
         if (err) {
             return resp.status(500).json({
                 status: "Error 500: Internal server error",
                 message: err.message
             })
         } else {
             return resp.status(204).json({
                 status: "Success: Delete Order success",
             });
         }
 
     })
}

module.exports = {
    createOrderOfCustomer, getAllOrder,
    getAllOrderOfCustomer, getOrderById,
    updateOrder, deleteOrder
}