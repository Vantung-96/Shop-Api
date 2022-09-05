// import Model
const productTypeModel = require('../model/productTypeModel');
// khai bao mongoose
const mongoose =require('mongoose');

// Post
const createProductType = (req, resp)=> {
    // chuan bi
    let bodyReq =req.body;
    // validate
    if (!bodyReq.name) {
      return  resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "name is required"
        })
    }
    // thao tac
    let createProductType = {
        _id: mongoose.Types.ObjectId(),
        name: bodyReq.name,
        description: bodyReq.description
    }
    productTypeModel.create(createProductType, ( err , data) => {
        if (err) {
            return   resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            return  resp.status(201).json({
                status: "Success: ProductType created",
                data: data
            });
        }


    })

}
// GEt ALL
const getAllProductType = (req,resp) => {
    //thao tac
    productTypeModel.find((err, data)=> {
        if (err) {
            return   resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            return   resp.status(200).json({
                status: "Success: Get ProductType success",
                data: data
            });
        }
    } )
}
// GEt By ID
const getProductTypeByID = (req, resp) => {
    //chuan bi
    let productTypeId = req.params.productTypeId;
     //2: validate
     if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return  resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "productTypeId is  not valid"
        });
    }
    // thao tac
    productTypeModel.findById(productTypeId , (err , data) => {
        if (err) {
            return  resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            return  resp.status(200).json({
                status: "Success: Get productType By ID success",
                data: data
            });
        }

    })


}
// PUT
const updateProductType = (req, resp) => {
    // chuan bi
    let productTypeId = req.params.productTypeId;
    let bodyReq = req.body;
    //validate
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return   resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "productTypeId is  not valid"
        });
    }
    // thao tac
    let  productTypeUpdate = {
        name: bodyReq.name,
        description: bodyReq.description
    }
    productTypeModel.findByIdAndUpdate(productTypeId , productTypeUpdate, (err , data) => {
        if (err) {
            return  resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            return resp.status(200).json({
                status: "Success: Put Product Type success",
                data: data
            });
        }

    })
}

// DElETE
const deleteProductType = (req , resp) => {
    // chuan bi
    let productTypeId = req.params.productTypeId;
    // validate
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return  resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "productTypeId is  not valid"
        });
    }
    // thao tac
    productTypeModel.findByIdAndDelete(productTypeId , (err, data) => {
        if (err) {
            return  resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {
            return resp.status(204).json({
                status: "Success: Delete ProductType success",
            });
        }

    })
}


module.exports = {
    createProductType,
    getAllProductType,
    getProductTypeByID,
    updateProductType,
    deleteProductType
};