const db = require('../models/index');
const Usuarios = db.usuarios;

const bcrypt = require('bcrypt');

class AuthController {
    constructor() {}

    login(req, res) {
        const username = req.body.username;
        const pass = req.body.username;

        return Usuarios.findOne({where: { usuario: username , password : pass }})
        .then((user) => {
            if(!user) res.status(404).send({msg: 'el usuario no existe'});
            bcrypt.compare(pass, user.password)
            .then(math => {
                if(math) res.status(200).send({login: 'ok'});
                else res.status(400).send({login: 'error'});
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
        })
        .catch((err) => console.log(err))
    }
}
module.exports = AuthController;