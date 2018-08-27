var express = require('express');
var router = express.Router();
var sysConfig = require('../config/sysConfig');
var commonService = require('../service/commonService');

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('news');
  var pageNumber = req.query.pageNumber;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  var parameter = '/' + pageNumber + '/' + sysConfig.pageSize;

  service.get(parameter, function (result) {
    var renderData = commonService.buildRenderData('营业网点新闻管理', pageNumber, result);
    res.render('news', renderData);
  });
});

router.delete('/', function (req, res, next) {
  var service = new commonService.commonInvoke('news');
  var newsID = req.query.newsID;

  service.delete(newsID, function (result) {
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