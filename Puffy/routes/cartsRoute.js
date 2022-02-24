const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");

router.get('/', controller.index);
router.post('/checkout', controller.startCheckout);
router.route('/checkout/selectAddress').get(controller.selectingAddress).post(controller.selectedAddress);
router.get('/invited', controller.invitedCheckout);
router.get('/increase/:prodId', controller.increase);
router.get('/decrease/:prodId', controller.decrease);
router.post('/addProduct', controller.addProduct);
router.post('/createInvited', controller.createInvited);
router.post('/createAddressInvited', controller.createAddressInvited);

module.exports = router;
