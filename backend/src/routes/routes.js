const express = require('express');
const router = express.Router();

module.exports = (app) => {
    app.get('/' ,() => {
        console.log('agus');
    })
}