var app = new Vue({
  el:  '#app',
  methods: {
    onDelete: function (itemID, itemName) {
      var confirmMsg = '您确定要删除商品：' + itemName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/item?itemID=' + itemID,
            type: 'delete',
            dataType: 'json',
            success: function(res){
              if(res.err){
                propAlert(res.msg);
              }else{
                location.reload();
              }
            },
            error: function(XMLHttpRequest){
              propAlert('远程服务无响应');
            }
          });
        }
      });
    },
    onUpdateShowListItem: function () {
      bootbox.confirm('您确认要修改商品的显示状态吗？', function(result) {
        if(result) {
          var successCount = 0;
          var failedCount = 0;
          $('#item-list tbody tr').each(function (index, obj) {
            $.ajax({
              url: '/item/changeItemToShowInList',
              type: 'put',
              async: false,
              dataType: 'json',
              data: {
                itemID: $(obj).find('td').eq(0).find('input[type="hidden"]').val(),
                showInListPage: $(obj).find('td').eq(14).find('input').is(':checked'),
                loginUser: getLoginUser()
              },
              success: function(res){
                if(res.err){
                  failedCount++;
                }else{
                  successCount++;
                }
              },
              error: function(XMLHttpRequest){
                propAlert('远程服务无响应');
              }
            });
          });
          propAlert('修改完成，成功：' + successCount + ', 失败：' + failedCount);
        }
      });
    }
  }
});