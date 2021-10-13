const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");
const uploadFile = require("../middlewares/multerMiddleware");
const gcpImage = require("../middlewares/gcpImageMiddleware");

router.get('/users', controller.getAllUsers);
router.get('/users/:id', controller.getUser);

router.get('/products', controller.getAllProducts);
router.get('/products/:id', controller.getProduct);
router.put('/products/:id/update', uploadFile.single('image'), gcpImage, controller.updateProduct);
router.post('/products/create', uploadFile.single('image'), gcpImage, controller.createProduct);

router.get('/categories', controller.getAllCategories);

module.exports = router;
