//Importamos la libreria mongoose
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

//Podremos crear el esquema de una tabla en nuestra base de datos cafe
let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    }
});

//Exportamos los modulos
module.exports = mongoose.model('Categoria', categoriaSchema);