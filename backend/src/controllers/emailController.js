// const Email = require('../models/emails')
const db = require('../models/index');
const Email = db.emails

class EmailController {
    constructor() {}
    
    // async create(){
    //     const email = await Email.create({ texto: "primer email", fecha:'24-10-2022' ,recibido: false, enviado: true });
    //     console.log(email)
    // }
    saludo(){
        return ('hello world');
    }
    get() {
        return Email.findAll()
        .then((data) => data)
        .catch((err) => console.log(err))
    }
}
module.exports = EmailController;