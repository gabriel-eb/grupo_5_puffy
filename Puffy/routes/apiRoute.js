const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");
const uploadFile = require("../middlewares/multerMiddleware");
const gcpImage = require("../middlewares/gcpImageMiddleware");

router.get('/isAdmin', controller.getIsAdmin)

router.get('/users', controller.getAllUsers);
router.get('/users/last', controller.getLastUser);
router.get('/users/:id', controller.getUser);

router.get('/products', controller.getAllProducts);
router.post('/products/create', uploadFile.single('image'), gcpImage, controller.createProduct);
router.get('/products/sales', controller.getSales);
router.get('/products/:id', controller.getProduct);
router.delete('/products/:id', controller.deleteProduct);
router.put('/products/:id/update', uploadFile.single('image'), gcpImage, controller.updateProduct);

router.get('/categories', controller.getAllCategories);

module.exports = router;
