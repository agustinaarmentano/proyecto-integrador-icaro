// const express = require('express');
// const router = express.Router();

const emailController = require('../controllers/emailController');
const email = new emailController
module.exports = (app) => {
    app.get('/', function(req, res) {
        const saludo = email.saludo();
        res.send(saludo)
    })
    app.get('/emails' , async function(req, res) {
        const emails = await email.get();
        res.send(emails)
    })
    // app.post('/emails' ,() => {
    //     emailController.create()
    // })
}