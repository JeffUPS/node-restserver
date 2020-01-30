//Importamos la libreria express
const express = require('express');
const app = express();

//Importamos la libreria body-parser
const bodyParser = require('body-parser');
require('./config/config')

//Importamos la libreria mongoose
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Exportamos las rutas con las cuales podremos hacer los diferentes metodos GET, POST, PUT, DELETE
app.use(require('./routes/usuario'))

//Por medio de esta funcion verificamos la conexion con nuestra base de datos
mongoose.connect(process.env.URLDB = urlDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');

});

//Por medio de esta funcion podremos utilizar algun puerto disponible o el puerto 3000
app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});