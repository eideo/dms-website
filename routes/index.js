var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

router.get('/login.html', function(req, res, next) {
  res.render('home/login', { title: '登录' });
});

router.get('/register.html', function(req, res, next) {
  res.render('home/register', { title: '注册' });
});

module.exports = router;
