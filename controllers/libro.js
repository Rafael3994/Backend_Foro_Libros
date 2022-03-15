var LibroService = require('../services/libro');
const i18next = require('i18next');

//////////////////////////// LIBROS /////////////////////////////////////
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
        const response = i18next.t('failedNewLibro')
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteLibro = async (req, res, next) => {
    try {
        const { idLibro } = req.body;
        const deleteLibro = await LibroService.deleteLibro(idLibro);
        if (deleteLibro.deletedCount === 1) {
            const message = i18next.t('succesfulDeleteLibro')
            return res.status(200).json(message);
        }
        const message = i18next.t('failedDeleteLibro')
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.editLibro = async (req, res, next) => {
    try {
        const { idLibro, nombre, autor, descripcion, fecha_publicacion, paginas, caratula, capitulos } = req.body;
        const editLibro = await LibroService.editLibro(idLibro, nombre, autor, descripcion, fecha_publicacion, paginas, caratula, capitulos);
        if (editLibro) {
            return res.status(200).json(editLibro);
        }
        const message = i18next.t('failedEditLibro')
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// COMENTARIO LIBRO ////////////////////////////////
exports.getAllComentariosLibro = async (req, res, next) => {
    try {
        const comentarios = await LibroService.getAllComentariosLibro(req.body.idLibro);
        if (comentarios === null) {
            // TODO: Traducir
            const message = i18next.t('withoutComentarios')
            return res.status(401).json('Algo salio mal.');
        } else if (comentarios.comentarios.length !== 0) {
            return res.status(200).json(comentarios);
        } else {
            // TODO: Traducir
            const message = i18next.t('withoutComentarios')
            return res.status(200).json(message);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.newcomentarioLibro = async (req, res, next) => {
    try {
        console.log(req.user._id.toString());
        const idUser = req.user._id.toString();
        const { idLibro, comentarioDesc } = req.body;
        const newComentario = await LibroService.newcomentarioLibro(idUser, idLibro, comentarioDesc);
        if (!newComentario) {
            // TODO: Traducir
            return res.status(200).json('No se añadio el comentario.');
        }
        // TODO: Traducir
        return res.status(200).json('Comentario añadido.');
    } catch (error) {
        return res.status(500).json(error);
    }
}




/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// CAPITULO /////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////// COMENTARIO CAPITULO //////////////////////////