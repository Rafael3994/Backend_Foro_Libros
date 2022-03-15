var LibroModel = require('../models/LibroModel');

///////////////////////////////// LIBRO /////////////////////////////////////////
exports.getAllLibros = () => {
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

exports.getLibroById = (idLibro) => {
    try {
        return LibroModel.findById(idLibro).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.newLibro = (nombre, autor, descripcion, fecha_publicacion, paginas, caratula, capitulos,) => {
    try {
        return LibroModel.create({
            nombre: nombre,
            autor: autor,
            descripcion: descripcion,
            fecha_publicacion: fecha_publicacion,
            paginas: paginas,
            caratula: caratula,
            capitulos: capitulos
        }).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.deleteLibro = (idLibro) => {
    try {
        return LibroModel.deleteOne({ _id: idLibro }).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error)
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.editLibro = async (idLibro, nombre, autor, descripcion, fecha_publicacion, paginas, caratula, capitulos) => {
    try {
        const libro = await LibroModel.findOne({ _id: idLibro });
        nombre === "" ? nombre = libro.nombre : nombre = nombre;
        autor === "" ? autor = libro.autor : autor = autor;
        descripcion === "" ? descripcion = libro.descripcion : descripcion = descripcion;
        fecha_publicacion === "" ? fecha_publicacion = libro.fecha_publicacion : fecha_publicacion = fecha_publicacion;
        paginas === "" ? paginas = libro.paginas : paginas = paginas;
        caratula === "" ? caratula = libro.caratula : caratula = caratula;
        capitulos === "" ? capitulos = libro.capitulos : capitulos = capitulos;
        const filter = { _id: idLibro };
        const update = { nombre: nombre, autor: autor, descripcion: descripcion, fecha_publicacion: fecha_publicacion, paginas: paginas, caratula: caratula, capitulos: capitulos };
        return LibroModel.findOneAndUpdate(filter, update);
    } catch (error) {
        return Promise.reject(error);
    }
}
/////////////////////////////////////////////////////////////////////////////////
////////////////////////////// COMENTARIO LIBRO /////////////////////////////////
exports.getAllComentariosLibro = (idLibro) => {
    try {
        return LibroModel.findById(idLibro, 'comentarios').then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.newcomentarioLibro = (idUser, idLibro, comentarioDesc) => {
    try {
        return LibroModel.findOneAndUpdate({ _id: idLibro }, {
            $addToSet: {
                comentarios: [{
                    comentario: {
                        idUser: idUser,
                        comentarioDesc: comentarioDesc
                    }
                }]
            }
        }).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}
/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CAPITULO //////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////
////////////////////////////// COMENTARIO CAPITULO //////////////////////////////