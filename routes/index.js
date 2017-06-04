var express = require('express');
var request = require('request');
var sign = require('./login');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '益禾农人' });
});

router.get('/login', function(req, res, next) {
  if(req.session && req.session.user){
    res.redirect('/member/information.html');
    return;
  }
  res.render('home/login', { title: '登录', error:'' });
}).post('/login', function(req, res) {
  sign.login(req, function(resp){
    var data;
    if(resp && resp.body && resp.body != ''){
      data = JSON.parse(resp.body);
    }
    if(data && data.status == 200){
      req.session.user = data.username;
      var cookies = resp['headers']['set-cookie'];
      if(cookies && cookies.length > 0){
        for (var i = 0; i < cookies.length; i++) {
          res.setHeader('set-cookie', cookies);
        }
      }
      res.redirect('/member/information.html');
    }else{
      if(!data || !data.message){
        data = {
          message:''
        }
      }
      res.render('home/login', {
        title: '登录',
        error: data.message
      });
    }
  }, function(e){
    res.render('home/login', {
      title: '登录',
      error:"账号或密码错误"
    });
  });
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect('/login', { title: '登录' });
});
router.get('/register', function(req, res, next) {
  res.render('home/register', { title: '注册' });
});
router.get('/introduction.html', function(req, res, next) {
  res.render('home/introduction', { title: '商品信息' });
});
router.get('/search.html', function(req, res, next) {
  res.render('home/search', { title: '搜索' });
});
router.get('/success.html', function(req, res, next) {
  res.render('home/success', { title: '个人中心' });
});
router.get('/sort.html', function(req, res, next) {
  res.render('home/sort', { title: '收藏' });
});


module.exports = router;
