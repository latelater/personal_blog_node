let express = require('express');
let router = express.Router();
let user = require('../controllers/users');
let articles = require('../controllers/articles');
let category = require('../controllers/category');
let authorization = require('../utils/authorization')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user/create_user', user.create_user);
router.post('/user/login', user.login);
router.post('/user/user_info', authorization.requireLogin, user.user_info);
router.post('/articles/createArticle', authorization.requireLogin, articles.createArticle);
router.post('/category/createCategory', authorization.requireLogin, category.createCategory);
module.exports = router;
