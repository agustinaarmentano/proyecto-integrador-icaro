const db = require('../models/index');
const Usuarios = db.usuarios;

const bcrypt = require('bcrypt');

class AuthController {
    constructor() {}

    login(req, res) {
        const usuario = req.body.usuario;
        const password = req.body.password;

        return Usuarios.findOne({where: { usuario: usuario}})
        .then(async (user) => {
            console.log(user.password)
            if(!user) res.status(404).send({msg: 'el usuario no existe'});
            const match = await bcrypt.compare(password, user.password);
            console.log(match)
            if(match) {
                req.session = user;
                res.status(200).send({login: 'ok'});
            } else res.status(400).send({login: 'error'});
        })
        .catch((err) => console.log(err))
    }

    async create(req, res) {
        console.log(req.body)
        if(req.body.password === req.body.password_repeat){
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
        } else {
            res.send({msg:'las contraseñas no coinciden'});
        }
    }
}
module.exports = AuthController;