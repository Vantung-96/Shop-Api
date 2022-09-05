const express =require('express');
// import controler
const { createCustomer , getAllCustomer , getCustomerById , updateCustomer , deleteCustomer} = require('../controllers/customerController');

const router = express.Router();

  router.post("/customer" ,createCustomer);
  router.get("/customer" , getAllCustomer);
 router.get("/customer/:customerId" , getCustomerById);
  router.put("/customer/:customerId" , updateCustomer);
  router.delete("/customer/:customerId", deleteCustomer);


module.exports = router;