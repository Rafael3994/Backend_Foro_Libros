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

exports.editComentarioLibro = (idLibro, idComentario, comentarioDesc) => {
    try {
        return LibroModel.findOne({ _id: idLibro })
            .then(libro => {
                if (!libro) {
                    //TODO: Traducir
                    return Promise.resolve('Book was not found');
                }
                let cometarioFound = false
                libro.comentarios.forEach(element => {
                    if (element._id.toString() === idComentario) {
                        element.comentario.comentarioDesc = comentarioDesc;
                        libro.save();
                        cometarioFound = true;
                    }
                });
                if (cometarioFound) {
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
            }).catch(error => {
                return Promise.reject(error);
            })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.deleteComentarioLibro = (idComentario) => {
    try {
        return LibroModel.deleteOne({ _id: idComentario })
            .then(res => {
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
exports.getCapitulo = (idLibro, idCapitulo) => {
    try {
        return LibroModel.findOne({ _id: idLibro })
            .then(res => {
                console.log(res.capitulos.length);
                for (let index = 0; index < res.capitulos.length; index++) {
                    if (res.capitulos[index]._id.toString() === idCapitulo) {
                        console.log(res.capitulos[index]);
                        return Promise.resolve(res.capitulos[index]);
                    }
                }
                return Promise.resolve('No fue bien.');
            }).catch(error => {
                return Promise.reject(error);
            })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.newCapitulo = (idLibro, nombreCap, paginas) => {
    try {
        paginas === "" ? paginas = null : paginas = paginas;
        return LibroModel.findOneAndUpdate({ _id: idLibro }, {
            $addToSet: {
                capitulos: [{
                    capitilo: {
                        nombreCap: nombreCap,
                        paginas: paginas
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

exports.editCapitulo = async (idLibro, idCapitulo, nombreCap, paginas) => {
    try {
        const capitulo = await LibroModel.findOne({ _id: idLibro, _id: idCapitulo });
        nombreCap === "" ? nombreCap = capitulo.nombreCap : nombreCap = nombreCap;
        paginas === "" ? paginas = capitulo.paginas : paginas = paginas;
        return LibroModel.findOneAndUpdate(idCapitulo, {
            nombreCap: nombreCap,
            paginas: paginas
        }).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.deleteCapitulo = (idLibro, idCapitulo) => {
    try {
        return LibroModel.deleteOne({ _id: idLibro, _id: idCapitulo })
            .then(res => {
                return Promise.resolve(res);
            }).catch(error => {
                return Promise.reject(error);
            })
    } catch (error) {
        return Promise.reject(error);
    }
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////// COMENTARIO CAPITULO //////////////////////////////
exports.getAllComentariosCap = (idLibro, idCapitulo) => {
    try {
        return LibroModel.findById(idLibro).then(res => {
            // console.log(res.capitulos);
            for (let index = 0; index < res.capitulos.length; index++) {
                if (res.capitulos[index]._id.toString() === idCapitulo) {
                    // console.log(res.capitulos[index].capitulo.comentarios);
                    const comentarios = res.capitulos[index].capitulo.comentarios;
                    return Promise.resolve(comentarios);
                }
            }
        }).catch(error => {
            return Promise.reject(error);
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.newComentariosCap = (idUser, idLibro, idCapitulo) => {
    try {
        return LibroModel.findOneAndUpdate({ _id: idLibro, _id: idCapitulo }, {
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

exports.editComentarioCap = (idLibro, idComentario, comentarioDesc) => {
    try {
        return LibroModel.find({ _id: idLibro, _id: idComentario }, {
            comentarioDesc: comentarioDesc
        })
            .then(res => {
                return Promise.resolve(res);
            }).catch(error => {
                return Promise.reject(error);
            })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.deleteComentarioCap = (idLibro, idCapitulo, idComentario) => {
    try {
        return LibroModel.deleteOne({ _id: idLibro, _id: idCapitulo, _id: idComentario })
            .then(res => {
                return Promise.resolve(res);
            }).catch(error => {
                return Promise.reject(error);
            })
    } catch (error) {
        return Promise.reject(error);
    }
}