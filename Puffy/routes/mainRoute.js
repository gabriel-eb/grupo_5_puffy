const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");
const uploadFile = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");
const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");

// Pagina de inicio
router.get("/", controller.index);
// Mostrar carrito
router.get("/carrito", controller.carrito);
// Formulario de login
router.get("/login", loggedIn, controller.login);
// Formulario de signup
router.get("/signup", loggedIn, controller.signup);
// Procesar signup
router.post("/signup", uploadFile.single('avatar'), validations, controller.processSignup);
// Procesar login
router.post("/login", controller.processLogin);
// Procesar logout
router.get("/logout", notLogged, controller.processLogout);


module.exports = router