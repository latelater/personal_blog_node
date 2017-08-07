let express = require('express');
let router = express.Router();
let user = require('../controllers/users');
let articles = require('../controllers/aticles');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
console.log("fa sheng le sha")
router.post('/user/create_user', user.create_user);
router.get('/aticles/getNowDate', articles.getNowDate);
module.exports = router;
