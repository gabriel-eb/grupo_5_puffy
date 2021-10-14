const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const controllerDir = require('../controllers/addressController');
const controllerCart = require('../controllers/cartController');
const uploadFile = require("../middlewares/multerMiddleware");
const isUser = require("../middlewares/isUserMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");
const gcpAvatar = require("../middlewares/gcpAvatarMiddleware");
const validateEdit = require("../middlewares/validateEditMiddleware");
const validateAddress = require("../middlewares/validateAddressMiddleware");

router.get('/:id', controller.obtenerPerfil);
router.route("/:id/edit")
    .get(notLogged, isUser, controller.vistaModificar)
    .put(notLogged, isUser, uploadFile.single('avatar'), gcpAvatar, validateEdit, controller.modificar);
router.route("/:id/edit/password")
    .get(notLogged, isUser, controller.vistaModificarPass)
    .put(notLogged, isUser, controller.modificarPass);
router.delete("/:id/delete", isUser, controller.borrar);

// Rutas de libreta de direcciones
router.route('/:id/newAddress')
    .get(notLogged, isUser, controllerDir.vistaNuevaDir)
    .post(notLogged, isUser, validateAddress, controllerDir.agregarDir);
router.route('/:id/addresses')
    .get(notLogged, isUser, controllerDir.vistaDirecciones);
router.route('/:id/addresses/:idAddress')
    .get(notLogged, isUser, controllerDir.vistaModificarDir)
    .put(notLogged, isUser, validateAddress, controllerDir.modificarDir)
    .delete(notLogged, isUser, controllerDir.borrarDir);

//Rutas de carrito
router.route('/:id/carrito')
    .get(notLogged, isUser, controllerCart.vistaCarrito)
    .put(notLogged, isUser, controllerCart.buyCart);

router.route('/:id/carrito/:idCarrito')
    .get(/*notLogged,*/controllerCart.deleteProduct);

module.exports = router