const express =require('express');
// import controler
const {createProduct , getAllProduct , getProductById, updateProduct, deleteProduct} = require('../controllers/productController');

const router = express.Router();

 router.post("/product" ,createProduct);
 router.get("/product" , getAllProduct);
 
 router.get("/product/:productId" , getProductById);
 router.put("/product/:productId" , updateProduct);
 router.delete("/product/:productId", deleteProduct);


module.exports = router;