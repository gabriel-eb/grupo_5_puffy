const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", (req, res) => {
    res.status(200).send("Productos");
});

router.get("/agregar", controller.agregar);

router.get("/detalle", controller.detalle);

router.post("/agregarProducto", (req, res) => {
    res.send("hola");
});

router.get('/modificar/:id', controller.modificar);

module.exports = router;
