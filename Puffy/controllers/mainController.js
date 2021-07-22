//

const{validationResult}=require('express-validator');

const controller = {
    index: (req, res) => {
        res.status(200).render("index");
    },
    carrito: (req, res) => {
        res.status(200).render("carrito");
    },
    login: (req, res) => {
        res.status(200).render("login");
     },
    signup: (req, res) => {
        res.status(200).render("signup");
     },

     // POST

     processSignup: (req, res) => {
          const resultValidation=validationResult(req);

          console.log(resultValidation);
         
         if(resultValidation.errors.length>0){
             return res.render('signup',{
                 errors:resultValidation.mapped(),
             });
          }

         res.redirect('/');
        
     },
};

module.exports = controller;
