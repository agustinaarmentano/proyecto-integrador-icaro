const db = require('../models/index');
const Usuarios = db.usuarios;

const bcrypt = require('bcrypt');

class AuthController {
    constructor() {}

    login(req, res) {
        const usuario = req.body.usuario;
        return Usuarios.findOne({where: { usuario: usuario}})
        .then(async (user) => {
            if(!user) res.status(404).send({msg: 'el usuario no existe'});
            console.log(user.salt)
            const hash = await bcrypt.hash(req.body.password, user.salt);
            const match = user.password === hash;
            // const match = await bcrypt.compare(user.password, hash);

            console.log('hash', hash);
            console.log('user pass', user.password)

            if(match) {
                req.session = user;
                res.status(200).send({login: 'ok'});
            } else res.status(400).send({login: 'error'});
        })
        .catch((err) => console.log(err))
    }

    async create(req, res) {
        if(req.body.password === req.body.password_repeat){
            const user = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                pais: req.body.pais,
                ciudad: req.body.ciudad,
                usuario: req.body.usuario,
                password: req.body.password,
                salt: ''
            }
            const saltRounds = 10;

            const salt = await bcrypt.genSalt(saltRounds)
            const hash = await bcrypt.hash(req.body.password, salt)

            user.password = hash;
            user.salt = salt;
            return Usuarios.create(user)
            .then((res) => res)
            .catch((err)=> err)
        } else {
            res.send({msg:'las contraseñas no coinciden'});
        }
    }
}
module.exports = AuthController;