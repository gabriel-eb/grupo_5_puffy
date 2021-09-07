const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
// const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");
const uploadFile = require("../middlewares/multerMiddleware");
const gcpImage = require("../middlewares/gcpImageMiddleware");
const validator = require('../middlewares/validateProductMiddleware');
const validatorEdit = require('../middlewares/validateEditProductMiddleware');

router.get("/", controller.index);
router.route("/agregar")
    .get(/*notLogged,*/controller.vistaAgregar)
    .post(uploadFile.single('image'), gcpImage, validator, controller.agregar);
router.get("/:id", controller.detalle);
router.get('/:id/delete', /*notLogged,*/ controller.delete);
router.route("/:id/edit")
    .get(/*notLogged,*/ controller.vistaModificar)
    .put(uploadFile.single('image'), gcpImage, validatorEdit, controller.modificar);

module.exports = router;