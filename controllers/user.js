var UserService = require('../services/user');


exports.getAll = async (req, res, next) => {
    try {
        const users = await UserService.getAll();
        if (users.length === 0) {
            //TODO: mirar para traducir
            return res.status(200).json('No hay user en la Base de datos.');
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.register = async (req, res, next) => {
    try {
        const { email, name, password } = { ...req.body };
        const user = await UserService.register(email, password, name);
        if (user) {
            const userLogin = await UserService.login(email, password);
            return res.status(200).json(userLogin)
        }
        return res.status(401).json({})
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = { ...req.body };
        const user = await UserService.login(email, password);
        if (!user) {
            //TODO: mirar para traducir
            return res.status(401).json('No pudiste iniciar sesion.');
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await UserService.getUser(req.user._id);
        if (user) {
            return res.status(200).json(user);
        }
        //TODO: mirar para traducir
        return res.status(200).json('No se encontro.');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.logout = async (req, res, next) => {
    try {
        const response = await UserService.logout(req.user.email, req.token);
        if (response.modifiedCount === 1) {
            //TODO: mirar para traducir
            return res.status(200).json('Logout');
        }
        //TODO: mirar para traducir
        return res.status(401).json('Logout fallido.');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteuserbyid = async (req, res, next) => {
    try {
        const response = await UserService.deleteuser(req.body.idUser);
        if (response.deletedCount === 1) {
            //TODO: mirar para traducir
            return res.status(200).json('El usuario se elimino.');
        }
        //TODO: mirar para traducir
        return res.status(200).json('No se pudo eliminar.');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteuser = async (req, res, next) => {
    try {
        const response = await UserService.deleteuser(req.user._id);
        if (response.deletedCount === 1) {
            //TODO: mirar para traducir
            return res.status(200).json('El usuario se elimino.');
        }
        //TODO: mirar para traducir
        return res.status(200).json('No se pudo eliminar.');
    } catch (error) {
        return res.status(500).json(error);
    }
}