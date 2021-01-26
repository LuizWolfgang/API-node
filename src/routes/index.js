const express = require('express');
const routes = express.Router()
const UserController = require('../controllers')

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.put('/users/:database/:id', UserController.update)
routes.delete('/users/:database/:id', UserController.delete)

 module.exports = routes