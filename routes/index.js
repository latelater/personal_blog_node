let express = require('express');
let router = express.Router();
let user = require('../controllers/users');
let articles = require('../controllers/articles');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user/create_user', user.create_user);
router.post('/user/login', user.login);
router.get('/articles/getNowDate', articles.getNowDate);
module.exports = router;
