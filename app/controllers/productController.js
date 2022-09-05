// import Model
const productModel = require('../model/productModel');
// khai bao mongoose
const mongoose =require('mongoose');

// POST
const createProduct = (req, resp) => {
    // chuan bi
    let bodyReq =req.body;
    // validate
    if (!bodyReq.name) {
        return  resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "name is required"
        })
    }
    if (!bodyReq.type) {
        return   resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "type is required"
        })
    }
    if (!bodyReq.imageUrl) {
        return   resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "imageUrl is required"
        })
    }
    if ( !bodyReq.buyPrice || isNaN(bodyReq.buyPrice) ){
        return  resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "buyPrice is required / not a NUmber"
        })
    }
    if ( !bodyReq.promotionPrice || isNaN(bodyReq.promotionPrice) ) {
        return  resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "promotionPrice is required / not a NUmber"
        })
    }
    if ( isNaN(bodyReq.amount) ) {
        return  resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "amount  not a NUmber"
        })
    }
    // thao tac
    let createProduct = {
        _id: mongoose.Types.ObjectId(),
        name: bodyReq.name,
        description: bodyReq.description,
        type: bodyReq.type,
        imageUrl: bodyReq.imageUrl,
        buyPrice: bodyReq.buyPrice,
        promotionPrice: bodyReq.promotionPrice,
        amount: bodyReq.amount
        
    }
    productModel.create(createProduct, ( err , data) => {
        if (err) {
            return  resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {
            return  resp.status(201).json({
                status: "Success: Product created",
                data: data
            });
        }


    })

}

//GET ALL
const getAllProduct = (req, resp) => {
    const {name , type , min , max } = req.query;
    let limit = req.query.limit;
    let skip = req.query.skip;
    let condition = {};
    if (limit) {
        condition.limit = limit;
    }
    if (skip) {
        condition.skip = skip;
    }
    if(name) {
        const regex = new RegExp(`${name}`);
        condition.name = regex;
    }
    if(type) {
        const regexType = new RegExp(`${type}`);
        condition.type = regexType;
    }
    if(min && max) {
       condition.promotionPrice ={
        ...condition.promotionPrice,$gte: min, $lte: max 
       }
    }
     //thao tac
     productModel.find(condition).skip(skip).limit(limit).exec((err, data) => {
        if (err) {
            return   resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {
            return   resp.status(200).json({
                status: "Success: Get Product success",
                data: data
            });
        }
    } )
}
// GEt By ID
const getProductById = (req ,resp) => {
     //chuan bi
     let productId = req.params.productId;
     //2: validate
     if (!mongoose.Types.ObjectId.isValid(productId)) {
        return  resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "productId is  not valid"
        });
    }
    // thao tac
    productModel.findById(productId , (err , data) => {
        if (err) {
            return  resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            return  resp.status(200).json({
                status: "Success: Get product By ID success",
                data: data
            });
        }

    })

}

// PUT
const updateProduct = (req, resp) => {
     // chuan bi
     let productId = req.params.productId;
     let bodyReq = req.body;
     //validate
     if (!mongoose.Types.ObjectId.isValid(productId)) {
         return   resp.status(400).json({
             status: "Error 400: Bad Request",
             message: "productTypeId is  not valid"
         });
     }
     // thao tac
     let  productUpdate = {
        name: bodyReq.name,
        description: bodyReq.description,
        type: bodyReq.type,
        imageUrl: bodyReq.imageUrl,
        buyPrice: bodyReq.buyPrice,
        promotionPrice: bodyReq.promotionPrice,
        amount: bodyReq.amount
     }
     productModel.findByIdAndUpdate(productId , productUpdate, (err , data) => {
         if (err) {
             return  resp.status(500).json({
                 status: "Error 500: Internal server error",
                 message: err.message
             })
         } else {
 
             return resp.status(200).json({
                 status: "Success: Put Product  success",
                 data: data
             });
         }
 
     })
}
// DELETE
const deleteProduct = (req, resp) => {
      // chuan bi
      let productId = req.params.productId;
      // validate
      if (!mongoose.Types.ObjectId.isValid(productId)) {
          return  resp.status(400).json({
              status: "Error 400: Bad Request",
              message: "productId is  not valid"
          });
      }
      // thao tac
      productModel.findByIdAndDelete(productId , (err, data) => {
          if (err) {
              return  resp.status(500).json({
                  status: "Error 500: Internal server error",
                  message: err.message
              })
          } else {
              return resp.status(204).json({
                  status: "Success: Delete Product success",
              });
          }
  
      })
}


module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct
};