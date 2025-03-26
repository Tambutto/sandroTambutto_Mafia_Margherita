require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const userCookie = require('./middlewares/usersCookie');
const userLoginMiddleware = require('./middlewares/userLogin');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/products')
// const productCartlRouter = require('./routes/productCartl')
// const loginRouter = require('./routes/login');
// const registerRouter = require('./routes/register');
const adminRouter = require('./routes/admin');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Servir el directorio 'public/images'

app.use(methodOverride('_method'));

// Configuración del middleware de sesiones
app.use(session({
  secret: process.env.SECRET, // Clave secreta para firmar la cookie de la sesión
  resave: false,        // No guardar la sesión si no ha sido modificada
  saveUninitialized: true, // Guardar la sesión aunque no esté inicializada
  cookie: { secure: false } // Solo enviar la cookie en conexiones HTTPS (debería ser true en producción con HTTPS)
}));


// Middleware para definir res.locals.userLogin
app.use((req, res, next) => {
  res.locals.user = req.session.userLogin || null; // Define user globalmente desde la sesión
  next();
});


app.use(userCookie); // middleware de cookie
app.use(userLoginMiddleware);

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
