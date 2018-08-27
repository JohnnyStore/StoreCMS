var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login = require('./routes/login');
var register = require('./routes/register');
var index = require('./routes/index');
var brand = require('./routes/brand');
var category = require('./routes/category');
var subCategory = require('./routes/subCategory');
var itemSeries = require('./routes/itemSeries');
var color = require('./routes/color');
var size = require('./routes/size');
var material = require('./routes/material');
var country = require('./routes/country');
var province = require('./routes/province');
var city = require('./routes/city');
var expressCompany = require('./routes/expressCompany');
var news = require('./routes/news');
var editNews = require('./routes/editNews');
var item = require('./routes/item');
var itemGroup = require('./routes/itemGroup');
var addItem = require('./routes/addItem');
var uploadItemImage = require('./routes/uploadItemImage');
var addItemSuccess = require('./routes/addItemSuccess');
var changeItem = require('./routes/changeItem');
var viewItem = require('./routes/viewItem');
var customer = require('./routes/customer');
var administrator = require('./routes/administrator');
var wholesaler = require('./routes/wholesaler');
var brandHot = require('./routes/brandHot');
var itemHot = require('./routes/itemHot');
var systemLog = require('./routes/systemLog');
var dailySnapUp = require('./routes/dailySnapUp');
var itemPromotion = require('./routes/itemPromotion');
var itemReview = require('./routes/itemReview');
var shoppingCart = require('./routes/shoppingCart');
var order = require('./routes/order');
var orderTransaction = require('./routes/orderTransaction');
var user = require('./routes/user');
var companyInfo = require('./routes/companyInfo');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//登录拦截器
app.use(function (req, res, next) {
  var url = req.originalUrl;
  if (url != '/' && url.indexOf('/register') < 0 && req.cookies['loginUser'] === undefined) {
    return res.redirect("/");
  }
  next();
});

app.use('/', login);
app.use('/register', register);
app.use('/index', index);
app.use('/brand', brand);
app.use('/category', category);
app.use('/subCategory', subCategory);
app.use('/itemSeries', itemSeries);
app.use('/color', color);
app.use('/size', size);
app.use('/material', material);
app.use('/country', country);
app.use('/province', province);
app.use('/city', city);
app.use('/expressCompany', expressCompany);
app.use('/news', news);
app.use('/editNews', editNews);
app.use('/item', item);
app.use('/itemGroup', itemGroup);
app.use('/addItem', addItem);
app.use('/uploadItemImage', uploadItemImage);
app.use('/addItemSuccess', addItemSuccess);
app.use('/changeItem', changeItem);
app.use('/viewItem', viewItem);
app.use('/customer', customer);
app.use('/administrator', administrator);
app.use('/wholesaler', wholesaler);
app.use('/brandHot', brandHot);
app.use('/itemHot', itemHot);
app.use('/systemLog', systemLog);
app.use('/itemPromotion', itemPromotion);
app.use('/dailySnapUp', dailySnapUp);
app.use('/itemReview', itemReview);
app.use('/shoppingCart', shoppingCart);
app.use('/order', order);
app.use('/orderTransaction', orderTransaction);
app.use('/user', user);
app.use('/companyInfo', companyInfo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
