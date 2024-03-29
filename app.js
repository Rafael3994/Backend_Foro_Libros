var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose');
var router = require('./routes/router');
const i18next = require('i18next');

i18nextInit();
connect();

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.status(500).json();
});

function listen() {
}


function connect() {
  try {
    mongoose.connection
      .on("error", console.log)
      .on("disconnected", connect)
      .once("open", listen);
    var connection = require('./config/mongoose');
    return connection;
  } catch (e) {
    console.log(e.message);
  }
}

async function i18nextInit() {
  await i18next.init({
    lng: 'es',
    debug: false,
    resources: {
      en: {
        translation: {
          'lengChange': 'Lenguage was changed.',
          'withoutUsers': 'There are no users in the database.',
          'notLogin': 'You can not make login.',
          'notFoundUser': 'Not found user',
          'successfulLogout': 'logout',
          'failedLogout': "Could not logout.",
          'succesfulDeleteUser': 'Delete user.',
          'failedDeleteUser': 'Could not delete user',
          'succesfulNewAdmin': 'Added as admin.',
          'failedNewAdmin': 'Could not added as admin.',
          'failedRegister': 'Could not register',
          'withoutLibros': 'Without books.',
          'notFoundLibro': 'Not found book.',
          'failedNewAdmin': 'Could not make new book.',
          'succesfulDeleteLibro': 'Delete book.',
          'failedDeleteLibro': 'Could not delete book',
          'failedEditLibro': 'Could not edit book.',
          'withoutComentarios': 'There are no comments.',
          'longestName': 'Put longest Name.',
          'notFoundCapitulo': 'Not found chapter.',
          'failedNewCapitulo': 'The chapter was not added.',
          'succesfulNewCapitulo': "Added chapter.",
          'failedEditCapitulo': 'The chapter was not edited.',
          'succesfulEditCapitulo': 'Edited chapter.',
          'failedDeleteCapitulo': 'The chapter was not deleted.',
          'succesfulDeleteCapitulo': "Deleted chapter.",
          'failedGetComentarios': 'Something went wrong.',
          'failedNewComentarios': 'Comment was not added.',
          'succesfulNewComentarios': 'Comment added.',
          'failedEditComentarios': 'Comment was not edited.',
          'succesfulEditComentarios': 'Edited comment.',
          'failedDeleteComentarios': 'Comment was not deleted.',
          'succesfulDeleteComentarios': 'Delete comment.'
        }
      },
      es: {
        translation: {
          'lengChange': 'Se cambio el idioma.',
          'withoutUsers': 'No hay usuarios en la Base de datos.',
          'notLogin': 'No pudiste iniciar sesion.',
          'notFoundUser': 'Usuario no encontrado.',
          'successfulLogout': 'logout',
          'failedLogout': "No se pudo cerrar sesion.",
          'succesfulDeleteUser': 'Usuario eliminado.',
          'failedDeleteUser': 'No se pudo borrar el usuario',
          'succesfulNewAdmin': 'Se añadio como admin.',
          'failedNewAdmin': 'No se pudo añadir como admin.',
          'failedRegister': 'No has podido iniciar sesion.',
          'withoutLibros': 'No hay libros.',
          'notFoundLibro': 'No se encontro el libro.',
          'failedNewLibro': 'No se pudo crear el libro.',
          'succesfulDeleteLibro': 'Libro eliminado.',
          'failedDeleteLibro': 'No se pudo eliminar el libro.',
          'failedEditLibro': 'No se pudo modicar el libro.',
          'withoutComentarios': 'No hay comentarios.',
          'longestName': 'Pon un nombre mas largo.',
          'notFoundCapitulo': 'No se encontro el capitulo.',
          'failedNewCapitulo': 'El capitulo no se añadio.',
          'succesfulNewCapitulo': "Capitulo añadido.",
          'failedEditCapitulo': 'El capitilo no se modifico.',
          'succesfulEditCapitulo': 'Capitulo modificado.',
          'failedDeleteCapitulo': 'No se borro el capitulo',
          'succesfulDeleteCapitulo': 'Capitulo borrado.',
          'failedGetComentarios': 'Algo fue mal.',
          'failedNewComentarios': 'No se añadio el comentario.',
          'succesfulNewComentarios': 'Comentario añadido.',
          'failedEditComentarios': 'El comentario no se edito.',
          'succesfulEditComentarios': 'Comentario modificado.',
          'failedDeleteComentarios': 'No se puedo borrar el comentario.',
          'succesfulDeleteComentarios': 'Comentario borrado.'
        }
      },
      cat: {
        translation: {
          'lengChange': "L'idioma ha canviat.",
          'withoutUsers': 'No hi ha usuaris a la Base de dades.',
          'notLogin': 'No has pogut iniciar sessio.',
          'notFoundUser': 'Usuario no trobat.',
          'successfulLogout': 'logout',
          'failedLogout': "No s'ha pogut tanca sessio.",
          'succesfulDeleteUser': 'Usuari esborrat.',
          'failedDeleteUser': "No s'ha pogut esborrar l'usuari.",
          'succesfulNewAdmin': "S'ha afegit com a admin.",
          'failedNewAdmin': "No s'ha pogut afegit com a admin.",
          'failedRegister': 'No has pogut iniciar sessio.',
          'withoutLibros': 'Sense llibres.',
          'notFoundLibro': 'Llibre no trobar.',
          'failedNewAdmin': "No s'ha pogut crear al nou llibre.",
          'succesfulDeleteLibro': 'Llibre esborrat.',
          'failedDeleteLibro': "No s'ha pogut esborrar el llibre.",
          'failedEditLibro': "No s'ha pogut modificar el llibre.",
          'withoutComentarios': 'No hi ha comentaris.',
          'longestName': 'Possa un nom mes llarg.',
          'notFoundCapitulo': "No s'ha trobat el capitol.",
          'failedNewCapitulo': "No s'ha afegit el capitol.",
          'succesfulNewCapitulo': "Capitol afegit.",
          'failedEditCapitulo': "El capitol no s'ha modificat.",
          'succesfulEditCapitulo': 'Capitol modificat.',
          'failedDeleteCapitulo': "Capitol no esborrat.",
          'succesfulDeleteCapitulo': "Capitol esborrat.",
          'failedGetComentarios': 'Alguna cosa a sortit malament.',
          'failedNewComentarios': 'Comentari no afegit.',
          'succesfulNewComentarios': 'Comentari afegit.',
          'failedEditComentarios': "El comentari no s'ha editat.",
          'succesfulEditComentarios': 'Comentari modificat.',
          'failedDeleteComentarios': "El comentari no s'ha esborrat.",
          'succesfulDeleteComentarios': 'Comentari esborrat.'
        }
      }
    }
  }
  );
}

module.exports = app;
