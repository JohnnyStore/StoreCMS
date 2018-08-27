var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var optionType = req.query.option;
  res.render('addItemSuccess', { title: '商品维护成功', optionType: optionType });
});

module.exports = router;