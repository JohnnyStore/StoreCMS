$(document).ready(function () {
  var optionType = $('#hidden-optionType').val();
  var times = 3;

  if(optionType === 'add'){
    $('#msg').text('商品添加成功，' + times + '秒后跳转到商品列表页面。');
  }else{
    $('#msg').text('商品修改成功，' + times + '秒后跳转到商品列表页面。');
  }

  var interval = setInterval(function () {
    times--;
    if(times === 0){
      if(optionType === 'add'){
        $('#msg').text('商品添加成功，' + times + '秒后跳转到商品列表页面。');
      }else{
        $('#msg').text('商品修改成功，' + times + '秒后跳转到商品列表页面。');
      }
      clearInterval(interval);
      location.href = '/item';
    }else{
      if(optionType === 'add'){
        $('#msg').text('商品添加成功，' + times + '秒后跳转到商品列表页面。');
      }else{
        $('#msg').text('商品修改成功，' + times + '秒后跳转到商品列表页面。');
      }
    }
  }, 1000);
});