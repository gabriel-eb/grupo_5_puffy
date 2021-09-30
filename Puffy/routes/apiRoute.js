const express = require("express");
const router = express.Router();
const usersApi = require("../api/usersApi")
const productsApi = require("../api/productsApi")

router.use('/users', usersApi);
router.use('/products', productsApi);

module.exports = router;
