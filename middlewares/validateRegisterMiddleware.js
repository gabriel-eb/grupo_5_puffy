const {body}=require('express-validator')

const validations=[
    body('firstName').notEmpty().withMessage('Debes de escribir tu nombre'),
    body('lastName').notEmpty().withMessage('Debes de escribir tu apellido'),
    body('email').isEmail().withMessage('Debes de escribir tu email'),
    body('admin').notEmpty().withMessage('Elige tu tipo de usuario'),
    body('password').isLength({min:6}).withMessage('Debes de escribir una contraseña con al menos 6 carácteres'),
]

module.exports = validations;
