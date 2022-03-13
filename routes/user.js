var express = require('express');
var router = express.Router();

var UserModel = require('../models/UserModel');


/* GET home page. */
router.get('/seeder', async function(req, res, next) {
  let user = await UserModel.create({ name: 'user1', email: 'user@gmail.com', password: 'test12345&', roles: ['user']})
  res.status(200).json('Users de Backend Blog de libros.');
});

module.exports = router;

// VER TODOS LOS USERS

// VER UN USER

// CREAR USER

// EDITAR USER

// ELIMINAR USER