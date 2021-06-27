const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", (req, res) => {
    res.status(200).send("Productos");
});

router
    .route("agregar")
    .get(controller.agregar)
    .post((req, res) => res.send("Hola"));

router.get("/:id", controller.detalle);

router.get("/modificar/:id", controller.modificar);

module.exports = router;
