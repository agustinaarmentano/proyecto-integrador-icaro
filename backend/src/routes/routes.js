// const express = require('express');
// const router = express.Router();

const emailController = require('../controllers/emailController');
const email = new emailController
module.exports = (app) => {
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
}