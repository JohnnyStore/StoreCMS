var app = new Vue({
  el: '#app',
  data: {
    countryID: '',
    countryNameCN: '',
    countryNameEN: '',
    countryNameCNValid:false,
    countryNameENValid:false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.countryNameCN.length > 0
          && this.countryNameEN.length > 0
          && this.countryNameCNValid &&
          this.countryNameENValid;

    }
  },
  methods:{
    checkCountryName: function (countryName, lan) {
      app.$data.countryNameCNValid = true;
      app.$data.countryNameENValid = true;
      // if($.trim(countryName).length === 0){
      //   return false;
      // }
      // $.ajax({
      //   url: '/country/checkCountry?countryName='+countryName,
      //   type: 'GET',
      //   success: function(res){
      //     if(res.err){
      //       lan === 'CN' ? app.$data.countryNameCNValid = false : app.$data.countryNameENValid = false;
      //       showMessage(res.msg);
      //     }else if(res.exist){
      //       lan === 'CN' ? app.$data.countryNameCNValid = false : app.$data.countryNameENValid = false;
      //       showMessage(countryName + '已存在。');
      //     }else{
      //       lan === 'CN' ? app.$data.countryNameCNValid = true : app.$data.countryNameENValid = true;
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
      app.$data.countryID = '';
      app.$data.countryNameCN = '';
      app.$data.countryNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#country-list tbody tr').eq(rowIndex);
      app.$data.countryID = $(row).find('td').eq(0).text();
      app.$data.countryNameCN = $(row).find('td').eq(1).text();
      app.$data.countryNameEN = $(row).find('td').eq(2).text();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (countryID, countryName) {
      var confirmMsg = '您确定要删除国家：' + countryName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/country?countryID=' + countryID,
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
    onCountryCNBlur: function () {
      app.checkCountryName(app.$data.countryNameCN, 'CN');
    },
    onCountryENBlur: function () {
      app.checkCountryName(app.$data.countryNameEN, 'EN');
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
          countryNameCN: app.$data.countryNameCN,
          countryNameEN: app.$data.countryNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          countryID: app.$data.countryID,
          countryNameCN: app.$data.countryNameCN,
          countryNameEN: app.$data.countryNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/country',
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