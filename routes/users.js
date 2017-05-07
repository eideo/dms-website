var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('information', { title: '个人中心' });
});
router.get('/information.html', function(req, res, next) {
  res.render('person／information', { title: '个人中心' });
});

module.exports = router;
