// const Email = require('../models/emails')
const db = require('../models/index');
const Email = db.emails

class EmailController {
    constructor() {}
    
    create(email){
        return Email.create(email)
        .then((res) => res)
        .catch((err)=> err)
    }
    get() {
        return Email.findAll()
        .then((data) => data)
        .catch((err) => console.log(err))
    }
}
module.exports = EmailController;