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
    secret: process.env.SESSIONSEC || "pUff7",
    resave: false,
    saveUninitialized: false
}));
app.use(recordarSession);
// Login MW
app.use((req, res, next) => {
    res.locals.sessionId = req.session.userId;
    next();
});


// ************ catch 404 and forward to error handler ************
// app.use((req, res, next) => next(createError(404)));

// // ************ error handler ************
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.path = req.path;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// Rutas
app.use("/", rutaMain);
app.use("/productos", rutaProducts);
app.use("/users", rutaUsers);
app.use("/cart", rutaCarts);
app.use("/api", rutaApi);

// Serve static assets if in production
// Use in package.json -> "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix dashboard && npm run build --prefix dashboard"
// if (process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static('dashboard/build'));

//     app.get('/dashboard', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'dashboard', 'build', 'index.html'));
//     });
// }

// API Prueba
// const rutaPrueba =  require('./apiPruebas/routesPrueba');
// app.use('/api',rutaPrueba);

app.listen(PORT, () => {
    console.log("Escuchando en http://localhost:" + PORT + "/");
});