var app = new Vue({
  el: '#app',
  data: {
    seriesID: '',
    itemSeriesNameCN: '',
    itemSeriesNameEN: '',
    itemSeriesNameCNValid: false,
    itemSeriesNameENValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.itemSeriesNameCN.length > 0
          && this.itemSeriesNameEN.length > 0
          && this.itemSeriesNameCNValid > 0
          && this.itemSeriesNameENValid > 0;
    }
  },
  methods:{
    checkItemSeriesName: function (itemSeriesName, lan) {
      app.$data.itemSeriesNameCNValid = true;
      app.$data.itemSeriesNameENValid = true;
      // if($.trim(itemSeriesName).length === 0){
      //   return false;
      // }
      // $.ajax({
      //   url: '/itemSeries/checkItemSeries?itemSeriesName='+itemSeriesName,
      //   type: 'GET',
      //   success: function(res){
      //     if(res.err){
      //       lan === 'CN' ? app.$data.itemSeriesNameCNValid = false : app.$data.itemSeriesNameENValid = false;
      //       showMessage(res.msg);
      //     }else if(res.exist){
      //       lan === 'CN' ? app.$data.itemSeriesNameCNValid = false : app.$data.itemSeriesNameENValid = false;
      //       showMessage(itemSeriesName + '已存在。');
      //     }else{
      //       lan === 'CN' ? app.$data.itemSeriesNameCNValid = true : app.$data.itemSeriesNameENValid = true;
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
      app.$data.seriesID = '';
      app.$data.itemSeriesNameCN = '';
      app.$data.itemSeriesNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#itemSeries-list tbody tr').eq(rowIndex);
      app.$data.seriesID = $(row).find('td').eq(0).text();
      app.$data.itemSeriesNameCN = $(row).find('td').eq(1).text();
      app.$data.itemSeriesNameEN = $(row).find('td').eq(2).text();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (seriesID, itemSeriesName) {
      var confirmMsg = '您确定要删除商品系列：' + itemSeriesName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/itemSeries?seriesID=' + seriesID,
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
    onItemSeriesCNBlur: function () {
      app.checkItemSeriesName(app.$data.itemSeriesNameCN, 'CN');
    },
    onItemSeriesENBlur: function () {
      app.checkItemSeriesName(app.$data.itemSeriesNameEN, 'EN');
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
          itemSeriesCN: app.$data.itemSeriesNameCN,
          itemSeriesEN: app.$data.itemSeriesNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          seriesID: app.$data.seriesID,
          itemSeriesCN: app.$data.itemSeriesNameCN,
          itemSeriesEN: app.$data.itemSeriesNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/itemSeries',
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