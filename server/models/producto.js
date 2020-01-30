//Importamos la libreria mongoose
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

//Podremos crear el esquema de una tabla en nuestra base de datos cafe
let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    precioUni: {
        type: Number,
        required: [true, 'El precio es requerido']
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

//Exportamos los modulos 
module.exports = mongoose.model('Producto', productoSchema);