const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");
const uploadFile = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");
const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");
const gcpAvatar = require("../middlewares/gcpAvatarMiddleware");

// Pagina de inicio
router.get("/", controller.index);
// Formulario de login
router.route("/login")
    .get(loggedIn, controller.login)
    .post(controller.processLogin);
// Formulario de signup
router.route("/signup")
    .get(loggedIn, controller.signup)
    // Procesar signup
    .post(uploadFile.single('avatar'), gcpAvatar, validations, controller.processSignup);
// Procesar login
router
// Procesar logout
router.get("/logout", notLogged, controller.processLogout);
// Busqueda
router.get("/search", controller.searchProducts);
// Quienes somos
router.get("/wwr", controller.wwr);


module.exports = router