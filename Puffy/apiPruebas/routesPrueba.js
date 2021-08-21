const router = require('express').Router();
const controller = require('./controllerPrueba');

router.route('/users')
        .get(controller.listUsers)
        .post(controller.addUser);
router.route('/users/:id')
        .get(controller.getUser)
        .put(controller.editUser)
        .delete(controller.deleteUser);

router.route('/addresses')
        .get(controller.listAddresses)
        .post(controller.addAddress);
router.route('/addresses/:id')
        .get(controller.getAddress)
        .put(controller.editAddress)
        .delete(controller.deleteAddress);


router.route('/orders')
        .get(controller.listOrders)
        .post(controller.addOrder);
router.route('/orders/:id')
        .get(controller.getOrder)
        .put(controller.editOrder)
        .delete(controller.deleteOrder);
router.route('/orders/:id/detail').get(controller.listAllOrderInfo);

module.exports = router;