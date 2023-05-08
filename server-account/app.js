
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const cookieSession = require('cookie-session')
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/customers');
const { initialize } = require('express-openapi');
const swaggerUi = require('swagger-ui-express');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ credentials: true, preflightContinue: false, origin: ['http://localhost:3001'] }))
app.use(cookieSession({
    name: 'virtual-office',
    keys: ['secure', 'virtual-office'],
    httpOnly: false
  }))
  app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use('/', [indexRouter,usersRouter]);


initialize({
    app,
    apiDoc: require('./src/api-doc'),
    paths:"./src/api/"
})
app.use(
    "/account-api/api-documentation",
    swaggerUi.serve,
  //   (req, res,next) => {
       
  //     if(req.session.isNew) {
  //       res.send("Dokumentasi hanya untuk yang memiliki otorisasi sebagai developer")
  //     }
  //     next()
  //  },
    swaggerUi.setup(null,{
      swaggerOptions: {
        url: "http://localhost:3000/account-api/api-docs",
      },
    }),
  );

module.exports = app;
