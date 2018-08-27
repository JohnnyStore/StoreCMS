$(document).ready(function () {
  var companyInfo = new Simditor({
    textarea: $('#companyInfo')
    //optional options
  });

  var companyContact = new Simditor({
    textarea: $('#companyContact')
    //optional options
  });

  function laodDefalutInfo(){
    $.ajax({
      url: '/companyInfo/detail',
      type: 'get',
      success: function(res){
        if(res.err){
          layer.msg(res.msg);
        }else{
          if(res.data === null){
            return false;
          }
          $('#hidden_infoID').val(res.data.infoID);
          companyInfo.setValue(res.data.introduction);
          companyContact.setValue(res.data.contact);
        }
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg('远程服务无响应，状态码：' + XMLHttpRequest.status);
      }
    });
  }

  $('#btnSave').click(function () {
    var infoID = $('#hidden_infoID').val();
    var companyInfo = $('#companyInfo').val();
    var companyContact = $('#companyContact').val();
    if(companyInfo.length === 0){
      layer.msg('请输入公司简介');
      return false;
    }
    if(companyContact.length === 0){
      layer.msg('请输入公司联系方式');
      return false;
    }
    $.ajax({
      url: '/companyInfo',
      type: 'post',
      dataType: 'json',
      data:{
        infoID: 1,
        introduction: companyInfo,
        contact: companyContact,
        loginUser: getLoginUser()
      },
      success: function(res){
        if(res.err){
          layer.msg(res.msg);
        }else{
          layer.msg('保存成功');
        }
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg('远程服务无响应，状态码：' + XMLHttpRequest.status);
      }
    });
  });

  laodDefalutInfo();
});