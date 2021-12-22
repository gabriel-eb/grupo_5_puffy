const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");

router.get('/', controller.index);
router.get('/checkout', controller.startCheckout);
router.get('/increase/:prodId', controller.increase);
router.get('/decrease/:prodId', controller.decrease);
router.post('/addProduct', controller.addProduct);

module.exports = router;
