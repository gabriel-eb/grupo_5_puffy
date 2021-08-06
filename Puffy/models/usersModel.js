const { join } = require("path");
const { writeFileSync } = require('fs');
const pathUsers = join(__dirname, '../DB/users.json');

function obtenerUsers() {
    return require(pathUsers);
}

function actualizarUsers(users) {
    writeFileSync(pathUsers, JSON.stringify(users, null, 4));
}

function obtenerUser(id) {
    return obtenerUsers().find(user => user.id === id);
}

function borrarUser(id) {
    let users = obtenerUsers();
    users = users.filter(user => user.id !== id);
    actualizarUsers(users);
}

function agregarUser(req) {
    let users = obtenerUsers();
    const newId = users[users.length - 1].id + 1;
    users.push({
        id: newId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        image: req.body.imagen || "default.jpg"
    });
    actualizarUsers(users);
}

// Funcion modificar
function modificarUser(req) {
    const users = obtenerUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    let newUser = req.body;

    if (req.body.image) {
        users[userIndex] = {
            ...users[userIndex],
            ...newUser
        }
    } else {
        users[userIndex] = {
             id: users[userIndex].id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            category: newUser.category,
            image: users[userIndex].image
        }
    }
    actualizarUsers(users);
}

module.exports = {
    obtenerUsers,
    obtenerUser,
    borrarUser,
    agregarUser,
    modificarUser
};