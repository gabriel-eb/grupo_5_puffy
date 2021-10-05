const { check } = require('express-validator')

module.exports = [
    check('firstName').isLength({ min: 2 })
        .withMessage('Debes de escribir tu nombre con más de 1 carácter.'),
    check('lastName').isLength({ min: 2 })
        .withMessage('Debes de escribir tu apellido con más de 1 carácter.'),
    check('mobile').isNumeric().isLength({ min: 10 })
        .withMessage('El número de móvil debe tener 10 dígitos.'),
    check('email').isEmail().isLength({ min: 5 })
        .withMessage('Debes de escribir tu email.'),
    check('admin').notEmpty()
        .withMessage('Elige tu tipo de usuario.'),
    check('password')
        .trim()
        .isLength({ min: 8, max: 16 })
        .withMessage('Debes de escribir una contraseña con 8 a 16 carácteres.')
]
