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

exports.getAllLibrosById = async (req, res, next) => {
    try {
        const libro = await LibroService.getLibroById(req.body.idLibro);
        if (libro) {
            return res.status(200).json(libro);
        }
        const response = i18next.t('notFoundLibro')
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.newLibro = async (req, res, next) => {
    try {
        const { nombre, autor, descripcion, fecha_publicacion, paginas, caratula, capitulos } = req.body;
        const newlibro = await LibroService.newLibro(nombre, autor, descripcion, fecha_publicacion, paginas, caratula, capitulos);
        if (newlibro) {
            return res.status(200).json(newlibro);
        }
        //TODO: Traducir
        return res.status(200).json('No se pudo crear el libro.');
    } catch (error) {
        return res.status(500).json(error);
    }
}