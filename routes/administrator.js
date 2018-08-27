var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('administrator');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('管理员信息维护', pageNumber, result);
    res.render('administrator', renderData);
  });
});

router.get('/customerRoleList', function (req, res, next) {
  var service = new commonService.commonInvoke('administrator');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        customerRoleList: result.content.responseData
      });
    }
  });
});

router.get('/statusList', function (req, res, next) {
  var service = new commonService.commonInvoke('administrator');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        statusList: result.content.responseData
      });
    }
  });
});

router.get('/checkAdministrator', function (req, res, next) {
  var service = new commonService.commonInvoke('checkAdministratorName');
  var parameter = req.query.administratorName;

  service.get(parameter, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        exist: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('administrator');
  var data = {
    administratorID: req.body.administratorID,
    administratorName: req.body.administratorName,
    account: req.body.account,
    cellphone: req.body.cellphone,
    email: req.body.email,
    customerRole: req.body.customerRole,
    status: req.body.status,
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
        err: false,
        data: result.content
      });
    }
  });
});

router.put('/', function(req,res,next){
  var service = new commonService.commonInvoke('administratorApprove');
  var data = {
    administratorID: req.body.administratorID,
    customerRole: req.body.customerRole,
    status: req.body.status,
    loginUser: req.body.loginUser
  };

  service.change(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        data: result.content
      });
    }
  });
});

router.delete('/', function (req, res, next) {
  var service = new commonService.commonInvoke('administrator');
  var administratorID = req.query.administratorID;

  service.delete(administratorID, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        data: result.content
      });
    }
  });
});

module.exports = router;