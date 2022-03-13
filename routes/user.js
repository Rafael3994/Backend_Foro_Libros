var express = require('express');
var router = express.Router();

var UserModel = require('../models/UserModel');
var UserController = require('../controllers/user');


/* GET home page. */
router.get('/seeder', async function(req, res, next) {
  let user = await UserModel.create({ name: 'user1', email: 'user@gmail.com', password: 'test12345&', roles: ['user']})
  res.status(200).json('Users de Backend Blog de libros.');
});

// VER TODOS LOS USERS
router.get('/allUsers', UserController.getAll);

// REGISTER USER
router.post('/register', UserController.register);

// REGISTER USER
router.post('/register', UserController.register);

// LOGIN USER
router.post('/login', UserController.login);


// VER UN USER
// EDITAR USER
// ELIMINAR USER


module.exports = router;