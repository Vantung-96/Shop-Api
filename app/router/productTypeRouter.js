const express =require('express');
// import controler
const { createProductType , getAllProductType , getProductTypeByID , updateProductType, deleteProductType} = require('../controllers/productTypeController');

const router = express.Router();

router.post("/productType" ,createProductType);
router.get("/productType" , getAllProductType);
router.get("/productType/:productTypeId" , getProductTypeByID);
router.put("/productType/:productTypeId" , updateProductType);
router.delete("/productType/:productTypeId", deleteProductType);


module.exports = router;