var app = new Vue({
  el: '#app',
  data: {
    shoppingCartID: '',
    customerID: '',
    customerName: '',
    customerValid: false,
    selectedStatus: ''
  },
  computed: {
    enabledSave: function () {
      return this.customerValid || this.selectedStatus.length > 0;
    }
  },
  methods:{
    onShow: function () {
      this.customerID = '';
      this.customerName = '';
      this.customerValid = false;
      this.selectedStatus = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onSearch: function () {
      $('#myModal').modal('hide');
      location.href = '/shoppingCart?page=1' + '&customerID=' + this.customerID + '&status=' + this.selectedStatus;
    },
    onCustomerIDBlur: function () {
      if($.trim(this.customerID).length === 0){
        return false;
      }
      $.ajax({
        url: '/customer/detail?customerID=' + this.customerID,
        type: 'get',
        success: function(res){
          if(res.err){
            showMessage(res.msg);
          }else{
            hiddenMessage();
            if(res.data === null){
              app.$data.customerValid = false;
              app.$data.customerName = '';
              showMessage('客户不存在。');
              return false;
            }
            app.$data.customerName = res.data.cellphone;
            app.$data.customerValid = true;
          }
        },
        error: function(XMLHttpRequest){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });

    }
  }
});