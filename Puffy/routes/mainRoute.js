const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");

//agrego para signup
const path=require('path');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images/avatars');
    },
    filename:(req,file,cb)=>{
        console.log(file);
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null,filename);
    }
})
const uploadFile=multer({storage});

const {body}=require('express-validator')

const validations=[
    body('first_name').notEmpty().withMessage('Debes de escribir tu nombre'),
    body('last_name').notEmpty().withMessage('Debes de escribir tu apellido'),
    body('email').notEmpty().isEmail().withMessage('Debes de escribir tu email'),
    body('category').notEmpty().withMessage('Elige tu tipo de usuario'),
    body('password').notEmpty().isLength({min:6}).withMessage('Debes de escribir una contraseña con al menos 6 carácteres'),
]
//

router.get("/", controller.index);
router.get("/carrito", controller.carrito);
router.get("/login", controller.login);
router.get("/signup", controller.signup);

//Agrego método post para signup
router.post("/signup",uploadFile.single('image'), /*validations,*/ controller.processSignup);
//

module.exports = router