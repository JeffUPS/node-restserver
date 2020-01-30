//Importamos la libreria express
const express = require('express');
const app = express();

//Importamos la libreria bcrypt
const bcrypt = require('bcrypt');

//Importamos la libreia underscore
const _ = require('underscore');

//Exportamos los diferentes js con los que estamos trabajando
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

//Utilizamos el metodo GET 
app.get('/usuario', function(req, res) {

    //Podremos dar un valor desde donde queremos observar los datos
    let desde = req.query.desde || 0;
    desde = Number(desde);

    //Podremos dar un valor del limite hasta donde queremos observar los datos
    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Por medio de esta funcion podremos observar tanto los campos solicitados como ver los datos en el rango indicado
    Usuario.find({}, 'nombre email role google img')
        .limit(limite)
        .skip(desde)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //Realizara un conteo de los datos que tenemos en nuestra base de datos
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios

                });
            });
        });

});

//Utilizamos el metodo Post para enviar datos a nuestra base de datos
app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //Por medio de bcrypt encriptaremos nuestra contraseña
        password: bcrypt.hashSync(body.password, 10),
        //password: body.password,
        role: body.role,
        img: body.img
    });

    //Por medio de esta funcion guardaremos los datos en nuestra base de datos
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

//Realizamos lo mismo que el metodo POST de la parte superior pero para nuestra tabla categoria
app.post('/categoria', function(req, res) {

    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

//Realizamos lo mismo que el metodo POST de la parte superior pero para nuestra tabla producto
app.post('/producto', function(req, res) {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        disponible: body.disponible
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    });

});

//Utilizaremos el metodo PUT para poder actualizar datos de nuestra base de datos
//El cual nos mostrara por su id
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //Solucion no eficiente
    // delete body.password;
    // delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//Utilizaremos el Metodo DELETE para poder borrar datos de nuestra base de datos
//Podremos borrar por medio del id
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioborrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioborrado == null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioborrado
        });
    });
});

//Exportamos los modulos
module.exports = app;