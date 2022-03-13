var UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
var SALTROUNDS = 10;

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

exports.register = async (email, password, name) => {
    try {
        password = await bcrypt.hash(password, SALTROUNDS);
        // Mira que no haya usuario con el mismo email
        const user = await UserModel.find({email: email});
        if(user.length === 0){
            return UserModel.create({ name: name, email: email, password: password, roles: ['user'] })
                .then(res => {
                    console.log(res);
                    return Promise.resolve(res);
                }).catch(error => {
                    return Promise.reject(error);
                })
        }
        return Promise.reject('No se pudo crear.');
    } catch (error) {
        return Promise.reject(error);
    }
}