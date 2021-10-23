const express = require("express");
const router = express.Router();
const controller = require("../controllers/invitedController");

router.get('/', controller.index);
router.post('/create', controller.createInvited);
router.delete('/:invitedId/delete', controller.deleteInvited);

module.exports = router;
