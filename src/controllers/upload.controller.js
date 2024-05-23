const multer = require('multer');

const uplaod = multer({ storage: multer.memoryStorage() });

module.exports = uplaod;
