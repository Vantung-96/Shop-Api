const express =require('express');
// import controler
const { createOrderOfCustomer , getAllOrder , getAllOrderOfCustomer , getOrderById , updateOrder , deleteOrder} = require('../controllers/orderController');

const router = express.Router();

  router.post("/customer/:customerId/order" , createOrderOfCustomer);
  router.get("/order" , getAllOrder)
  router.get("/customer/:customerId/order" , getAllOrderOfCustomer);
  router.get("/order/:orderId" ,getOrderById );
  router.put("/order/:orderId" , updateOrder);
  router.delete("/order/:orderId", deleteOrder);


module.exports = router;