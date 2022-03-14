var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');
var auth = require('../middleware/auth');

// VER TODOS LOS USERS (admin)
router.get('/allusers', auth, UserController.getAll);

// VER UN USER (user, admin)
router.get('/getuser', auth, UserController.getUser);

// REGISTER USER
router.post('/register', UserController.register);

// LOGIN USER (user, admin)
router.post('/login', UserController.login);

// LOGOUT (user, admin)
router.get('/logout', auth, UserController.logout);

// ELIMINAR USER BY ID (admin)
router.delete('/deleteuserbyid', auth, UserController.deleteuserbyid);

// ELIMINAR USER BY TOKEN (user, admin)
router.delete('/deleteuser', auth, UserController.deleteuser);

// AÑADIR ROLE ADMIN A UN USER (admin)
router.put('/newadmin', auth, UserController.newadmin);

// EDITAR USER (user, admin)
router.put('/edituser', auth, UserController.edituser);

module.exports = router;