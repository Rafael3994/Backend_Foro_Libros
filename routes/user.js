var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');
var auth = require('../middleware/auth');
var admin = require('../middleware/admin');
var { validateData } = require('./../middleware/validate');
var { userRegisterSchema, userLoginSchema, userParamsIdSchema } = require('./../schema/request-schema');


// VER TODOS LOS USERS (admin)
router.get('/allusers', [auth, admin], UserController.getAll);

// VER UN USER (user, admin)
router.get('/getuser', auth, UserController.getUser);

// REGISTER USER
router.post('/register', validateData(userRegisterSchema), UserController.register);

// LOGIN USER (user, admin)
router.post('/login', validateData(userLoginSchema), UserController.login);

// LOGOUT (user, admin)
router.get('/logout', auth, UserController.logout);

// ELIMINAR USER BY ID (admin)
router.delete('/deleteuserbyid', [auth, admin, validateData(userParamsIdSchema)], UserController.deleteuserbyid);

// ELIMINAR USER BY TOKEN (user, admin)
router.delete('/deleteuser', auth, UserController.deleteuser);

// AÑADIR ROLE ADMIN A UN USER (admin)
router.put('/newadmin', [auth, admin, validateData(userParamsIdSchema)], UserController.newadmin);

// EDITAR USER (user, admin)
router.put('/edituser', auth, UserController.edituser);

module.exports = router;