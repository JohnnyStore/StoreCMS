var app = new Vue({
  el: '#app',
  data: {
    countryList:[],
    selectedCountry: '',
    provinceID: '',
    provinceNameCN: '',
    provinceNameEN: '',
    provinceNameCNValid: false,
    provinceNameENValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      if(typeof (this.selectedCountry) === 'string'){
        return this.selectedCountry.length > 0
            && this.provinceNameCN.length > 0
            && this.provinceNameEN.length > 0
            && this.provinceNameCNValid
            && this.provinceNameENValid;
      }else{
        return this.selectedCountry > 0
            && this.provinceNameCN.length > 0
            && this.provinceNameEN.length > 0
            && this.provinceNameCNValid
            && this.provinceNameENValid;
      }
    }
  },
  methods:{
    checkProvinceName: function (provinceName, lan) {
      app.$data.provinceNameCNValid = true;
      app.$data.provinceNameENValid = true;
      // if($.trim(provinceName).length === 0){
      //   return false;
      // }
      // $.ajax({
      //   url: '/province/checkProvince?provinceName='+provinceName,
      //   type: 'GET',
      //   success: function(res){
      //     if(res.err){
      //       lan === 'CN' ? app.$data.provinceNameCNValid = false : app.$data.provinceNameENValid = false;
      //       showMessage(res.msg);
      //     }else if(res.exist){
      //       lan === 'CN' ? app.$data.provinceNameCNValid = false : app.$data.provinceNameENValid = false;
      //       showMessage(provinceName + '已存在。');
      //     }else{
      //       lan === 'CN' ? app.$data.provinceNameCNValid = true : app.$data.provinceNameENValid = true;
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
      app.$data.selectedCountry = '';
      app.$data.provinceID = '';
      app.$data.provinceNameCN = '';
      app.$data.provinceNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#province-list tbody tr').eq(rowIndex);
      app.$data.provinceID = $(row).find('td').eq(0).text();
      app.$data.provinceNameCN = $(row).find('td').eq(1).text();
      app.$data.provinceNameEN = $(row).find('td').eq(2).text();
      app.$data.selectedCountry = $(row).find('td').eq(3).find('input').val();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (provinceID, provinceName) {
      var confirmMsg = '您确定要删除' + provinceName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/province?provinceID=' + provinceID,
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
    onProvinceCNBlur: function () {
      app.checkProvinceName(app.$data.provinceNameCN, 'CN');
    },
    onProvinceENBlur: function () {
      app.checkProvinceName(app.$data.provinceNameEN, 'EN');
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
          countryID: app.$data.selectedCountry,
          provinceNameCN: app.$data.provinceNameCN,
          provinceNameEN: app.$data.provinceNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          countryID: app.$data.selectedCountry,
          provinceID: app.$data.provinceID,
          provinceNameCN: app.$data.provinceNameCN,
          provinceNameEN: app.$data.provinceNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/province',
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
  },
  mounted: function () {
    $.ajax({
      url: '/country/all',
      type: 'GET',
      success: function(res){
        if(res.err){
          alertMessage(res.msg);
          //showMessage(res.msg);
        }else{
          app.$data.countryList = res.countryList
        }
      },
      error: function(XMLHttpRequest, textStatus){
        showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
      }
    });
  }
});