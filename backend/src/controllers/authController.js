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

    async create(req, res) {
        const user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            usuario: req.body.usuario,
            password: req.body.password
        }
        user.password = await bcrypt.hash(req.body.password, 8);

        return Usuarios.create(user)
        .then((res) => res)
        .catch((err)=> err)
    }
}
module.exports = AuthController;