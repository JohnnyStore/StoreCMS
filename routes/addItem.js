var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var optionType = req.query.option;
  var itemID = req.query.itemID;

  var brandService = new commonService.commonInvoke('brand');
  var categoryService = new commonService.commonInvoke('category');
  var subCategoryService = new commonService.commonInvoke('subCategory');
  var itemSeriesService = new commonService.commonInvoke('itemSeries');
  var colorService = new commonService.commonInvoke('color');
  var sizeService = new commonService.commonInvoke('size');
  var materialService = new commonService.commonInvoke('material');
  var countryService = new commonService.commonInvoke('country');

  var brandList = [];
  var categoryList = [];
  var subCategoryList = [];
  var itemGroupList = [];
  var seriesList = [];
  var colorList = [];
  var sizeList = [];
  var materialList = [];
  var madeCountryList = [];

  //取得品牌信息
  brandService.getAll(function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      brandList = result.content.responseData;
      //取得一级分类信息
      categoryService.getAll(function (result) {
        if(result.err || !result.content.result){
          res.json({
            err: true,
            msg: result.msg
          });
        }else{
          categoryList = result.content.responseData;
          //取得二级分类信息
          subCategoryService.getAll(function (result) {
            if(result.err || !result.content.result){
              res.json({
                err: true,
                msg: result.msg
              });
            }else{
              subCategoryList = result.content.responseData;
              itemSeriesService.getAll(function (result) {
                if(result.err || !result.content.result){
                  res.json({
                    err: true,
                    msg: result.msg
                  });
                }else{
                  seriesList = result.content.responseData;
                  //取得颜色信息
                  colorService.getAll(function (result) {
                    if(result.err || !result.content.result){
                      res.json({
                        err: true,
                        msg: result.msg
                      });
                    }else{
                      colorList = result.content.responseData;
                      //取得尺寸信息
                      sizeService.getAll(function (result) {
                        if(result.err || !result.content.result){
                          res.json({
                            err: true,
                            msg: result.msg
                          });
                        }else{
                          sizeList = result.content.responseData;
                          //取得商品材质信息
                          materialService.getAll(function (result) {
                            if(result.err || !result.content.result){
                              res.json({
                                err: true,
                                msg: result.msg
                              });
                            }else{
                              materialList = result.content.responseData;
                              //取得商品产地信息
                              countryService.getAll(function (result) {
                                if(result.err || !result.content.result){
                                  res.json({
                                    err: true,
                                    msg: result.msg
                                  });
                                }else{
                                  madeCountryList = result.content.responseData;
                                  res.render('addItem', {
                                    title: '添加商品',
                                    optionType: optionType,
                                    itemID: itemID,
                                    brandList: brandList,
                                    categoryList: categoryList,
                                    subCategoryList: subCategoryList,
                                    itemGroupList: itemGroupList,
                                    seriesList: seriesList,
                                    colorList: colorList,
                                    sizeList: sizeList,
                                    materialList: materialList,
                                    madeCountryList: madeCountryList
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});
router.get('/checkItemCode', function (req, res, next) {
  var service = new commonService.commonInvoke('checkItemCode');
  var parameter = req.query.itemCode;

  service.get(parameter, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        exist: result.content.responseData
      });
    }
  });
});

router.get('/checkItemName', function (req, res, next) {
  var service = new commonService.commonInvoke('checkItemName');
  var parameter = req.query.brandID + '/' +
      req.query.categoryID + '/' +
      req.query.subCategoryID + '/' +
      req.query.seriesID + '/' +
      req.query.itemName;

  service.get(parameter, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        exist: result.content.responseData
      });
    }
  });
});

router.get('/detail', function (req, res, next) {
  var service = new commonService.commonInvoke('itemDetail');
  var parameter = req.query.itemID;

  service.get(parameter, function (result) {
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

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('item');
  var data = {
    brandID: req.body.brandID,
    categoryID: req.body.categoryID,
    subCategoryID: req.body.subCategoryID,
    itemGroupID: req.body.itemGroupID,
    seriesID: req.body.seriesID,
    itemCode: req.body.itemCode,
    unitPrice4RMB: req.body.unitPrice4RMB,
    // promotionPrice4RMB: req.body.promotionPrice4RMB,
    unitPrice4USD: req.body.unitPrice4USD,
    // promotionPrice4USD: req.body.promotionPrice4USD,
    rate: req.body.rate,
    colorID: req.body.colorID,
    sizeID: req.body.sizeID,
    itemMaterial: req.body.itemMaterial,
    madeInID: req.body.madeInID,
    itemLength: req.body.itemLength,
    adjustLength: req.body.adjustLength,
    suitablePetCN: req.body.suitablePetCN,
    suitablePetEN: req.body.suitablePetEN,
    itemShortDescriptionCN: req.body.itemShortDescriptionCN,
    itemShortDescriptionEN: req.body.itemShortDescriptionEN,
    itemDescriptionCN: req.body.itemDescriptionCN,
    itemDescriptionEN: req.body.itemDescriptionEN,
    itemStatus: req.body.itemStatus,
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
        msg: result.content.responseMessage,
        data: result.content
      });
    }
  });
});

router.put('/', function (req, res, next) {
  var service = new commonService.commonInvoke('item');
  var data = {
    itemID: req.body.itemID,
    brandID: req.body.brandID,
    categoryID: req.body.categoryID,
    subCategoryID: req.body.subCategoryID,
    itemGroupID: req.body.itemGroupID,
    seriesID: req.body.seriesID,
    itemCode: req.body.itemCode,
    unitPrice4RMB: req.body.unitPrice4RMB,
    // promotionPrice4RMB: req.body.promotionPrice4RMB,
    unitPrice4USD: req.body.unitPrice4USD,
    // promotionPrice4USD: req.body.promotionPrice4USD,
    rate: req.body.rate,
    colorID: req.body.colorID,
    sizeID: req.body.sizeID,
    itemMaterial: req.body.itemMaterial,
    madeInID: req.body.madeInID,
    itemLength: req.body.itemLength,
    adjustLength: req.body.adjustLength,
    suitablePetCN: req.body.suitablePetCN,
    suitablePetEN: req.body.suitablePetEN,
    itemShortDescriptionCN: req.body.itemShortDescriptionCN,
    itemShortDescriptionEN: req.body.itemShortDescriptionEN,
    itemDescriptionCN: req.body.itemDescriptionCN,
    itemDescriptionEN: req.body.itemDescriptionEN,
    itemStatus: req.body.itemStatus,
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

module.exports = router;