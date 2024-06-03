const exress = require('express')

const router = exress.Router();

const userRoute = require('./user.routes')
const productRoute = require('./product.routes')

userRoute(router);
productRoute(router)

module.exports = router;