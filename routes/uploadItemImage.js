var express = require('express');
var multer = require('multer');
var commonService = require('../service/commonService');
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb){
    //文件上传成功后会放入public下的upload文件夹
    cb(null, './public/images/item')
  },
  filename: function (req, file, cb){
    //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
    cb(null, file.originalname)
  }
});
var upload = multer({
  storage: storage
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var optionType = req.query.optionType;
  var itemID = req.query.itemID;
  res.render('uploadItemImage', { title: '添加商品图片', optionType: optionType, itemID: itemID });
});

router.get('/image', function (req, res, next) {
  var parameter = req.query.itemID + '/I';
  var service = new commonService.commonInvoke('image');
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
  var service = new commonService.commonInvoke('image');//imageList
  var imageListService = new commonService.commonInvoke('imageList');


  if(req.body.imageType === 'D'){
    var imageDetailList = JSON.parse(req.body.imageDetailList);
    var parentImageSrc = req.body.parentImageSrc;
    var objectID = req.body.objectID;
    var objectType = req.body.objectType;
    var groupID = req.body.groupID;
    var imageType = req.body.imageType;
    var loginUser = req.body.loginUser;
    var imageDtoList = [];

    for(var i = 0; i <= imageDetailList.length - 1; i++){
      imageDtoList.push({
        imageSrc: imageDetailList[i],
        parentImageSrc: parentImageSrc,
        objectID: objectID,
        objectType: objectType,
        groupID: groupID,
        imageType: imageType,
        loginUser: loginUser
      });
    }

    var jsonStr = JSON.stringify(imageDtoList);
    imageListService.add(imageDtoList, function (result) {
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

  }else {
    var data = {
      imageSrc: req.body.imageSrc,
      parentImageSrc: req.body.parentImageSrc,
      objectID: req.body.objectID,
      objectType: req.body.objectType,
      groupID: req.body.groupID,
      imageType: req.body.imageType,
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
  }
});

router.post('/imageUpload',  upload.single('file'), function(req,res,next){
//拼接文件上传后的网络路径，
  var url = 'http://' + req.headers.host + '/images/item/' + req.file.originalname;
  //将其发回客户端
  res.json({
    err : false,
    imageUrl : url
  });
  res.end();
});

module.exports = router;