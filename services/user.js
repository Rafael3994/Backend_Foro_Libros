var UserModel = require('../models/UserModel');

exports.getAll = () => {
    try {
        return UserModel.find({}).then((res) => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        });
    } catch (error) {
        return error;
    }
}