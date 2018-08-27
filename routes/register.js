var express = require('express');
var router = express.Router();
var commonService = require('../service/commonService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: '用户注册', layout: null });
});

router.get('/checkUserName', function(req, res, next) {
  var service = new commonService.commonInvoke('checkUserName');
  var param = '/' + req.query.userName;

  service.get(param, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        exist: result.content.responseData
      });
    }
  })
});

router.get('/checkCellphone', function(req, res, next) {
  var service = new commonService.commonInvoke('checkCellphone');
  var param = '/' + req.query.cellphone;

  service.get(param, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        exist: result.content.responseData
      });
    }
  })
});

router.get('/checkEmail', function(req, res, next) {
  var service = new commonService.commonInvoke('checkEmail');
  var param = '/' + req.query.email;

  service.get(param, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        exist: result.content.responseData
      });
    }
  })
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('register');
  var data = {
    administratorName: req.body.fullName,
    account: req.body.userName,
    cellphone: req.body.cellphone,
    email: req.body.email,
    password: req.body.password,
    loginUser: req.body.userName
  };

  service.add(data, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.msg
      });
    }
  })
});

module.exports = router;