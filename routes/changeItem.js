var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('changeItem', { title: '修改商品' });
});

module.exports = router;