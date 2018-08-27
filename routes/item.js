var express = require('express');
var commonService = require('../service/commonService');
var fs= require("fs");
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('item');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('商品维护', pageNumber, result);
    res.render('item', renderData);
  });
});

router.get('/byCode', function(req, res, next) {
  var service = new commonService.commonInvoke('itemByCode');
  var itemCode = req.query.itemCode;

  service.get(itemCode, function (result) {
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

router.put('/changeItemToShowInList', function (req, res, next) {
  var service = new commonService.commonInvoke('changeItemToShowInList');
  var data = {
    itemID: req.body.itemID,
    showInListPage: req.body.showInListPage,
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
        msg: result.content.responseMessage,
        data: result.content
      });
    }
  });
});

router.delete('/', function (req, res, next) {
  var itemService = new commonService.commonInvoke('item');
  var imageService = new commonService.commonInvoke('image');
  var itemID = req.query.itemID;
  var imageList = [];
  var deleteImageError = [];
  imageService.get(itemID + '/I', function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      imageList = result.content.responseData;
      itemService.delete(itemID, function (result) {
        if(result.err){
          res.json({
            err: true,
            msg: result.msg
          });
        }else{
          imageService.delete(itemID + '/I', function (result) {
            if(result.err){
              res.json({
                err: true,
                msg: result.msg
              });
            }else{
              imageList.forEach(function(image,index){
                var imagePath = './public/images/item/' + image.imageSrc.substring(image.imageSrc.lastIndexOf('/') + 1);
                fs.unlink(imagePath, function(err){
                  if(err){
                    deleteImageError.push(imagePath);
                  }
                })
              });
              res.json({
                err: false,
                msg: result.msg
              });
            }
          });
        }
      });
    }
  });


});

module.exports = router;