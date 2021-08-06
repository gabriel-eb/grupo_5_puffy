const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', (req, res) => {

});

router.get('/:id', controller.obtenerPerfil);
router.route("/modificar/:id").get(controller.vistaModificar).put(controller.modificar);

module.exports = router