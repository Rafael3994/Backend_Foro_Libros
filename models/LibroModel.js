const mongoose = require('mongoose');
const LibroSchema = require('./schemas/LibroSchema');

const LibroModel = mongoose.model("Libros", LibroSchema);

module.exports = LibroModel;