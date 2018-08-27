var app = new Vue({
  el: '#app',
  data: {
    statusList:[
      {
        'code': 'I',
        'text': 'Init'
      },
      {
        'code': 'P',
        'text': 'Processing'
      },
      {
        'code': 'C',
        'text': 'Close'
      }
    ],
    logID: '',
    selectedLogStatus: ''
  },
  computed: {
    enabledSave: function () {
      return this.selectedLogStatus.length > 0 && this.logID.length > 0
    }
  },
  methods: {
    onShowErrorMessage: function (rowIndex) {
      var row = $('#systemLog-list tbody tr').eq(rowIndex);
      var errorMsg = $(row).find('td').eq(6).find('input').val();
      $('#dialog-text .modal-header h4').text('异常信息');
      $('#dialog-text .modal-body p').text(errorMsg);
      $('#dialog-text').modal('show');
    },
    onShowStackDetail: function (rowIndex){
      var row = $('#systemLog-list tbody tr').eq(rowIndex);
      var errorStackDetail = $(row).find('td').eq(7).find('input').val();
      $('#dialog-text .modal-header h4').text('异常栈信息');
      $('#dialog-text .modal-body p').text(errorStackDetail);
      $('#dialog-text').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#systemLog-list tbody tr').eq(rowIndex);
      app.$data.logID = $(row).find('td').eq(0).text();
      app.$data.selectedLogStatus = $(row).find('td').eq(8).find('input').val();
      $('#dialog-change-status').modal('show');
    },
    onSave: function () {
      $.ajax({
        url: '/systemLog',
        type: 'put',
        dataType: 'json',
        data:{
          logID: app.$data.logID,
          status: app.$data.selectedLogStatus,
          loginUser: getLoginUser()
        },
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
  }
});