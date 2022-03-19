var express = require('express');
var router = express.Router();
const i18next = require('i18next');

const User = require('./user');
const Libro = require('./libro');
const Lenguage = require('./lenguage');

/* GET home page. */
router.get('/', function (req, res, next) {
  const response = i18next.t('key')
  res.status(200).json(`Backend Blog de libros. ${response}`);
});

router.use('/lenguage', Lenguage);
router.use('/user', User);
router.use('/libro', Libro);


module.exports = router;
