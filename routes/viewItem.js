var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('viewItem', { title: '查看商品' });
});

module.exports = router;