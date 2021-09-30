const express = require("express");
const router = express.Router();
const controller = require("./controllers/userController");

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUser);

module.exports = router;