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
};

module.exports = controller;
