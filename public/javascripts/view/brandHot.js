var app = new Vue({
  el: '#app',
  data: {
    brandHotID: '',
    brandList: [],
    selectedBrand: 0,
    startDate: '',
    endDate: '',
    endDateValid: false,
    selectedStatus: '',
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.selectedBrand > 0
          && this.startDate.length > 0
          && this.endDate.length > 0
          && this.selectedStatus.length > 0
          && this.endDateValid;
    }
  },
  methods:{
    initProcess: function () {
      $.ajax({
        url: '/brand/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.brandList = res.brandList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onAdd: function () {
      this.saveType = 'add';
      this.brandHotID = '';
      this.selectedBrand = 0;
      this.endDateValid = false;
      this.startDate = '';
      this.endDate = '';
      this.selectedStatus = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#data-list tbody tr').eq(rowIndex);
      app.$data.brandHotID = $(row).find('td').eq(0).text();
      app.$data.selectedBrand = $(row).find('td').eq(1).find('input').val();
      app.$data.startDate = $.trim($(row).find('td').eq(3).text()).replace(' ', 'T');
      app.$data.endDate = $.trim($(row).find('td').eq(4).text()).replace(' ', 'T');
      app.$data.selectedStatus = $(row).find('td').eq(5).find('input').val();
      app.$data.saveType = 'change';
      app.$data.endDateValid = true;
      app.$data.brandValid = true;

      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (brandHotID, brandName) {
      var confirmMsg = '您确定要删除热销品牌：' + brandName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/brandHot?brandHotID=' + brandHotID,
            type: 'delete',
            dataType: 'json',
            success: function(res){
              if(res.err){
                showMessage(res.msg);
              }else{
                location.reload();
              }
            },
            error: function(XMLHttpRequest){
              showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
            }
          });
        }
      });
    },
    onBrandIDBlur: function () {
      if($.trim(this.brandID).length === 0){
        return false;
      }
      $.ajax({
        url: '/brand/detail?brandID=' + this.brandID,
        type: 'get',
        success: function(res){
          if(res.err){
            showMessage(res.msg);
          }else{
            hiddenMessage();
            if(res.data === null){
              app.$data.brandValid = false;
              app.$data.brandName = '';
              showMessage('品牌不存在。');
              return false;
            }
            app.$data.brandName = res.data.brandCN;
            app.$data.brandValid = true;
          }
        },
        error: function(XMLHttpRequest){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });

    },
    onEndDateBlur: function () {
      if(this.startDate.length === 0 || this.endDate.length === 0){
        return false;
      }
      var startTime = new Date(Date.parse(this.startDate));
      var endDate = new Date(Date.parse(this.endDate));
      if(endDate <= startTime){
        this.endDateValid = false;
        showMessage('结束时间必须大于开始时间。');
        return false;
      }
      this.endDateValid = true;
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
          brandID: app.$data.selectedBrand,
          startDate: app.$data.startDate,
          endDate: app.$data.endDate,
          status: app.$data.selectedStatus,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          brandHotID: app.$data.brandHotID,
          brandID: app.$data.selectedBrand,
          startDate: app.$data.startDate,
          endDate: app.$data.endDate,
          status: app.$data.selectedStatus,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/brandHot',
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
    this.initProcess();
  }
});