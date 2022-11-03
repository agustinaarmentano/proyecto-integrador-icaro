// const Email = require('../models/emails')
const db = require('../models/index');
const Usuarios = db.usuarios

class UsuariosController {
    constructor() {}

    get() {
        return Usuarios.findAll()
        .then((data) => data)
        .catch((err) => console.log(err))
    }
    getOne(id) {
        return Usuarios.findOne({ where: { idusuarios: id } })
        .then((data) => data)
        .catch((err) => console.log(err))
    }
    create(usuario){
        return Usuarios.create(usuario)
        .then((res) => res)
        .catch((err)=> err)
    }
}
module.exports = UsuariosController;