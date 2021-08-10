const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const uploadFile = require("../middlewares/multerMiddleware");

router.get('/', (req, res) => { res.send("users") });
router.get('/:id', controller.obtenerPerfil);
router.route("/modificar/:id").get(controller.vistaModificar).put(uploadFile.single('avatar'),controller.modificar);

module.exports = router