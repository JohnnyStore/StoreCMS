var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('province');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('省份维护', pageNumber, result);
    res.render('province', renderData);
  });
});

router.get('/checkProvince', function (req, res, next) {
  var service = new commonService.commonInvoke('checkProvinceName');
  var parameter = req.query.provinceName;

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

router.get('/provinceForCountry', function (req, res, next) {
  var service = new commonService.commonInvoke('provinceForCountry');
  var parameter = req.query.countryID;

  service.get(parameter, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        provinceList: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('province');
  var data = {
    countryID: req.body.countryID,
    provinceNameCN: req.body.provinceNameCN,
    provinceNameEN: req.body.provinceNameEN,
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
  var service = new commonService.commonInvoke('province');
  var data = {
    provinceID: req.body.provinceID,
    countryID: req.body.countryID,
    provinceNameCN: req.body.provinceNameCN,
    provinceNameEN: req.body.provinceNameEN,
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
  var service = new commonService.commonInvoke('province');
  var provinceID = req.query.provinceID;

  service.delete(provinceID, function (result) {
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