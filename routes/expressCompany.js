var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('expressCompany');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('快递公司维护', pageNumber, result);
    res.render('expressCompany', renderData);
  });
});

router.get('/all', function (req, res, next) {
  var service = new commonService.commonInvoke('expressCompany');

  service.getAll(function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        dataList: result.content.responseData
      });
    }
  });
});

router.get('/checkCompany', function (req, res, next) {
  var service = new commonService.commonInvoke('checkCompanyName');
  var parameter = req.query.companyName;

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
  var service = new commonService.commonInvoke('expressCompany');
  var data = {
    companyCN: req.body.companyCN,
    companyEN: req.body.companyEN,
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
  var service = new commonService.commonInvoke('expressCompany');
  var data = {
    companyID: req.body.companyID,
    companyCN: req.body.companyCN,
    companyEN: req.body.companyEN,
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
  var service = new commonService.commonInvoke('expressCompany');
  var companyID = req.query.companyID;

  service.delete(companyID, function (result) {
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