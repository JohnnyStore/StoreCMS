var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('size');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('商品尺码维护', pageNumber, result);
    res.render('size', renderData);
  });
});

router.get('/all', function (req, res, next) {
  var service = new commonService.commonInvoke('size');

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
        sizeList: result.content.responseData
      });
    }
  });
});

router.get('/checkSize', function (req, res, next) {
  var service = new commonService.commonInvoke('checkSizeName');
  var parameter = req.query.sizeName;

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
  var service = new commonService.commonInvoke('size');
  var data = {
    sizeCN: req.body.sizeCN,
    sizeEN: req.body.sizeEN,
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
  var service = new commonService.commonInvoke('size');
  var data = {
    sizeID: req.body.sizeID,
    sizeCN: req.body.sizeCN,
    sizeEN: req.body.sizeEN,
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
  var service = new commonService.commonInvoke('size');
  var sizeID = req.query.sizeID;

  service.delete(sizeID, function (result) {
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