const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

});

router.get("/detalle", (req, res) => {
    res.status(200).sendFile("detalle.html", { root: "views" });
});