var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('itemGroup');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('商品组维护', pageNumber, result);
    res.render('itemGroup', renderData);
  });
});

router.get('/all', function(req, res, next) {
  var service = new commonService.commonInvoke('itemGroup');
  var brandID = req.query.brandID;
  var categoryID = req.query.categoryID;
  var subCategoryID = req.query.subCategoryID;
  var parameter = brandID + '/' + categoryID + '/' + subCategoryID;


  service.get(parameter, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.msg,
        itemGroupList: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('itemGroup');
  var data = {
    brandID: req.body.brandID,
    categoryID: req.body.categoryID,
    subCategoryID: req.body.subCategoryID,
    itemGroupCN: req.body.itemGroupCN,
    itemGroupEN: req.body.itemGroupEN,
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
  var service = new commonService.commonInvoke('itemGroup');
  var data = {
    itemGroupID: req.body.itemGroupID,
    brandID: req.body.brandID,
    categoryID: req.body.categoryID,
    subCategoryID: req.body.subCategoryID,
    itemGroupCN: req.body.itemGroupCN,
    itemGroupEN: req.body.itemGroupEN,
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
  var service = new commonService.commonInvoke('itemGroup');
  var itemGroupID = req.query.itemGroupID;

  service.delete(itemGroupID, function (result) {
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