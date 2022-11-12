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

exports.getUser = (idUser) => {
    try {
        return UserModel.findById(idUser).then((res) => {
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
        const user = await UserModel.find({ email: email });
        if (user.length === 0) {
            return UserModel.create({ name: name, email: email, password: password, roles: ['user'] })
                .then(res => {
                    console.log(res);
                    return Promise.resolve(res);
                }).catch(error => {
                    return Promise.reject(error);
                })
        }
        return Promise.resolve(false);
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.login = async (email, password) => {
    try {
        const user = await UserModel.findByCredentials(email, password);
        if (!user) {
            return Promise.resolve(false);
        }
        const UserWithToken = await user.generateAuthToken();
        return Promise.resolve(UserWithToken);
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.logout = async (email, token) => {
    try {
        return UserModel.updateOne({ email: email }, {
            $pull: {
                tokens: { token: [token] },
            }
        })
            .then(user => { return Promise.resolve(user) })
            .catch(error => { return Promise.reject(error) })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.deleteuser = (idUser) => {
    try {
        return UserModel.deleteOne({ _id: idUser }).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error)
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.newadmin = (idUser) => {
    try {
        return UserModel.findOneAndUpdate({ _id: idUser }, {
            $set: { roles: ['user', 'admin'] }
        }).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.neweditor = (idUser) => {
    try {
        return UserModel.findOneAndUpdate({ _id: idUser }, {
            $set: { roles: ['user', 'editor'] }
        }).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.newmoderador = (idUser) => {
    try {
        return UserModel.findOneAndUpdate({ _id: idUser }, {
            $set: { roles: ['user', 'moderador'] }
        }).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.edituser = async (idUser, name, email, password, photo) => {
    try {
        const user = await UserModel.findOne({ _id: idUser });
        name === "" ? name = user.name : name = name
        email === "" ? email = user.email : email = email
        password === "" ? password = user.password : password = await bcrypt.hash(password, SALTROUNDS);
        photo === "" ? photo = user.photo : photo = photo
        // Compruebo que el email no exista
        const userEmail = await UserModel.find({ email: email });
        if (userEmail.length <= 1) {
            const filter = { _id: idUser };
            const update = { name: name, email: email, password: password, photo: photo };
            return UserModel.findOneAndUpdate(filter, update);
        }
        return Promise.reject(false);
    } catch (error) {
        return Promise.reject(error);
    }
}