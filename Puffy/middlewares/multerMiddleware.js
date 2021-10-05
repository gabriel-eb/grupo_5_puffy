const path = require('path');
const multer = require('multer');

module.exports = multer({
    storage: multer.memoryStorage(),
    limits: 5 * 1024 * 1024 // 5mb
});