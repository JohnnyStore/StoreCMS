var app = new Vue({
  el: '#app',
  data: {
    cellphone: '',
    recentMonth: 3,
    orderStatus: 'N',
    detail_orderID: '',
    detail_orderDate: '',
    detail_cellphone: '',
    detail_orderAmount: '',
    detail_orderShippingAddress: '',
    detail_orderStatus: '',
    detail_expressCompany: '',
    detail_trackingNumber: '',
    detail_refundReason: '',
    detail_memo: '',
    order_itemList: [],
    change_orderID: '',
    change_orderStatus: '',
    change_allowShip: false,
    change_allowRefund: false,
    change_message: '',
    tracking_orderID: '',
    expressCompanyList: [],
    selectedExpressCompany: 0,
    tracking_number: ''
  },
  computed: {
    tracking_submit: function () {
      return this.selectedExpressCompany > 0
          && this.tracking_number.length > 0;
    }
  },
  methods: {
    initProcess: function () {
      this.setExpressCompany();
    },
    setExpressCompany: function () {
      $.ajax({
        url: '/expressCompany/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            alertMessage(res.msg);
          }else{
            app.$data.expressCompanyList = res.dataList;
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onShowSearchDialog: function () {
      this.cellphone = '';
      this.recentMonth = 3;
      this.orderStatus = 'N';
      $('#search-dialog').modal('show');
    },
    onShowOrderDetail: function (orderID) {
      $.ajax({
        url: '/order/detail?orderID=' + orderID,
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.detail_orderID = res.data.orderID;
            app.$data.detail_orderDate = res.data.orderDate;
            app.$data.detail_cellphone = res.data.customerVO.cellphone;
            app.$data.detail_orderAmount = res.data.orderAmount;
            app.$data.detail_orderShippingAddress = res.data.shippingAddressVO.countryVO.countryNameCN + res.data.shippingAddressVO.provinceVO.provinceNameCN + res.data.shippingAddressVO.cityVO.cityNameCN + res.data.shippingAddressVO.shippingStreet;
            app.$data.detail_orderStatus = res.data.orderStatusText;
            app.$data.detail_expressCompany = res.data.expressCompanyVO === null ? '' : res.data.expressCompanyVO.companyCN;
            app.$data.detail_trackingNumber = res.data.trackingNumber;
            app.$data.detail_refundReason = res.data.refundReason;
            app.$data.detail_memo = res.data.memo;
            app.$data.order_itemList = res.data.orderTransactionList;
            $('#detail-dialog').modal('show');
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onShowChangeStatus: function (orderID, orderStatus) {
      this.change_orderID = orderID;
      this.tracking_orderID = orderID;
      this.change_orderStatus = orderStatus;
      hiddenMessage();
      switch (orderStatus){
        case 'O':
          this.change_allowShip = false;
          this.change_allowRefund = false;
          showMessage('订单尚未支付，不可修改状态。');
          break;
        case 'E':
          this.change_allowShip = false;
          this.change_allowRefund = false;
          showMessage('订单已过期，不可修改状态。');
          break;
        case 'P':
          this.change_allowShip = true;
          this.change_allowRefund = true;
          showMessage('订单已支付，可修改为配送或者退款。');
          break;
        case 'C':
          this.change_allowShip = false;
          this.change_allowRefund = false;
          showMessage('订单被取消，不可修改状态。');
          break;
        case 'S':
          this.change_allowShip = false;
          this.change_allowRefund = true;
          showMessage('订单正在配送，可将其修改为退款状态。');
          break;
        case 'R':
          this.change_allowShip = false;
          this.change_allowRefund = false;
          showMessage('订单已退款，不可修改状态。');
          break;
        case 'F':
          this.change_allowShip = false;
          this.change_allowRefund = false;
          showMessage('订单已完成，不可修改状态。');
          break;
      }
      $('#change-dialog').modal('show');
    },
    onShip: function () {
      this.selectedExpressCompany = 0;
      this.tracking_number = '';
      hiddenMessage();
      $('#change-dialog').modal('hide');
      $('#tracking-dialog').modal('show');
    },
    onSaveTracking: function () {
      $.ajax({
        url: '/order/saveTracking',
        type: 'put',
        dataType: 'json',
        data:{
          orderID: app.$data.tracking_orderID,
          expressCompany: app.$data.selectedExpressCompany,
          trackingNumber: app.$data.tracking_number,
          loginUser: getLoginUser()
        },
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            location.reload();
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onRefund: function () {
      $('#change-dialog').modal('hide');
      var confirmMsg = '您确定要将订单：' + this.change_orderID + '的状态修改为退款吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/order/changeOrderStatus',
            type: 'put',
            dataType: 'json',
            data:{
              orderID: app.$data.tracking_orderID,
              orderStatus: 'R',
              loginUser: getLoginUser()
            },
            success: function(res){
              if(res.err){
                propAlert(res.msg);
              }else{
                location.reload();
              }
            },
            error: function(XMLHttpRequest, textStatus){
              propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
            }
          });
        }
      });
    },
    onSearch: function () {
      var searchUrl = '';
      if(this.cellphone.length === 0){
        searchUrl = '/order?cellphone=' + 'N' + '&recentMonth=' + this.recentMonth + '&orderStatus=' + this.orderStatus;
      }else{
        searchUrl = '/order?cellphone=' + this.cellphone + '&recentMonth=' + this.recentMonth + '&orderStatus=' + this.orderStatus;
      }
      location.href = searchUrl;
    }
  },
  mounted: function () {
    this.initProcess();
  }
});