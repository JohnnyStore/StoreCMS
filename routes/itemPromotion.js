var express = require('express');
var sysConfig = require('../config/sysConfig');
var commonService = require('../service/commonService');
var router = express.Router();


router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('itemPromotion');
  var pageNumber = req.query.page;
  var itemID = req.query.itemID;
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;
  var status = req.query.status;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  if(itemID === undefined || itemID === ''){
    itemID = 0;
  }
  if(startDate === undefined || startDate === ''){
    startDate = 'N';
  }
  if(endDate === undefined || endDate === ''){
    endDate = 'N';
  }
  if(status === undefined || status === ''){
    status = 'N';
  }
  var parameter = pageNumber + '/' + sysConfig.pageSize + '/' + itemID + '/' + startDate + '/' + endDate + '/' + status;

  service.get(parameter, function (result) {
    var renderData = commonService.buildRenderData('促销商品维护', pageNumber, result);
    res.render('itemPromotion', renderData);
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('itemPromotion');
  var data = {
    itemID: req.body.itemID,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    promotionPrice4RMB: req.body.promotionPrice4RMB,
    promotionPrice4USD: req.body.promotionPrice4USD,
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
  var service = new commonService.commonInvoke('itemPromotion');
  var data = {
    itemPromotionID: req.body.itemPromotionID,
    itemID: req.body.itemID,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    promotionPrice4RMB: req.body.promotionPrice4RMB,
    promotionPrice4USD: req.body.promotionPrice4USD,
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
  var service = new commonService.commonInvoke('itemPromotion');
  var itemPromotionID = req.query.itemPromotionID;

  service.delete(itemPromotionID, function (result) {
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