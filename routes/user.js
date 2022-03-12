var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json('Users de Backend Blog de libros.');
});

module.exports = router;

// VER TODOS LOS USERS

// VER UN USER

// CREAR USER

// EDITAR USER

// ELIMINAR USER