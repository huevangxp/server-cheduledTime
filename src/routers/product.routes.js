const controller = require('../controllers/product.controller')

module.exports = (app)=>{
    app.get('/products', controller.getCountProduct)
    app.get('/product/:id', controller.getProductDetail)
}