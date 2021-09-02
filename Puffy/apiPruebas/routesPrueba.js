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

router.route('/products')
        .get(controller.listProducts)
        .post(controller.addProduct);
router.route('/products/:id')
        .get(controller.getProduct)
        .put(controller.editProduct)
        .delete(controller.deleteProduct);
router.route('/products/:id/detail').get(controller.listAllProductInfo);


router.route('/cart')
        .get(controller.listCarts)
        .post(controller.addCart);
router.route('/cart/:id')
        .get(controller.getCart)
        .put(controller.editCart)
        .delete(controller.deleteCart);      

router.route('/categories')
        .get(controller.listCategories)
        .post(controller.addCategory);
router.route('/categories/:id')
        .get(controller.getCategory)
        .put(controller.editCategory)
        .delete(controller.deleteCategory);

router.route('/product_cart')
        .get(controller.listProductCarts)
        .post(controller.addProductCart);
router.route('/product_cart/:id')
        .get(controller.getProductCart)
        .put(controller.editProductCart)
        .delete(controller.deleteProductCart);


router.route('/product_category')
        .get(controller.listProductCats)
        .post(controller.addProductCat);
router.route('/product_cart/:id')
        .get(controller.getProductCat)
        .put(controller.editProductCat)
        .delete(controller.deleteProductCat);


module.exports = router;