const {body}=require('express-validator')

const validations1=[
    body('first_name').notEmpty().withMessage('Debes de escribir tu nombre'),
    body('last_name').notEmpty().withMessage('Debes de escribir tu apellido'),
    body('email').isEmail().withMessage('Debes de escribir tu email'),
    body('category').notEmpty().withMessage('Elige tu tipo de usuario'),
]

module.exports=validations1;
