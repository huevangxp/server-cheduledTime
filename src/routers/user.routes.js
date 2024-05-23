const controller = require('../controllers/user.controller')

module.exports = (app) => {
    app.post('/create-user', controller.createUser)
    // app.post('/cancel-user', controller.cancelUserCreation)
    app.get('/select-user', controller.selectUser)
    app.get('/delete/:id', controller.deleteUser)
    app.get('/select-user/:id', controller.selectUserId)
}