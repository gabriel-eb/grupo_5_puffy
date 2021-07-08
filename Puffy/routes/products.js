const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.index);
router.get('/delete/:id', controller.delete);

router
    .route("/agregar")
    .get(controller.vistaAgregar)
    .post(controller.agregar);


router.get("/:id", controller.detalle);

router.route("/modificar/:id").get(controller.vistaModificar).put(controller.modificar);

module.exports = router;
