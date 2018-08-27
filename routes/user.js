var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('user', {title: '用户信息编辑'});
});

router.get('/detail', function(req, res, next) {
  var service = new commonService.commonInvoke('administrator');
  var administratorID = req.query.administratorID;

  service.get(administratorID, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  });
});

router.put('/', function (req, res, next) {
  var service = new commonService.commonInvoke('administrator');
  var data = {
    administratorID: req.body.administratorID,
    administratorName: req.body.userName,
    account: req.body.account,
    cellphone: req.body.cellphone,
    email: req.body.email,
    password: req.body.password,
    loginUser: req.body.loginUser
  };

  service.change(data, function (result) {
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