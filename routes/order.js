var express = require('express');
var commonService = require('../service/commonService');
var sysConfig = require('../config/sysConfig');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('order');
  var pageNumber = req.query.page;
  var cellphone = req.query.cellphone;
  var recentMonth = req.query.recentMonth;
  var orderStatus = req.query.orderStatus;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  if(cellphone === undefined){
    cellphone = 'N';
  }

  if(recentMonth === undefined){
    recentMonth = 3;
  }

  if(orderStatus === undefined){
    orderStatus = 'N';
  }

  var parameter = pageNumber + '/' + sysConfig.pageSize + '/' + cellphone + '/' + recentMonth + '/' + orderStatus;
  service.get(parameter, function (result) {
    var renderData = commonService.buildRenderData('订单信息', pageNumber, result);
    res.render('order', renderData);
  });
});

router.get('/detail', function (req, res, next) {
  var service = new commonService.commonInvoke('order');
  var orderID = req.query.orderID;

  service.get(orderID, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  });
});

router.put('/saveTracking', function (req, res, next) {
  var service = new commonService.commonInvoke('changeExpressInfo');
  var data = {
    orderID: req.body.orderID,
    expressCompanyID: req.body.expressCompany,
    trackingNumber: req.body.trackingNumber,
    orderStatus: 'S',
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

router.put('/changeOrderStatus', function (req, res, next) {
  var service = new commonService.commonInvoke('changeOrderStatus');
  var data = {
    orderID: req.body.orderID,
    orderStatus: req.body.orderStatus,
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

module.exports = router;