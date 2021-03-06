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
            const message = i18next.t('failedGetComentarios')
            return res.status(401).json(message);
        } else if (comentarios.comentarios.length !== 0) {
            return res.status(200).json(comentarios);
        } else {
            const message = i18next.t('withoutComentarios')
            return res.status(200).json(message);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.newComentarioLibro = async (req, res, next) => {
    try {
        const idUser = req.user._id.toString();
        const { idLibro, comentarioDesc } = req.body;
        const newComentario = await LibroService.newcomentarioLibro(idUser, idLibro, comentarioDesc);
        if (!newComentario) {
            const message = i18next.t('failedNewComentarios')
            return res.status(401).json(message);
        }
        const message = i18next.t('succesfulNewComentarios')
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.editComentarioLibro = async (req, res, next) => {
    try {
        const { idLibro, idComentario, comentarioDesc } = req.body;
        const editComentarioLibro = await LibroService.editComentarioLibro(idLibro, idComentario, comentarioDesc);
        if (!editComentarioLibro) {
            const message = i18next.t('failedEditComentarios')
            return res.status(401).json(message);
        }
        const message = i18next.t('succesfulEditComentarios')
        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.deleteComentarioLibro = async (req, res, next) => {
    try {
        const { idLibro, idComentario } = req.body;
        const deleteComentario = await LibroService.deleteComentarioLibro(idLibro, idComentario);
        if (!deleteComentario) {
            const message = i18next.t('failedDeleteComentarios')
            return res.status(401).json(message);
        }
        const message = i18next.t('succesfulDeleteComentarios')
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// CAPITULO /////////////////////////////////////
exports.getCapitulo = async (req, res, next) => {
    try {
        const { idLibro, idCapitulo } = req.body;
        const capitulo = await LibroService.getCapitulo(idLibro, idCapitulo);
        if (capitulo) {
            return res.status(200).json(capitulo);
        }
        const message = i18next.t('notFoundCapitulo');
        return res.status(401).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.newCapitulo = async (req, res, next) => {
    try {
        const { idLibro, nombreCap, paginas } = req.body;
        const newCapitulo = await LibroService.newCapitulo(idLibro, nombreCap, paginas);
        if (!newCapitulo) {
            const message = i18next.t('failedNewCapitulo');
            return res.status(200).json(message);
        }
        const message = i18next.t('succesfulNewCapitulo');
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.editCapitulo = async (req, res, next) => {
    try {
        const { idLibro, idCapitulo, nombreCap, paginas } = req.body;
        const editCapitulo = await LibroService.editCapitulo(idLibro, idCapitulo, nombreCap, paginas);
        if (!editCapitulo) {
            const message = i18next.t('failedEditCapitulo');
            return res.status(200).json(message);
        }
        const message = i18next.t('succesfulEditCapitulo');
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteCapitulo = async (req, res, next) => {
    try {
        const { idLibro, idCapitulo } = req.body;
        const deleteCapitulo = await LibroService.deleteCapitulo(idLibro, idCapitulo);
        if (!deleteCapitulo) {
            const message = i18next.t('failedDeleteCapitulo');
            return res.status(401).json(message);
        }
        const message = i18next.t('succesfulDeleteCapitulo');
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////// COMENTARIO CAPITULO //////////////////////////////
exports.getAllComentariosCap = async (req, res, next) => {
    try {
        const { idLibro, idCapitulo } = req.body;
        const comentarios = await LibroService.getAllComentariosCap(idLibro, idCapitulo);
        if (comentarios === false) {
            const message = i18next.t('failedGetComentarios')
            return res.status(401).json(message);
        } else if (comentarios.length !== 0) {
            return res.status(200).json(comentarios);
        } else {
            const message = i18next.t('withoutComentarios')
            return res.status(200).json(message);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.newComentarioCap = async (req, res, next) => {
    try {
        const idUser = req.user._id.toString();
        const { idLibro, idCapitulo, comentarioDesc } = req.body;
        const newcomentarios = await LibroService.newComentariosCap(idUser, idLibro, idCapitulo, comentarioDesc);
        if (!newcomentarios) {
            const message = i18next.t('failedNewComentarios')
            return res.status(401).json(message);
        }
        const message = i18next.t('succesfulNewComentarios')
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.editComentarioCap = async (req, res, next) => {
    try {
        const { idLibro, idCapitulo, idComentario, comentarioDesc } = req.body;
        const editComentarioCap = await LibroService.editComentarioCap(idLibro, idCapitulo, idComentario, comentarioDesc);
        if (!editComentarioCap) {
            const message = i18next.t('failedEditComentarios')
            return res.status(401).json(message);
        }
        const message = i18next.t('succesfulEditComentarios')
        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.deleteComentarioCap = async (req, res, next) => {
    try {
        const { idLibro, idCapitulo, idComentario } = req.body;
        const deleteComentario = await LibroService.deleteComentarioCap(idLibro, idCapitulo, idComentario);
        if (!deleteComentario) {
            const message = i18next.t('failedDeleteComentarios')
            return res.status(401).json(message);
        }
        const message = i18next.t('succesfulDeleteComentarios')
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}