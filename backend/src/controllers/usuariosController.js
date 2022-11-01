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
}
module.exports = UsuariosController;