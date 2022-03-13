const mongoose = require("mongoose");
const { Schema } = mongoose;

const LibroSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fecha_publicacion: {
    type: String,
    required: true
  },
  paginas: {
    type: Number,
    required: true
  },
  caratula: {
    type: String,
    required: false,
    default: null
  },
  // TODO: mirar populate
  comentarios: [{
    comentario: {
      idUser: { 
        type: Schema.Types.ObjectId,
        ref: 'Users'
      },
      comentarioDesc: {
        type: String
      },
      fecha_publicacion: {
        type: Date,
        default: Date.now
      }
    }
  }],
  capitulos: [{
    capitulo: {
      nombreCap: {
        type: String,
        default: null
      },
      paginas: {
        type: Number,
        default: null
      },
      comentarios: [{
        comentario: {
          idUser: { type: String },
          comentarioDesc: {
            type: String
          },
          fecha_publicacion: {
            type: Date,
            default: Date.now
          }
        }
      }]
    }
  }]
});

LibroSchema.methods.simpleLibro = function () {
  const libro = this.toObject();
  delete libro.comentarios;
  delete libro.capitulos.capitulo.comentarios;
  delete libro.__v;
  return libro;
}

LibroSchema.methods.toJSON = function () {
  const libro = this.toObject();
  delete libro.__v;
  return libro;
}

const LibroModel = mongoose.model('Libros', LibroSchema);

module.exports = LibroSchema;