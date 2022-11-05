// const express = require('express');
// const router = express.Router();

const emailController = require('../controllers/emailController');
const usuariosController = require('../controllers/usuariosController');
const AuthController = require('../controllers/authController');
const email = new emailController;
const usuario = new usuariosController;
const auth = new AuthController;
const bcrypt = require('bcrypt');

const blockLogin = (req, res, next) => {
    console.log('session', req.session)
    if (req.session) return res.status(403).send({msg: "ALREADY_LOGGED_IN"})
    next()
}

const blockLogout = (req, res, next) => {
    if (!req.session) return res.status(403).send({msg: "NOT_LOGGED_IN"})
    next()
}

const hashPassword = async (req, res, next) => {
    if(req.body.password){
        console.log('entra al if')
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
    next();
}

module.exports = (app) => {
    // app.use((req, res, next) => {
    //     if (req.session) next();
    //     res.status(401).send({error: true, msg: "SESSION_EXPIRED"});
    // })

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
        nuevo_email = {
            texto:  req.body.texto,
            destinatario: req.body.destinatario,
            fecha: new Date(),
            recibido: req.body.recibido,
            enviado: req.body.enviado,
            idusuarios: req.body.idusuarios
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
    app.post('/registro', async function(req, res){
        user = await auth.create(req, res);
        return res.send(user)
    });
    app.post('/login', async function(req, res){
        user = await auth.login(req, res);
        return res.send(user)
    });
    app.get('/logout', blockLogout, async function(req, res){
        req.session.destroy(function(err) {
            // cannot access session here
            if (err) return res.send(err);
            return res.status(200).send({ msg: "LOGOUT_OK"});

        })
    });
}