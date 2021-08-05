// Paquetes
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require('cookie-parser');

// Rutas
const rutaMain = require("./routes/mainRoute");
const rutaProducts = require("./routes/productsRoute");
const rutaUsers = require("./routes/usersRoute");
const PORT = process.env.PORT || 3030;

// app.set("views", __dirname + '/carpetaViews');
app.set("view engine", "ejs");

// Middlewares
// app.use(morgan(':method :url :status :response-time ms'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "pUff7",
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.locals.sessionId = req.session.userId;
    next();
});


app.use("/", rutaMain);
app.use("/productos", rutaProducts);
app.use("/users", rutaUsers);


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

app.listen(PORT, () => {
    console.log("Escuchando en http://localhost:" + PORT + "/");
});