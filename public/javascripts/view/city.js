var app = new Vue({
  el: '#app',
  data: {
    provinceList:[],
    countryList:[],
    selectedProvince: '',
    selectedCountry: '',
    cityID: '',
    cityNameCN: '',
    cityNameEN: '',
    cityNameCNValid: false,
    cityNameENValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      if(typeof (this.selectedProvince) === 'string' && typeof (this.selectedCountry) === 'string'){
        return this.selectedProvince.length > 0
            && this.selectedCountry.length > 0
            && this.cityNameCN.length > 0
            && this.cityNameEN.length > 0
            && this.cityNameCNValid
            && this.cityNameENValid;
      }else{
        return this.selectedProvince > 0
            && this.selectedCountry > 0
            && this.cityNameCN.length > 0
            && this.cityNameEN.length > 0
            && this.cityNameCNValid
            && this.cityNameENValid;
      }
    }
  },
  methods:{
    bindProvince: function (countryID, provinceID) {
      $.ajax({
        url: '/province/provinceForCountry?countryID=' + countryID,
        type: 'GET',
        success: function(res){
          if(res.err){
            alertMessage(res.msg);
          }else{
            app.$data.provinceList = res.provinceList;
            if(provinceID !== undefined && provinceID !== ''){
              app.$data.selectedProvince = provinceID;
            }
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onCountryChange: function () {
      var countryID = app.$data.selectedCountry;
      if(countryID === ''){
        return false;
      }
      app.bindProvince(countryID);
    },
    checkCityName: function (cityName, lan) {
      app.$data.cityNameCNValid = true;
      app.$data.cityNameENValid = true;
      // if($.trim(cityName).length === 0){
      //   return false;
      // }
      // $.ajax({
      //   url: '/city/checkCity?cityName=' + cityName,
      //   type: 'GET',
      //   success: function(res){
      //     if(res.err){
      //       lan === 'CN' ? app.$data.cityNameCNValid = false : app.$data.cityNameENValid = false;
      //       showMessage(res.msg);
      //     }else if(res.exist){
      //       lan === 'CN' ? app.$data.cityNameCNValid = false : app.$data.cityNameENValid = false;
      //       showMessage(cityName + '已存在。');
      //     }else{
      //       lan === 'CN' ? app.$data.cityNameCNValid = true : app.$data.cityNameENValid = true;
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
      app.$data.selectedProvince = '';
      app.$data.selectedCountry = '';
      app.$data.cityID = '';
      app.$data.cityNameCN = '';
      app.$data.cityNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#city-list tbody tr').eq(rowIndex);
      app.$data.cityID = $(row).find('td').eq(0).text();
      app.$data.cityNameCN = $(row).find('td').eq(1).text();
      app.$data.cityNameEN = $(row).find('td').eq(2).text();
      //app.$data.selectedProvince = $(row).find('td').eq(3).find('input').val();
      var provinceID = $(row).find('td').eq(3).find('input').val();
      app.$data.selectedCountry = $(row).find('td').eq(5).find('input').val();
      app.$data.saveType = 'change';
      hiddenMessage();
      app.bindProvince(app.$data.selectedCountry, provinceID);
      $('#myModal').modal('show');
    },
    onDelete: function (cityID, cityName) {
      var confirmMsg = '您确定要删除' + cityName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/city?cityID=' + cityID,
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
    onCityCNBlur: function () {
      app.checkCityName(app.$data.cityNameCN, 'CN');
    },
    onCityENBlur: function () {
      app.checkCityName(app.$data.cityNameEN, 'EN');
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
          provinceID: app.$data.selectedProvince,
          countryID: app.$data.selectedCountry,
          cityNameCN: app.$data.cityNameCN,
          cityNameEN: app.$data.cityNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          provinceID: app.$data.selectedProvince,
          countryID: app.$data.selectedCountry,
          cityID: app.$data.cityID,
          cityNameCN: app.$data.cityNameCN,
          cityNameEN: app.$data.cityNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/city',
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