var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('subCategory');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('商品二级分类维护', pageNumber, result);
    res.render('subCategory', renderData);
  });
});

router.get('/all', function (req, res, next) {
  var service = new commonService.commonInvoke('subCategory');

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
        subCategoryList: result.content.responseData
      });
    }
  });
});

router.get('/checkSubCategory', function (req, res, next) {
  var service = new commonService.commonInvoke('checkSubCategoryName');
  var parameter = req.query.subCategoryName;

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
  var service = new commonService.commonInvoke('subCategory');
  var data = {
    subCategoryCN: req.body.subCategoryCN,
    subCategoryEN: req.body.subCategoryEN,
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
  var service = new commonService.commonInvoke('subCategory');
  var data = {
    subCategoryID: req.body.subCategoryID,
    subCategoryCN: req.body.subCategoryCN,
    subCategoryEN: req.body.subCategoryEN,
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
  var service = new commonService.commonInvoke('subCategory');
  var subCategoryID = req.query.subCategoryID;

  service.delete(subCategoryID, function (result) {
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