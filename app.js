var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('express-http-proxy');
var session = require('express-session');
//var proxy = require('http-proxy-middleware');//引入代理中间件


var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./app.config');
var envConfig = config.getEnv();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.engine('html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var env = app.get('env');
console.log("当前环境:", env);
//app.set('trust proxy', '127.0.0.1');
//on('proxyReq', function(proxyReq){ proxyReq.setHeader('cookie', 'sessionid=' + cookieSnippedValue)
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'dms'
}));
app.use(function (req, res, next) {
  if(req.session && req.session.user){
    res.locals.user = req.session.user;
  }else{
    res.locals.user = '';
  }
  next();
});
var isLogin = function(req, res, next) {
  if (req.session && req.session.user){
    return next();
  }
  res.redirect('/login');
};
app.use('/', index);
app.all('/member/**', isLogin);
app.use('/member', users);

//var proxyHost = "system.1g3h.com";
//var proxyHost = "localhost:8700";
var proxyHost = envConfig.apiHost;
console.log("代理服务器API地址：" + proxyHost);
app.use('/api', proxy(proxyHost, {
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    // you can update headers
    proxyReqOpts.headers['X-Requested-With'] = 'XMLHttpRequest';
    proxyReqOpts.headers['Content-Type'] = 'application/json';
    //proxyReqOpts.headers['sid'] = srcReq['sessionId'];
    // you can change the method
    return proxyReqOpts;
  },
  userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
    //if(proxyResData && proxyRes){
    //  data = JSON.parse(proxyResData.toString('utf8'));
    //  return JSON.stringify(data);
    //}
    return proxyResData;
  }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.redirect('/');
  //next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.json(err);
  res.redirect('/');
});

module.exports = app;
