const express = require('express');
const app = express();
//const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');


app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

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
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios

                });
            });
        });

});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //password: bcrypt.hashSync(body.password, 10),
        password: body.password,
        role: body.role,
        img: body.img
    });

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

module.exports = app;