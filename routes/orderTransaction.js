var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('orderTransaction', { title: '订单明细信息' });
});

module.exports = router;