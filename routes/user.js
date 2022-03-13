var express = require('express');
var router = express.Router();

var UserModel = require('../models/UserModel');
var UserController = require('../controllers/user');


/* GET home page. */
router.get('/seeder', async function(req, res, next) {
  let user = await UserModel.create({ name: 'user1', email: 'user@gmail.com', password: 'test12345&', roles: ['user']})
  res.status(200).json('Users de Backend Blog de libros.');
});

router.get('/', function(req, res, next) {
  res.json('user');
});


// VER TODOS LOS USERS
router.get('/allUsers', UserController.getAll);

// VER UN USER

// REGISTER USER
router.post('/register', UserController.register)

// EDITAR USER

// ELIMINAR USER




module.exports = router;