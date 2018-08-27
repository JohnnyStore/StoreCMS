var app = new Vue({
  el: '#app',
  data: {
    colorID: '',
    colorNameCN: '',
    colorNameEN: '',
    colorNameCNValid: false,
    colorNameENValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.colorNameCN.length > 0
          && this.colorNameEN.length > 0
          && this.colorNameCNValid
          && this.colorNameENValid;
    }
  },
  methods:{
    checkColorName: function (colorName, lan) {
      app.$data.colorNameCNValid = true;
      app.$data.colorNameENValid = true;
      // if($.trim(colorName).length === 0){
      //   return false;
      // }
      // $.ajax({
      //   url: '/color/checkColor?colorName='+colorName,
      //   type: 'GET',
      //   success: function(res){
      //     if(res.err){
      //       lan === 'CN' ? app.$data.colorNameCNValid = false : app.$data.colorNameENValid = false;
      //       showMessage(res.msg);
      //     }else if(res.exist){
      //       lan === 'CN' ? app.$data.colorNameCNValid = false : app.$data.colorNameENValid = false;
      //       showMessage(colorName + '已存在。');
      //     }else{
      //       lan === 'CN' ? app.$data.colorNameCNValid = true : app.$data.colorNameENValid = true;
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
      app.$data.colorID = '';
      app.$data.colorNameCN = '';
      app.$data.colorNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#color-list tbody tr').eq(rowIndex);
      app.$data.colorID = $(row).find('td').eq(0).text();
      app.$data.colorNameCN = $(row).find('td').eq(1).text();
      app.$data.colorNameEN = $(row).find('td').eq(2).text();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (colorID, colorName) {
      var confirmMsg = '您确定要删除商品系列：' + colorName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/color?colorID=' + colorID,
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
    onColorCNBlur: function () {
      app.checkColorName(app.$data.colorNameCN, 'CN');
    },
    onColorENBlur: function () {
      app.checkColorName(app.$data.colorNameEN, 'EN');
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
          colorCN: app.$data.colorNameCN,
          colorEN: app.$data.colorNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          colorID: app.$data.colorID,
          colorCN: app.$data.colorNameCN,
          colorEN: app.$data.colorNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/color',
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