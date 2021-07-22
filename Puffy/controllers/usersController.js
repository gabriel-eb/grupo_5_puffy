//const modelo = require('../models/users');

const controller = {
  vistaModificar: (req, res) => {
  res.status(200).render("users/editar");
 },
   
 };

 module.exports = controller;


