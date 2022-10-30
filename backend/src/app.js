const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const { Sequelize, Model } = require("sequelize");

const sequelize = new Sequelize(
 "correos_db",
 "icaro",
 "icaro2022",
 {
    host: 'localhost',
    port:'3306',
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const bodyParser = require('body-parser');

const controllers = require('./controllers/emailController');

// config
const port = 4000;
app.listen(port, 'localhost', () => {
    console.log('corriendo en el puerto '+ port )
});
var router = require('./routes/routes.js');
router(app);

// app use
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json);
