var express = require('express');
var router = express.Router();
var user = require('../controllers/users');
var articles = require('../controllers/aticles');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user/create_user', user.create_user);
router.get('/aticles/getNowDate', articles.getNowDate)
module.exports = router;
