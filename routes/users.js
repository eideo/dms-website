var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/information.html', function(req, res, next) {
  res.render('person/information', { title: '个人中心' });
});

module.exports = router;
