var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();


router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('brandHot');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('热销品牌维护', pageNumber, result);
    res.render('brandHot', renderData);
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('brandHot');
  var data = {
    brandID: req.body.brandID,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
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
  var service = new commonService.commonInvoke('brandHot');
  var data = {
    brandHotID: req.body.brandHotID,
    brandID: req.body.brandID,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
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
  var service = new commonService.commonInvoke('brandHot');
  var brandHotID = req.query.brandHotID;

  service.delete(brandHotID, function (result) {
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