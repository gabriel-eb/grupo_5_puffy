const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const controllerDir = require('../controllers/addressController');
const controllerCart = require('../controllers/cartController');
const uploadFile = require("../middlewares/multerMiddleware");
const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");
const gcpAvatar = require("../middlewares/gcpAvatarMiddleware");
const validateEdit = require("../middlewares/validateEditMiddleware");
const validateAddress = require("../middlewares/validateAddressMiddleware");

router.get('/:id', controller.obtenerPerfil);
router.route("/:id/edit")
    .get(/*notLogged,*/ controller.vistaModificar)
    .put(/*notLogged,*/ uploadFile.single('avatar'), gcpAvatar, validateEdit, controller.modificar);
router.delete("/:id/delete", controller.borrar);

// Rutas de libreta de direcciones
router.route('/:id/newAddress')
    .get(/*notLogged,*/ controllerDir.vistaNuevaDir)
    .post(notLogged, validateAddress, controllerDir.agregarDir);
router.route('/:id/addresses')
    .get(/*notLogged,*/controllerDir.vistaDirecciones);
router.route('/:id/addresses/:idAddress')
    .get(/*notLogged,*/ controllerDir.vistaModificarDir)
    .put(notLogged, validateAddress, controllerDir.modificarDir)
    .delete(notLogged, controllerDir.borrarDir);

//Rutas de carrito

router.route('/:id/carrito')
    .get(/*notLogged,*/controllerCart.vistaCarrito);

module.exports = router