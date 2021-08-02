const {body}=require('express-validator')

const validations=[
    body('first_name').notEmpty().withMessage('Debes de escribir tu nombre'),
    body('last_name').notEmpty().withMessage('Debes de escribir tu apellido'),
    body('email').isEmail().withMessage('Debes de escribir tu email'),
    body('category').notEmpty().withMessage('Elige tu tipo de usuario'),
    body('password').isLength({min:6}).withMessage('Debes de escribir una contraseña con al menos 6 carácteres'),
]

module.exports=validations;
