var express = require('express');
var router = express.Router();
var LibroController = require('../controllers/libro');

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
                    nombreCap: '1',
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
                },
            }
        ]
    });
    res.status(200).json('Libros de Backend Blog de libros.');
});

// VER TODOS LOS LIBROS
router.get('/alllibros', LibroController.getAllLibros)

// VER UN LIBRO
router.get('/getlibro', LibroController.getAllLibrosById)

// CREAR LIBRO
router.post('/newlibro', LibroController.newLibro)

// EDITAR LIBRO

// ELIMINAR LIBRO


module.exports = router;