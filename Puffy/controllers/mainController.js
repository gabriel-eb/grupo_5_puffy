const controller = {
    index: (req, res) => {
        res.status(200).sendFile("index.html", { root: "views" });
    },
    carrito: (req, res) => {
        res.status(200).sendFile("carrito.html", { root: "views" });
    },
    login: (req, res) => {
        res.status(200).sendFile("login.html", { root: "views" });
    },
    signup: (req, res) => {
        res.status(200).sendFile("signup.html", { root: "views" });
    },
};

module.exports = controller;
