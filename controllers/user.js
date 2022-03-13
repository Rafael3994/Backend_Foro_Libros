var UserService = require('../services/user');


exports.getAll = async function (req, res, next) {
    try {
        const users = await UserService.getAll();
        if(users.length === 0){
            //TODO: mirar para traducir
            return res.status(200).json('No hay user en la Base de datos.');
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
}

