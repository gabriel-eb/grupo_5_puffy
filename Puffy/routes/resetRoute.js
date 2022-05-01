const express = require("express");
const router = express.Router();
const controller = require("../controllers/emailController");
const loggedIn = require("../middlewares/loggedInMiddleware");

router.get('/', controller.index);
router.post('/', controller.sendEmail);
router.route('/password').get(controller.resetPassForm).post(controller.resetPass);

module.exports = router;
