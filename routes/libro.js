var express = require('express');
var router = express.Router();
var LibroController = require('../controllers/libro');
const auth = require('../middleware/auth');

var LibroModel = require('../models/LibroModel');


router.get('/seeder', async function (req, res, next) {
    let libro = await LibroModel.create({
        nombre: 'Nacidos de la bruma: El imperio final',
        autor: 'Brandom Sanderson',
        descripcion: 'Durante mil años, han caído las cenizas y nada florece. Durante mil años, los Skaa han sido esclavizados y viven sumidos en un miedo inevitable. Durante mil años, el Lord Legislador reina con un poder absoluto gracias al terror, a sus poderes y a su inmortalidad. Le ayudan «obligadores» e «inquisidores», junto a la poderosa magia de la alomancia. Pero los nobles a menudo han tenido trato sexual con jóvenes skaa y, aunque la ley lo prohíbe, algunos de sus bastardos han sobrevivido y heredado los poderes alománticos: son los «nacidos de la bruma» (mistborns). Ahora, Kelsier, el «superviviente», el único que ha logrado huir de los Pozos de Hathsin, ha encontrado a Vin, una pobre chica skaa con mucha suerte… Tal vez los dos, unidos a la rebelión que los skaa intentan desde hace mil años, logren cambiar el mundo y la atroz dominación del Lord Legislador.',
        fecha_publicacion: '2006-07-17',
        paginas: 672,
        caratula: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.es%2Fimperio-final-Nacidos-Mistborn-BOLSILLO%2Fdp%2F8498726131&psig=AOvVaw0KaW9IiTA2GGX9TBX3kgTW&ust=1647269595121000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjP1Murw_YCFQAAAAAdAAAAABAD',
        comentarios: [{
            comentario: {
                idUser: '622e21a45729247bb42d2931',
                comentarioDesc: 'Muy buen libro, tengo ganas de empezar con el siguiente'
            }
        },
        {
            comentario: {
                idUser: '622e21a45729247bb42d2931',
                comentarioDesc: 'Increible final, el lord legislador los estaba protegiendo??'
            }
        }],
        capitulos: [
            {
                capitulo: {
                    nombreCap: 'Capitulo 1',
                    comentarios: [{
                        comentario: {
                            idUser: '622e21a45729247bb42d2931',
                            comentarioDesc: 'Muy buen libro, tengo ganas de empezar con el siguiente'
                        }
                    },
                    {
                        comentario: {
                            idUser: '622e21a45729247bb42d2931',
                            comentarioDesc: 'Increible final, el lord legislador los estaba protegiendo??'
                        }
                    }]
                }
            },
            {
                capitulo: {
                    nombreCap: 'Capitulo 2',
                    comentarios: [{
                        comentario: {
                            idUser: '622e21a45729247bb42d2931',
                            comentarioDesc: 'ganas de empezar con el siguiente'
                        }
                    }]
                }
            }
        ]
    });
    res.status(200).json('Libros de Backend Blog de libros.');
});

////////////////////////////////// LIBROS /////////////////////////////////////////
// VER TODOS LOS LIBROS
router.get('/alllibros', LibroController.getAllLibros)

// VER UN LIBRO
router.get('/getlibro', LibroController.getAllLibrosById)

// CREAR LIBRO
router.post('/newlibro', LibroController.newLibro)

// ELIMINAR LIBRO
router.delete('/deletelibro', LibroController.deleteLibro)

// EDITAR LIBRO
router.put('/editlibro', LibroController.editLibro)
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////// COMENTARIOS LIBROS //////////////////////////////////
// VER TODOS LOS COMENTARIOS DE LOS LIBROS
router.get('/comentariolibro/getall', LibroController.getAllComentariosLibro)

// AÑADIR UN COMENTARIO EN UN LIBRO
router.post('/comentariolibro/newcomentario', auth, LibroController.newComentarioLibro)

// EDITAR UN COMENTARIO EN UN LIBRO
// TODO: NO FUNCIONA
router.put('/comentariolibro/editcomentario', LibroController.editComentarioLibro)

// ELIMINAR UN COMENTARIO EN UN LIBRO
// TODO: NO FUNCIONA
router.delete('/comentariolibro/deletecomentario', LibroController.deleteComentarioLibro)


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CAPITULOS ///////////////////////////////////////
// VER CAPITULO
router.get('/capitulo/getcapitulo', LibroController.getCapitulo)

// AÑADIR CAPITULO
// TODO: NO FUNCIONA
router.post('/capitulo/newcapitulo', LibroController.newCapitulo)

// EDITAR CAPITULO
// TODO: NO FUNCIONA
router.put('/capitulo/editcapitulo', LibroController.editCapitulo)

// ELIMINAR CAPITULO
// TODO: NO FUNCIONA
router.delete('/capitulo/deletecapitulo', LibroController.deleteCapitulo)

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////// COMENTARIOS CAPITULOS ///////////////////////////////
// VER TODOS LOS COMENTARIOS DE UN CAPITULO
router.get('/comentariocap/getall', LibroController.getAllComentariosCap)

// AÑADIR UN COMENTARIO DE UN CAPITULO
// TODO: NO FUNCIONA
router.post('/comentariocap/newcomentario', LibroController.newComentarioCap)

// EDITAR UN COMENTARIO DE UN CAPITULO
// TODO: NO FUNCIONA
router.put('/comentariocap/editcomentario', LibroController.editComentarioCap)

// ELIMINAR UN COMENTARIO DE UN CAPITULO
// TODO: NO FUNCIONA
router.delete('/comentariocap/deletecomentario', LibroController.deleteComentarioCap)

///////////////////////////////////////////////////////////////////////////////////

module.exports = router;