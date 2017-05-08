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
router.get('/success.html', function(req, res, next) {
  res.render('home/success', { title: '个人中心' });
});
router.get('/sort.html', function(req, res, next) {
  res.render('home/sort', { title: '收藏' });
});



/** ------users--------------*/
router.get('/information.html', function(req, res, next) {
  res.render('person/information', { title: '个人资料' });
});
router.get('/user-index.html', function(req, res, next) {
  res.render('person/user-index', { title: '个人中心' });
});
router.get('/address.html', function(req, res, next) {
  res.render('person/address', { title: '地址管理' });
});
router.get('/bill.html', function(req, res, next) {
  res.render('person/bill', { title: '个人账单' });
});
router.get('/billlist.html', function(req, res, next) {
  res.render('person/billlist', { title: '账单明细' });
});
router.get('/bindphone.html', function(req, res, next) {
  res.render('person/bindphone', { title: '绑定手机' });
});
router.get('/blog.html', function(req, res, next) {
  res.render('person/blog', { title: '新闻页面' });
});
router.get('/bonus.html', function(req, res, next) {
  res.render('person/bonus', { title: '我的红包' });
});
router.get('/cardlist.html', function(req, res, next) {
  res.render('person/cardlist', { title: '我的银行卡' });
});
router.get('/cardmethod.html', function(req, res, next) {
  res.render('person/cardmethod', { title: '银行卡绑定' });
});
router.get('/change.html', function(req, res, next) {
  res.render('person/change', { title: '退换货管理' });
});
router.get('/collection.html', function(req, res, next) {
  res.render('person/collection', { title: '收藏管理' });
});
router.get('/comment.html', function(req, res, next) {
  res.render('person/comment', { title: '评价管理' });
});
router.get('/commentlist.html', function(req, res, next) {
  res.render('person/commentlist', { title: '发表评论' });
});
router.get('/consultation.html', function(req, res, next) {
  res.render('person/consultation', { title: '商品咨询' });
});
router.get('/coupon.html', function(req, res, next) {
  res.render('person/coupon', { title: '优惠券' });
});
router.get('/email.html', function(req, res, next) {
  res.render('person/email', { title: '验证邮箱' });
});
router.get('/foot.html', function(req, res, next) {
  res.render('person/foot', { title: '我的足迹' });
});
router.get('/idcard.html', function(req, res, next) {
  res.render('person/idcard', { title: '实名认证' });
});
router.get('/logistics.html', function(req, res, next) {
  res.render('person/logistics', { title: '物流' });
});
router.get('/news.html', function(req, res, next) {
  res.render('person/news', { title: '我的消息' });
});
router.get('/order.html', function(req, res, next) {
  res.render('person/order', { title: '订单管理' });
});
router.get('/orderinfo.html', function(req, res, next) {
  res.render('person/orderinfo', { title: '订单详情' });
});
router.get('/password.html', function(req, res, next) {
  res.render('person/password', { title: '修改密码' });
});
router.get('/pointnew.html', function(req, res, next) {
  res.render('person/pointnew', { title: '我的积分' });
});
router.get('/points.html', function(req, res, next) {
  res.render('person/points', { title: '积分明细' });
});
router.get('/question.html', function(req, res, next) {
  res.render('person/question', { title: '安全问题' });
});
router.get('/record.html', function(req, res, next) {
  res.render('person/record', { title: '钱款去向' });
});
router.get('/refund.html', function(req, res, next) {
  res.render('person/refund', { title: '退换货' });
});
router.get('/safety.html', function(req, res, next) {
  res.render('person/safety', { title: '安全设置' });
});
router.get('/setpay.html', function(req, res, next) {
  res.render('person/setpay', { title: '支付密码' });
});
router.get('/suggest.html', function(req, res, next) {
  res.render('person/suggest', { title: '意见反馈' });
});
router.get('/wallet.html', function(req, res, next) {
  res.render('person/wallet', { title: '账户余额' });
});
router.get('/walletlist.html', function(req, res, next) {
  res.render('person/walletlist', { title: '账户明细' });
});

module.exports = router;
