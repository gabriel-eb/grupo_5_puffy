const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
// const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");

router.get("/", controller.index);
router.route("/agregar").get(notLogged, controller.vistaAgregar).post(controller.agregar);
router.get("/:id", controller.detalle);
router.get('/delete/:id', notLogged, controller.delete);
router.route("/modificar/:id").get(notLogged, controller.vistaModificar).put(controller.modificar);

module.exports = router;