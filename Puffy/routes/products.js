const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.index);
router.get('/eliminar/:id', controller.eliminar);

router
    .route("agregar")
    .get(controller.agregar)
    .post((req, res) => res.send("Hola"));

router.get("/:id", controller.detalle);

router.get("/modificar/:id", controller.modificar);

module.exports = router;
