var UserService = require('../services/user');
const i18next = require('i18next');


exports.getAll = async (req, res, next) => {
    try {
        const users = await UserService.getAll();
        if (users.length === 0) {
            const response = i18next.t('withoutUsers')
            return res.status(200).json(response);
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
        const response = i18next.t('failedRegister');
        return res.status(401).json(response)
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = { ...req.body };
        const user = await UserService.login(email, password);
        if (!user) {
            const response = i18next.t('notLogin')
            return res.status(401).json(response);
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
        const response = i18next.t('notFoundUser')
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.logout = async (req, res, next) => {
    try {
        const response = await UserService.logout(req.user.email, req.token);
        if (response.modifiedCount === 1) {
            const message = i18next.t('successfulLogout')
            return res.status(200).json(message);
        }
        const message = i18next.t('failedLogout')
        return res.status(401).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteuserbyid = async (req, res, next) => {
    try {
        const response = await UserService.deleteuser(req.body.idUser);
        if (response.deletedCount === 1) {
            const message = i18next.t('succesfulDeleteUser')
            return res.status(200).json(message);
        }
        const message = i18next.t('failedDeleteUser')
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteuser = async (req, res, next) => {
    try {
        const response = await UserService.deleteuser(req.user._id);
        if (response.deletedCount === 1) {
            const message = i18next.t('succesfulDeleteUser')
            return res.status(200).json(message);
        }
        const message = i18next.t('failedDeleteUser')
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.newadmin = async (req, res, next) => {
    try {
        const response = await UserService.newadmin(req.body.idUser);
        if (response) {
            const message = i18next.t('succesfulNewAdmin')
            return res.status(200).json(message);
        }
        const message = i18next.t('failedNewAdmin')
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.neweditor = async (req, res, next) => {
    try {
        const response = await UserService.neweditor(req.body.idUser);
        if (response) {
            // TODO: use i18
            const message = 'succesfulNewEditor'
            return res.status(200).json(message);
        }
        // TODO: use i18
        const message = 'failedNewEditor'
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.newmoderador = async (req, res, next) => {
    try {
        const response = await UserService.newmoderador(req.body.idUser);
        if (response) {
            // TODO: use i18
            const message = 'succesfulNewModerador'
            return res.status(200).json(message);
        }
        // TODO: use i18
        const message = 'failedNewModerador'
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.edituser = async (req, res, next) => {
    try {
        const { name, email, password, photo } = req.body;
        const response = await UserService.edituser(req.user._id, name, email, password, photo);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.editrolesuser = async (req, res, next) => {
    try {
        const { idUser, role } = req.body;
        const response = await UserService.editroleuser(idUser, role);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}