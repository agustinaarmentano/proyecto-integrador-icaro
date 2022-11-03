// const express = require('express');
// const router = express.Router();

const emailController = require('../controllers/emailController');
const usuariosController = require('../controllers/usuariosController');
const AuthController = require('../controllers/authController');
const email = new emailController;
const usuario = new usuariosController;
const auth = new AuthController;

module.exports = (app) => {
    // emails
    app.get('/emails' , async function(req, res) {
        const emails = await email.get();
        res.send(emails)
    })
    app.get('/emails/enviados' , async function(req, res) {
        const emails = await email.getEnviados();
        res.send(emails)
    })
    app.get('/emails/recibidos' , async function(req, res) {
        const emails = await email.getRecibidos();
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
    app.get('/usuarios/:id' , async function(req, res) {
        console.log(req.params.id)
        const user = await usuario.getOne(req.params.id);
        res.send(user)
    })
    app.post('/usuarios' , async function(req, res){
        console.log(req.body)
        nuevo_usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            idusuarios: undefined,
            pais: req.body.pais,
            ciudad: req.body.ciudad
        }
        val = await usuario.create(nuevo_usuario)
        res.send(val)
        console.log(val)
    })
    // auth
    app.post('/login', async function(req, res){
        user = await auth.login(req, res);
        return res.send(user)
    })
}