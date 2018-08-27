var express = require('express');
var sysConfig = require('../config/sysConfig');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('shoppingCart');
  var pageNumber = req.query.page;
  var customerID = req.query.customerID;
  var status = req.query.status;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  if(customerID === undefined || customerID === ''){
    customerID = 0;
  }
  if(status === undefined || status === ''){
    status = "A";
  }
  var parameter = pageNumber + '/' + sysConfig.pageSize + '/' + customerID + '/' + status;
  service.get(parameter, function (result) {
    var renderData = commonService.buildRenderData('购物车', pageNumber, result);
    res.render('shoppingCart', renderData);
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('shoppingCart');
  var data = {
    customerID: req.body.customerID,
    status: req.body.status
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


module.exports = router;