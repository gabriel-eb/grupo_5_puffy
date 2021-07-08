const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");

router.get("/", controller.index);
router.get("/carrito", controller.carrito);
router.get("/login", controller.login);
router.get("/signup", controller.signup);

module.exports = router