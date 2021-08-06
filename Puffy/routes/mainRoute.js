const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");
const uploadFile = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");

// Pagina de inicio
router.get("/", controller.index);
// Mostrar carrito
router.get("/carrito", controller.carrito);
// Formulario de login
router.get("/login", controller.login);
// Formulario de signup
router.get("/signup", controller.signup);
//Procesar signup
router.post("/signup", uploadFile.single('image'), validations, controller.processSignup);
//Procesar login
router.post("/login", controller.processLogin);


module.exports = router