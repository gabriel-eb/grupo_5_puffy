const express = require('express');
const router = express.Router();
const controller = require("../controllers/usersController");

 router.get('/', (req, res) => {

});

router.route("/modificar/:id").get(controller.vistaModificar);

module.exports = router