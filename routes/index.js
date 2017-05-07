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
router.get('/introduction.html', function(req, res, next) {
  res.render('home/introduction', { title: '商品信息' });
});
router.get('/pay.html', function(req, res, next) {
  res.render('home/pay', { title: '订单支付' });
});
router.get('/search.html', function(req, res, next) {
  res.render('home/search', { title: '搜索' });
});
router.get('/shopcart.html', function(req, res, next) {
  res.render('home/shopcart', { title: '搜索' });
});

module.exports = router;
