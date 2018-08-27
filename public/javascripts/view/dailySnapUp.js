var app = new Vue({
  el: '#app',
  data: {
    snapUpID: '',
    itemID: 0,
    itemCode:'',
    itemName: '',
    snapUpDate: '',
    snapUpPrice4RMB: '',
    snapUpPrice4USD: '',
    selectedStatus: '',
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.itemCode.length > 0
          && this.itemID > 0
          && this.snapUpDate.length > 0
          && this.snapUpPrice4RMB.length > 0
          && this.snapUpPrice4USD.length > 0
          && this.selectedStatus.length > 0;
    }
  },
  methods:{
    onAdd: function () {
      this.saveType = 'add';
      this.snapUpID = '';
      this.itemID = '';
      this.itemCode='';
      this.itemName = '';
      this.snapUpDate = '';
      this.snapUpPrice4RMB = '';
      this.snapUpPrice4USD = '';
      this.selectedStatus = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#data-list tbody tr').eq(rowIndex);
      app.$data.snapUpID = $(row).find('td').eq(0).text();
      app.$data.itemCode = $(row).find('td').eq(1).text();
      app.$data.itemID = $(row).find('td').eq(1).find('input').val();
      app.$data.itemName = $.trim($(row).find('td').eq(2).text());
      app.$data.snapUpDate = $.trim($(row).find('td').eq(4).text()).substr(0, 10);
      app.$data.snapUpPrice4RMB = $.trim($(row).find('td').eq(5).text());
      app.$data.snapUpPrice4USD = $.trim($(row).find('td').eq(6).text());
      app.$data.selectedStatus = $(row).find('td').eq(7).find('input').val();
      app.$data.saveType = 'change';
      app.$data.endDateValid = true;
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (snapUpID, itemName) {
      var confirmMsg = '您确定要删除抢购商品：' + itemName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/dailySnapUp?snapUpID=' + snapUpID,
            type: 'delete',
            dataType: 'json',
            success: function(res){
              if(res.err){
                showMessage(res.msg);
              }else{
                location.href = '/dailySnapUp';
              }
            },
            error: function(XMLHttpRequest){
              showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
            }
          });
        }
      });
    },
    onItemCodeBlur: function () {
      if($.trim(this.itemCode).length === 0){
        return false;
      }
      $.ajax({
        url: '/item/byCode?itemCode=' + this.itemCode,
        type: 'get',
        success: function(res){
          if(res.err){
            app.$data.itemID = 0;
            app.$data.itemName = '';
            showMessage(res.msg);
          }else{
            hiddenMessage();
            if(res.data === null){
              app.$data.itemID = 0;
              app.$data.itemName = '';
              showMessage('商品不存在。');
              return false;
            }
            app.$data.itemName = res.data.itemShortDescriptionCN;
            app.$data.itemID = res.data.itemID;
          }
        },
        error: function(XMLHttpRequest){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onSave: function () {
      var dataType = '';
      var saveData = null;
      if(app.$data.saveType === ''){
        return false;
      }
      if(app.$data.saveType === 'add'){
        dataType = 'post';
        saveData = {
          snapUpID: app.$data.snapUpID,
          itemID: app.$data.itemID,
          snapUpDate: app.$data.snapUpDate,
          snapUpPrice4RMB: app.$data.snapUpPrice4RMB,
          snapUpPrice4USD: app.$data.snapUpPrice4USD,
          status: app.$data.selectedStatus,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          snapUpID: app.$data.snapUpID,
          itemID: app.$data.itemID,
          snapUpDate: app.$data.snapUpDate,
          snapUpPrice4RMB: app.$data.snapUpPrice4RMB,
          snapUpPrice4USD: app.$data.snapUpPrice4USD,
          status: app.$data.selectedStatus,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/dailySnapUp',
        type: dataType,
        dataType: 'json',
        data:saveData,
        success: function(res){
          if(res.err){
            showMessage(res.msg);
          }else{
            location.href = '/dailySnapUp';
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    }
  }
});