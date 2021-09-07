const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const controllerDir = require('../controllers/addressController');
const uploadFile = require("../middlewares/multerMiddleware");
const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");
const gcpAvatar = require("../middlewares/gcpAvatarMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");

router.get('/:id', controller.obtenerPerfil);
router.route("/modificar/:id")
    .get(notLogged, controller.vistaModificar)
    .put(uploadFile.single('avatar'), gcpAvatar, validations, controller.modificar);

// Rutas de libreta de direcciones
router.route('/:id/newAddress')
    .get(notLogged, controllerDir.vistaNuevaDir)
    .post(controllerDir.agregarDir);
router.route('/:id/addresses')
    .get(notLogged, controllerDir.vistaDirecciones);
router.route('/:id/addresses/:idAddress')
    .get(notLogged, controllerDir.vistaModificarDir)
    .put(notLogged, controllerDir.modificarDir)
    .delete(notLogged, controllerDir.borrarDir);

module.exports = router