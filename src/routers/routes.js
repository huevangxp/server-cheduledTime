const exress = require('express')

const router = exress.Router();

const userRoute = require('./user.routes')

userRoute(router);

module.exports = router;