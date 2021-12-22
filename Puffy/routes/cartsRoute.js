const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");

router.get('/', controller.index);
router.get('/checkout', controller.startCheckout);
router.get('/invited', controller.invitedCheckout);
router.get('/increase/:prodId', controller.increase);
router.get('/decrease/:prodId', controller.decrease);
router.post('/addProduct', controller.addProduct);
router.post('/checkEmail', controller.checkEmail);
router.post('/createInvited', controller.createInvited);

module.exports = router;
