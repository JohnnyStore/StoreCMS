var app = new Vue({
  el: '#app',
  data: {
    administratorList:[],
    administratorID: '',
    administratorName: '',
    selectedCustomerRole:'',
    selectedStatus:'',
    account: '',
    cellphone: '',
    email: '',
    customerRoleList: [
      {'key': 'S','value':'最高权限'},
      {'key': 'C','value':'修改权限'},
      {'key': 'Q','value':'查询权限'}
    ],
    statusList: [
      {'key': 'P','value':'待审核'},
      {'key': 'A','value':'审核通过'},
      {'key': 'N','value':'审核未通过'},
      {'key': 'F','value':'冻结'}
    ],
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.selectedCustomerRole.length > 0
          && this.selectedStatus.length > 0;
    }
  },
  methods:{
    onChange: function (rowIndex) {
      var row = $('#administrator-list tbody tr').eq(rowIndex);
      app.$data.administratorID = $(row).find('td').eq(0).text();
      app.$data.administratorName = $(row).find('td').eq(1).text();
      app.$data.account = $(row).find('td').eq(2).text();
      app.$data.cellphone = $(row).find('td').eq(3).text();
      app.$data.email = $(row).find('td').eq(4).text();
      app.$data.selectedCustomerRole = $(row).find('td').eq(5).find('input').val();
      app.$data.selectedStatus = $(row).find('td').eq(6).find('input').val();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (administratorID, administratorName) {
      var confirmMsg = '您确定要删除' + administratorName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/administrator?administratorID=' + administratorID,
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
    },
    onSave: function () {
      var saveData = {
        administratorID: app.$data.administratorID,
        customerRole: app.$data.selectedCustomerRole,
        status: app.$data.selectedStatus,
        loginUser: getLoginUser()
      };
      $.ajax({
        url: '/administrator',
        type: 'put',
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
  }
});