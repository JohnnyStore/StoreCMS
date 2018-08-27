var express = require('express');
var commonService = require('../service/commonService');
var sysConfig = require('../config/sysConfig');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('customer');
  var pageNumber = req.query.page;
  var cellphone = req.query.cellphone;
  var status = req.query.status;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  if(cellphone === undefined || cellphone === ''){
    cellphone = null;
  }
  if(status === undefined || status === ''){
    status = null;
  }
  var parameter = pageNumber + '/' + sysConfig.pageSize + '/' + cellphone + '/' + status;

  service.get(parameter, function (result) {
    var renderData = commonService.buildRenderData('注册客户', pageNumber, result);
    res.render('customer', renderData);
  });
});

router.get('/detail', function(req, res, next) {
  var service = new commonService.commonInvoke('customer');
  var customerID = req.query.customerID;

  service.get(customerID, function (result) {
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

router.put('/', function(req,res,next){
  var service = new commonService.commonInvoke('changeCustomerStatus');
  var data = {
    customerID: req.body.customerID,
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

module.exports = router;