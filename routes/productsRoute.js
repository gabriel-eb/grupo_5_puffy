const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
// const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");
const uploadFile = require("../middlewares/multerMiddleware");
const gcpImage = require("../middlewares/gcpImageMiddleware")

router.get("/", controller.index);
router.route("/agregar").get(notLogged,controller.vistaAgregar)
.post(uploadFile.single('image'), gcpImage, controller.agregar);
router.get("/:id", controller.detalle);
router.get('/delete/:id', notLogged, controller.delete);
router.route("/modificar/:id").get(notLogged, controller.vistaModificar).put(uploadFile.single('image'), gcpImage,controller.modificar);

module.exports = router;