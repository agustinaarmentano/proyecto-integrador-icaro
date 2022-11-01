// const express = require('express');
// const router = express.Router();

const emailController = require('../controllers/emailController');
const usuariosController = require('../controllers/usuariosController');
const email = new emailController;
const usuario = new usuariosController;

module.exports = (app) => {
    // emails
    app.get('/emails' , async function(req, res) {
        const emails = await email.get();
        res.send(emails)
    })
    app.post('/emails' , async function(req, res){
        console.log(req.body)
        nuevo_email = {
            texto:  req.body.texto,
            fecha: new Date(),
            recibido: false,
            enviado:true
        }
        val = await email.create(nuevo_email)
        res.send(val)
        console.log(val)
    })
    // usuarios
    app.get('/usuarios' , async function(req, res) {
        const usuarios = await usuario.get();
        res.send(usuarios)
    })
}