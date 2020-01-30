//importamos la libreria mongoose
const mongoose = require('mongoose');
//Importamos la libreria uniqueValidator con la cual podremos que no se repitan datos en nuestra base
const uniqueValidator = require('mongoose-beautiful-unique-validation');

//Imponemos los roles que queremos que los usuarios ingresen y sino ingresan otros nos mostrara un mensaje
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};


let Schema = mongoose.Schema;

//Podremos crear el esquema de una tabla en nuestra base de datos cafe
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es requirido']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

//Exportamos los modulos de nuestra base de datos
module.exports = mongoose.model('Usuario', usuarioSchema);