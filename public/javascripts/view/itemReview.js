var app = new Vue({
  el: '#app',
  data: {
    reviewID: '',
    itemID: '',
    customerID: '',
    customerName: '',
    itemShortDescriptionCN: '',
    itemShortDescriptionEN: '',
    cellphone: '',
    itemCode: '',
    reviewText: '',
    reviewStatus: '',
    reviewLevel: '',
    selectedReviewStatus: '',
    selectedReviewLevel: '',
    reviewStatusText: '',
    reviewLevelText: '',
    customerValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.customerValid || this.selectedReviewStatus.length > 0;
    }
  },
  methods:{
    onShow: function () {
      this.customerID = '';
      this.customerName = '';
      this.customerValid = false;
      this.itemID = '';
      this.itemCode = '';
      this.selectedReviewStatus = '';
      this.selectedReviewLevel = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onSearch: function () {
      $('#myModal').modal('hide');
      location.href = '/itemReview?page=1' + '&customerID=' + this.customerID + '&itemCode=' + this.itemCode +  '&reviewLevel=' + this.selectedReviewLevel + '&reviewStatus=' + this.selectedReviewStatus;
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
    },
    onChange: function (reviewID,status) {
      var confirmMsg = '';
      switch (status){
        case 'P':
          confirmMsg = '您确定要将编号为' + reviewID + '的评论状态修改为审核通过？';
          break;
        case 'N':
          confirmMsg = '您确定要将编号为' + reviewID + '的评论状态修改为审核不通过？';
          break;
      }

      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          app.$data.reviewID = reviewID;
          app.$data.reviewStatus = status;
          var dataType = 'put';
          saveData = {
            reviewID: app.$data.reviewID,
            reviewStatus: app.$data.reviewStatus,
            loginUser: getLoginUser()
          };
          $.ajax({
            url: '/itemReview',
            type: dataType,
            dataType: 'json',
            data:saveData,
            success: function(res){
              if(res.err){
                showMessage(res.msg);
              }else{
                location.reload();
              }
            },
            error: function(XMLHttpRequest, textStatus){
              showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
            }
          });
        }
      });

    }
  }
});