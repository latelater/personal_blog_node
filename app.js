let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let multer = require('multer'); // v1.0.5
let upload = multer(); // for parsing multipart/form-dataire('multer');
let mongoose = require('mongoose');
let cors = require('cors');
let session = require('express-session');
let mongoStore = require('connect-mongo')(session);

let index = require('./routes/index');
let users = require('./routes/users');

let app = express();
let options = {
	server: {
		socketOptions: {
			keepAlive: 300000, connectTimeoutMS: 30000
		}
	},
	replset: {
		socketOptions: {
			keepAlive: 300000, connectTimeoutMS: 30000
		}
	}
};

// 连接mongodb
mongoose.connect('mongodb://127.0.0.1/personal_blog_node', options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, '链接错误'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', './images/favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/personal_blog_node', upload.array(), function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(session({
    secret: 'personal_blog_node',
    store: new mongoStore({
        url: 'mongodb://127.0.0.1/personal_blog_node',
        collection: 'session'
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
