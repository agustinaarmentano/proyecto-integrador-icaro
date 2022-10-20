const express = require('express');
const app = express();

const bodyParser = require('body-parser')
// config
const port = 3000;
app.listen(port, 'localhost', () => {
    console.log('corriendo en el puerto '+ port )
})
// app use
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json);

require('./routes/routes')(app);
