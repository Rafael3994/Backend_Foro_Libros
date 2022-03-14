var LibroModel = require('../models/LibroModel');

exports.getAllLibros = (req, res, next) => {
    try {
        return LibroModel.find().then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}