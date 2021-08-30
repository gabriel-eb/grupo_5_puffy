const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const uploadFile = require("../middlewares/multerMiddleware");
const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");

// Prueba sequlize
router.route('/').get(controller.list).post(controller.createUser);


router.get('/:id', controller.obtenerPerfil);
router.route("/modificar/:id")
    .get(notLogged, controller.vistaModificar)
    .put(uploadFile.single('avatar'), controller.modificar);
router.route('/:id/newAddress')
    .get(notLogged, controller.vistaNuevaDir)
    .post(controller.agregarDir);
router.route('/:id/addresses').get(controller.vistaDirecciones);
router.route('/:id/addresses/:idAddress')
    .get()
    .put()
    .delete();

module.exports = router