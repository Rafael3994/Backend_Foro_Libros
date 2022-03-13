var express = require('express');
var router = express.Router();

const User = require('./user');
const Libro = require('./libro');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json('Backend Blog de libros.');
});

router.use('/user', User);
router.use('/libro', Libro);


module.exports = router;
