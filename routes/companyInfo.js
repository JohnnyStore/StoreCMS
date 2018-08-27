var express = require('express');
var router = express.Router();
var commonService = require('../service/commonService');

router.get('/', function(req, res, next) {
  res.render('companyInfo', { title: '企业信息维护'});
});

router.get('/detail', function(req, res, next) {
  var service = new commonService.commonInvoke('companyInfo');

  service.get('1', function (result) {
    if (result.err || !result.content.result) {
      res.json({
        err: true,
        msg: result.msg
      });
    } else {
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  })
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('companyInfo');
  var data = {
    infoID: req.body.infoID,
    introduction: req.body.introduction,
    contact: req.body.contact,
    loginUser: req.body.loginUser
  };

  service.add(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage
      });
    }
  });
});

module.exports = router;