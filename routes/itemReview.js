var express = require('express');
var commonService = require('../service/commonService');
var sysConfig = require('../config/sysConfig');
var fs= require("fs");
var router = express.Router();

// router.get('/', function(req, res, next) {
//     var service = new commonService.commonInvoke('itemReview');
//     var pageNumber = req.query.page;
//     if(pageNumber === undefined){
//         pageNumber = 1;
//     }
//
//     service.getPageData(pageNumber, function (result) {
//         var renderData = commonService.buildRenderData('商品评论', pageNumber, result);
//         res.render('itemReview', renderData);
//     });
// });

router.get('/', function(req, res, next) {
    var service = new commonService.commonInvoke('itemReview');
    var pageNumber = req.query.page;
    var customerID = req.query.customerID;
    var itemID = req.query.itemID;
    var itemCode = req.query.itemCode;
    var reviewStatus = req.query.reviewStatus;
    var reviewLevel = req.query.reviewLevel;
    if(pageNumber === undefined){
        pageNumber = 1;
    }
    if(customerID === undefined || customerID === ''){
        customerID = 0;
    }
    if(itemCode === undefined || itemCode === ''){
        itemCode = "A";
    }
    if(reviewLevel === undefined || reviewLevel === ''){
        reviewLevel = "A";
    }
    if(reviewStatus === undefined || reviewStatus === ''){
        reviewStatus = "A";
    }
    var parameter = pageNumber + '/' + sysConfig.pageSize + '/' + customerID + '/' + itemCode+ '/' + reviewLevel+ '/' + reviewStatus;
    service.get(parameter, function (result) {
        var renderData = commonService.buildRenderData('商品评论', pageNumber, result);
        res.render('itemReview', renderData);
    });
});

router.put('/', function(req,res,next){
    var service = new commonService.commonInvoke('itemReview');
    var data = {
        reviewID: req.body.reviewID,
        reviewStatus: req.body.reviewStatus,
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