var app = new Vue({
  el: '#app',
  data: {
    cellphone: '',
    selectedStatus: ''
  },
  methods:{
    onShow: function () {
      this.cellphone = '';
      this.selectedStatus = '';
      $('#myModal').modal('show');
    },
    onSearch: function () {
      $('#myModal').modal('hide');
      location.href = '/customer?page=1' + '&cellphone=' + this.cellphone + '&status=' + this.selectedStatus;
    },
    onActive: function (customerID, cellphone) {
      var confirmMsg = '您确定要激活' + cellphone + '的账户吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/customer',
            type: 'put',
            dataType: 'json',
            data: {
              customerID: customerID,
              status: 'A',
              loginUser: getLoginUser()
            },
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
    },
    onFrozen: function (customerID, cellphone) {
      var confirmMsg = '您确定要冻结' + cellphone + '的账户吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/customer',
            type: 'put',
            dataType: 'json',
            data: {
              customerID: customerID,
              status: 'F',
              loginUser: getLoginUser()
            },
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