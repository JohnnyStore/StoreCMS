var express = require('express');
var path = require('path');
var fs = require('fs');
var commonService = require('../service/commonService');
var multer = require('multer');
var router = express.Router();

var createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder);
  }
};

var uploadPath = path.join(path.resolve(__dirname, '..'), 'public', 'images', 'upload');

createFolder(uploadPath);

var storage = multer.diskStorage({
  destination: function (req, file, cb){
    //文件上传成功后会放入public下的upload文件夹
    cb(null, uploadPath);
    console.log('1');
  },
  filename: function (req, file, cb){
    //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
    cb(null, file.originalname)
  }
});

var upload = multer({
  storage: storage
});

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('brand');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    var renderData = commonService.buildRenderData('品牌维护', pageNumber, result);
    res.render('brand', renderData);
  });
});

router.get('/all', function (req, res, next) {
  var service = new commonService.commonInvoke('brand');

  service.getAll(function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        brandList: result.content.responseData
      });
    }
  });
});

router.get('/checkBrand', function (req, res, next) {
  var service = new commonService.commonInvoke('checkBrandName');
  var parameter = req.query.brandName;

  service.get(parameter, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        exist: result.content.responseData
      });
    }
  });
});

router.get('/detail', function (req, res, next) {
  var service = new commonService.commonInvoke('brand');
  var brandID = req.query.brandID;

  service.get(brandID, function (result) {
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
  var service = new commonService.commonInvoke('brand');
  var data = {
    brandCN: req.body.brandCN,
    brandEN: req.body.brandEN,
    brandImageUrl: req.body.brandImageUrl,
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
  var service = new commonService.commonInvoke('brand');
  var data = {
    brandID: req.body.brandID,
    brandCN: req.body.brandCN,
    brandEN: req.body.brandEN,
    brandImageID: req.body.brandImageID,
    brandImageUrl: req.body.brandImageUrl,
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
  var service = new commonService.commonInvoke('brand');
  var brandID = req.query.brandID;

  service.delete(brandID, function (result) {
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

router.post('/imageUpload',  upload.single('file'), function(req,res,next){
  var url = 'http://' + req.headers.host + '/images/upload/' + req.file.originalname;
  console.log(url);
  //将其发回客户端
  res.json({
    err : false,
    imageUrl : url
  });
  res.end();
});

module.exports = router;