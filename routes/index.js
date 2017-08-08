let express = require('express');
let router = express.Router();
let user = require('../controllers/users');
let articles = require('../controllers/articles');
let category = require('../controllers/category');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user/create_user', user.create_user);
router.post('/user/login', user.login);
router.post('/user/user_info', user.user_info);
router.post('/articles/createArticle', articles.createArticle);
router.post('/category/createCategory', category.createCategory);
module.exports = router;
