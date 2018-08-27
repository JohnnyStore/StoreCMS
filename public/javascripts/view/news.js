var app = new Vue({
  el: '#app',
  methods:{
    onChange: function (newsID) {
      location.href = '/editNews?newsID=' + newsID + '&saveType=upd';
    },
    onDelete: function (newsID, newsTitle) {
      var confirmMsg = '您确定要删除新闻【' + newsTitle + '】吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/news?newsID=' + newsID,
            type: 'delete',
            dataType: 'json',
            success: function(res){
              if(res.err){
                alertMessage(res.msg);
              }else{
                location.reload();
              }
            },
            error: function(XMLHttpRequest){
              alertMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
            }
          });
        }
      });
    }
  }
});