const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");
const loggedIn = require("../middlewares/loggedInMiddleware");
const notLogged = require("../middlewares/notLoggedMiddleware");

router.get('/', controller.index);
router.post('/addProduct', controller.addProduct);

module.exports = router;
