var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('color');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('商品颜色维护', pageNumber, result);
    res.render('color', renderData);
  });
});

router.get('/all', function (req, res, next) {
  var service = new commonService.commonInvoke('color');

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
        colorList: result.content.responseData
      });
    }
  });
});

router.get('/checkColor', function (req, res, next) {
  var service = new commonService.commonInvoke('checkColorName');
  var parameter = req.query.colorName;

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
  var service = new commonService.commonInvoke('color');
  var data = {
    colorCN: req.body.colorCN,
    colorEN: req.body.colorEN,
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
  var service = new commonService.commonInvoke('color');
  var data = {
    colorID: req.body.colorID,
    colorCN: req.body.colorCN,
    colorEN: req.body.colorEN,
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
  var service = new commonService.commonInvoke('color');
  var colorID = req.query.colorID;

  service.delete(colorID, function (result) {
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