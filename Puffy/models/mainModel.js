const userModel = require('../models/usersModel');

function signup(req) {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        return res.render('signup', {
            errors: resultValidation.mapped(),
            oldData: req.body,
        });
    }

    let userInDB = userModel.findByField('email', req.body.email);

    if (userInDB) {
        return res.render('signup', {
            errors: {
                email: {
                    msg: 'Este email ya está registrado'
                }
            },
            oldData: req.body
        });
    }

    let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        // if(filename=!''){
        avatar: req.file.filename || "default.jpg",
        // }


    }

    userModel.create(userToCreate);
}

module.exports = { signup, }