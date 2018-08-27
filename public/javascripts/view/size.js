var app = new Vue({
  el: '#app',
  data: {
    sizeID: '',
    sizeNameCN: '',
    sizeNameEN: '',
    sizeNameCNValid: false,
    sizeNameENValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.sizeNameCN.length > 0 &&
          this.sizeNameEN.length > 0 &&
          this.sizeNameCNValid &&
          this.sizeNameENValid;
    }
  },
  methods:{
    checkSizeName: function (sizeName, lan) {
      app.$data.sizeNameCNValid = true;
      app.$data.sizeNameENValid = true;
      // if($.trim(sizeName).length === 0){
      //   return false;
      // }
      // $.ajax({
      //   url: '/size/checkSize?sizeName='+sizeName,
      //   type: 'GET',
      //   success: function(res){
      //     if(res.err){
      //       lan === 'CN' ? app.$data.sizeNameCNValid = false : app.$data.sizeNameENValid = false;
      //       showMessage(res.msg);
      //     }else if(res.exist){
      //       lan === 'CN' ? app.$data.sizeNameCNValid = false : app.$data.sizeNameENValid = false;
      //       showMessage(sizeName + '已存在。');
      //     }else{
      //       lan === 'CN' ? app.$data.sizeNameCNValid = true : app.$data.sizeNameENValid = true;
      //       hiddenMessage();
      //     }
      //   },
      //   error: function(XMLHttpRequest, textStatus){
      //     showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
      //   }
      // });
    },
    onAdd: function () {
      app.$data.saveType = 'add';
      app.$data.sizeID = '';
      app.$data.sizeNameCN = '';
      app.$data.sizeNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#size-list tbody tr').eq(rowIndex);
      app.$data.sizeID = $(row).find('td').eq(0).text();
      app.$data.sizeNameCN = $(row).find('td').eq(1).text();
      app.$data.sizeNameEN = $(row).find('td').eq(2).text();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (sizeID, sizeName) {
      var confirmMsg = '您确定要删除商品尺码：' + sizeName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/size?sizeID=' + sizeID,
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
    onSizeCNBlur: function () {
      app.checkSizeName(app.$data.sizeNameCN, 'CN');
    },
    onSizeENBlur: function () {
      app.checkSizeName(app.$data.sizeNameEN, 'EN');
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
          sizeCN: app.$data.sizeNameCN,
          sizeEN: app.$data.sizeNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          sizeID: app.$data.sizeID,
          sizeCN: app.$data.sizeNameCN,
          sizeEN: app.$data.sizeNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/size',
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
  }
});