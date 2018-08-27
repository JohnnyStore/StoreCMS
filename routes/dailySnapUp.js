var express = require('express');
var sysConfig = require('../config/sysConfig');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('dailySnapUp');
  var pageNumber = req.query.page;
  var snapUpDate = req.query.snapUpDate;
  var status = req.query.status;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  if(snapUpDate === undefined || snapUpDate === ''){
    snapUpDate = 'N';
  }
  if(status === undefined || status === ''){
    status = 'N';
  }

  var parameter = pageNumber + '/' + sysConfig.pageSize + '/' + snapUpDate + '/' + status;

  service.get(parameter, function (result) {
    var renderData = commonService.buildRenderData('每日抢购', pageNumber, result);
    res.render('dailySnapUp', renderData);
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('dailySnapUp');
  var data = {
    snapUpID: req.body.snapUpID,
    itemID: req.body.itemID,
    snapUpDate: req.body.snapUpDate,
    snapUpPrice4RMB: req.body.snapUpPrice4RMB,
    snapUpPrice4USD: req.body.snapUpPrice4USD,
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
        err: !result.content.result,
        msg: result.content.responseMessage
      });
    }
  });
});

router.put('/', function(req,res,next){
  var service = new commonService.commonInvoke('dailySnapUp');
  var data = {
    snapUpID: req.body.snapUpID,
    itemID: req.body.itemID,
    snapUpDate: req.body.snapUpDate,
    snapUpPrice4RMB: req.body.snapUpPrice4RMB,
    snapUpPrice4USD: req.body.snapUpPrice4USD,
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
        err: !result.content.result,
        msg: result.content.responseMessage
      });
    }
  });
});

router.delete('/', function (req, res, next) {
  var service = new commonService.commonInvoke('dailySnapUp');
  var snapUpID = req.query.snapUpID;

  service.delete(snapUpID, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage
      });
    }
  });
});

module.exports = router;