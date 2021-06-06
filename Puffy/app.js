const express = require("express");
const app = express();
const path = require("path");
const PORT = 3030;

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.status(200).sendFile("home.html", { root: "views" });
});

app.listen(PORT, () => {
    console.log("Escuchando en http://localhost:" + PORT + "/");
});
