var LibroService = require('../services/libro');
const i18next = require('i18next');

exports.getAllLibros = async (req, res, next) => {
    try {
        const libros = await LibroService.getAllLibros();
        if (libros.length === 0) {
            const response = i18next.t('withoutLibros')
            return res.status(200).json(response);
        }
        return res.status(200).json(libros);
    } catch (error) {
        return res.status(500).json(error);
    }
}