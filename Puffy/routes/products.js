const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Productos");
});

router.get("/detalle", (req, res) => {
    res.status(200).sendFile("detalle.html", { root: "views" });
});

module.exports = router