const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const uploadFile = require("../middlewares/multerMiddleware");
const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");


router.get('/', (req, res) => { res.send("users") });
router.get('/:id', controller.obtenerPerfil);
router.route("/modificar/:id")
    .get(notLogged, controller.vistaModificar)
    .put(uploadFile.single('avatar'), controller.modificar);

module.exports = router