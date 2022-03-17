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
                    return Promise.resolve(false);
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

exports.deleteComentarioLibro = (idLibro, idComentario) => {
    try {
        return LibroModel.findOne({ _id: idLibro })
            .then(libro => {
                if (!libro) {
                    return Promise.resolve(false);
                }
                let cometarioFound = false
                libro.comentarios.forEach(comentarios => {
                    if (comentarios._id.toString() === idComentario) {
                        comentarios.remove();
                        libro.save();
                        cometarioFound = true
                    }
                })
                if (cometarioFound) {
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
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
            .then(libro => {
                if (!libro) {
                    return Promise.resolve(false);
                }
                for (let index = 0; index < libro.capitulos.length; index++) {
                    if (libro.capitulos[index]._id.toString() === idCapitulo) {
                        return Promise.resolve(libro.capitulos[index]);
                    }
                }
                return Promise.resolve(false);
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
                    capitulo: {
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

exports.editCapitulo = async (idLibro, idCapitulo, nombre, paginas) => {
    try {
        return LibroModel.findOne({ _id: idLibro })
            .then(libro => {
                if (!libro) {
                    return Promise.resolve(false);
                }
                let capituloFound = false
                libro.capitulos.forEach(capitulos => {
                    if (capitulos._id.toString() === idCapitulo) {
                        nombre === "" ? nombre = capitulos.capitulo.nombreCap : nombre = nombre;
                        paginas === "" ? paginas = capitulos.capitulo.paginas : paginas = paginas;

                        capitulos.capitulo.nombreCap = nombre;
                        capitulos.capitulo.paginas = paginas;
                        console.log(capitulos.capitulo);
                        libro.save();
                        capituloFound = true;
                    }
                })
                if (capituloFound) {
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

exports.deleteCapitulo = (idLibro, idCapitulo) => {
    try {
        return LibroModel.findOne({ _id: idLibro })
            .then(libro => {
                if (!libro) {
                    return Promise.resolve(false);
                }
                let capituloFound = false
                // console.log(libro.capitulos);
                libro.capitulos.forEach(capitulo => {
                    if (capitulo._id.toString() === idCapitulo) {
                        console.log(capitulo);
                        capitulo.remove();
                        libro.save();
                        capituloFound = true;
                    }
                })
                if (capituloFound) {
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
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

exports.newComentariosCap = async (idUser, idLibro, idCapitulo, comentarioDesc) => {
    try {
        const libro = await LibroModel.findOne({ _id: idLibro });
        if (!libro) {
            return Promise.reject(false);
        }
        const newComentario = {
            comentario: {
                idUser: idUser,
                comentarioDesc: comentarioDesc
            }
        }
        let capituloFound = false;
        libro.capitulos.forEach(capitulos => {
            if (capitulos._id.toString() === idCapitulo) {
                capitulos.capitulo.comentarios.push(newComentario);
                libro.save()
                capituloFound = true;
            }
        })
        if (capituloFound) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

exports.editComentarioCap = (idLibro, idCapitulo, idComentario, comentarioDesc) => {
    try {
        return LibroModel.findOne({ _id: idLibro })
            .then(libro => {
                if (!libro) {
                    return Promise.resolve(false);
                }
                let capituloFound = false
                libro.capitulos.forEach(capitulos => {
                    if (capitulos._id.toString() === idCapitulo) {
                        capitulos.capitulo.comentarios.forEach(comentarios => {
                            if (comentarios._id.toString() === idComentario) {
                                comentarios.comentario.comentarioDesc = comentarioDesc;
                                libro.save();
                                capituloFound = true;
                            }
                        })
                    }
                })
                if (capituloFound) {
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
            })
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.deleteComentarioCap = (idLibro, idCapitulo, idComentario) => {
    try {
        return LibroModel.findOne({ _id: idLibro })
            .then(libro => {
                if (!libro) {
                    return Promise.resolve(false);
                }
                let capituloFound = false
                libro.capitulos.forEach(capitulos => {
                    if (capitulos._id.toString() === idCapitulo) {
                        capitulos.capitulo.comentarios.forEach(comentario => {
                            if (comentario._id.toString() === idComentario) {
                                comentario.remove();
                                libro.save();
                                capituloFound = true;
                            }
                        })
                    }
                })
                if (capituloFound) {
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
            })
    } catch (error) {
        return Promise.reject(error);
    }
}