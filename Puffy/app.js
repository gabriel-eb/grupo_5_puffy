// Paquetes
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require('cookie-parser');


// Imports locales
const rutaMain = require("./routes/mainRoute");
const rutaProducts = require("./routes/productsRoute");
const rutaUsers = require("./routes/usersRoute");
const rutaCarts = require("./routes/cartsRoute");
const rutaApi = require("./routes/apiRoute");
const recordarSession = require('./middlewares/recordarSessionMiddleware');
const PORT = process.env.PORT || 3030;

// app.set("views", __dirname + '/carpetaViews');
app.set("view engine", "ejs");

// Middlewares
// app.use(morgan(':method :url :status :response-time ms'));
app.use(morgan('dev', { skip: (req, res) => req.url.match('(jpg|png|ico|css|svg)$') }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSIONSEC || "pUff7",
    resave: false,
    saveUninitialized: false
}));
app.use(recordarSession);
// Login MW
app.use((req, res, next) => {
    res.locals.sessionId = req.session.userId;
    next();
});


// Rutas
app.use("/", rutaMain);
app.use("/productos", rutaProducts);
app.use("/users", rutaUsers);
app.use("/cart", rutaCarts);
app.use("/api", rutaApi);

// Demo Error 500
app.get("/error", (req, res, next) => {
    let err = new Error('Not page found');
    err.message = 'Problema interno.'
    err.status = 500;
    next(err);
});

// ************ error handler ************
// Handle 400
app.use((req, res) => {
    let error = new Error('Not page found');
    error.message = 'Págino no encotrada.'
    error.status = 404;
    res.status(404).render('error400', { error });
});
// Handle 500
app.use(function (error, req, res, next) {
    console.log(error);
    error.message = 'Error del servidor. Vuelva a intendar más tarde.'
    res.status(500 || error.status).render('error500', { error });
});


app.listen(PORT, () => {
    console.log("Escuchando en http://localhost:" + PORT + "/");
});