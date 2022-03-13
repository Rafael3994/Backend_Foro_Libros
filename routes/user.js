var express = require('express');
var router = express.Router();

var UserModel = require('../models/UserModel');
var UserController = require('../controllers/user');
var auth = require('../middleware/auth');

/* GET home page. */
router.get('/seeder', async function(req, res, next) {
  let user = await UserModel.create({ name: 'user1', email: 'user@gmail.com', password: 'test12345&', roles: ['user']})
  res.status(200).json('Users de Backend Blog de libros.');
});

// VER TODOS LOS USERS
router.get('/allusers', auth, UserController.getAll);

// VER UN USER
router.get('/getuser', auth, UserController.getUser);

// REGISTER USER
router.post('/register', UserController.register);

// LOGIN USER
router.post('/login', UserController.login);

// LOGOUT
router.get('/logout', auth, UserController.logout);



// EDITAR USER
// ELIMINAR USER


module.exports = router;