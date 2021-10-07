const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");

router.get('/users', controller.getAllUsers);
router.get('/users/:id', controller.getUser);

router.get('/products', controller.getAllProducts);
router.get('/products/:id', controller.getProduct);

module.exports = router;
