var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

var User = require('./models/users');
var Scene = require('./models/scenes');
var Object = require('./models/objects');
console.log(User);

User.sync().then(()=>{
  //Scene.belongsTo(User,{foreignKey: 'createdBy'});
  Scene.sync().then(()=>{
   // Object.belongsTo(Scene,{foreignKey: 'SceneId'});
    Object.sync();
  })
})

var indexRouter = require('./routes/index');
var makingRouter = require('./routes/making');
var sceneRouter = require('./routes/scenes');
var addLibraryRouter = require('./routes/addLibrary');
var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/making',makingRouter);
app.use('/scenes',sceneRouter);
app.use('/addLibrary',addLibraryRouter);
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
