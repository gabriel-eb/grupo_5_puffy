const express = require("express");
const app = express();
const path = require("path");
<<<<<<< HEAD:app.js
const PORT = process.env.PORT || 80;
=======
const rutaMain = require("./routes/main");
const rutaProducts = require("./routes/products");
const rutaUsers = require("./routes/users");
const PORT = process.env.PORT || 3030;
>>>>>>> sprint3:Puffy/app.js

// app.set("views", __dirname + '/carpetaViews');
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", rutaMain);
app.use("/productos", rutaProducts);
app.use("/users", rutaUsers);

app.listen(PORT, () => {
    console.log("Escuchando en http://localhost:" + PORT + "/");
});
