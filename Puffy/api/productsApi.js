const express = require("express");
const router = express.Router();
const controller = require("./controllers/productController");

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProduct);

module.exports = router;