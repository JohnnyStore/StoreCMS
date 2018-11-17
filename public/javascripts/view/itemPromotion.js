var app = new Vue({
  el: '#app',
  data: {
    itemPromotionID: '',
    itemID: 0,
    itemCode:'',
    itemName: '',
    startDate: '',
    endDate: '',
    endDateValid: false,
    promotionPrice4RMB: '',
    promotionPrice4USD: '',
    selectedStatus: '',
    search_itemID: 0,
    search_itemCode:'',
    search_itemName: '',
    search_startDate: '',
    search_endDate: '',
    search_endDateValid: true,
    search_itemValid: true,
    search_selectedStatus: '',
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.itemID > 0
          && this.startDate.length > 0
          && this.endDate.length > 0
          && this.promotionPrice4RMB.length > 0
          && this.promotionPrice4USD.length > 0
          && this.selectedStatus.length > 0
          && this.endDateValid;
    },
    enabledSearch: function () {
      return this.search_itemValid
          && this.search_endDateValid;
    }
  },
  methods:{
    onAdd: function () {
      this.saveType = 'add';
      this.itemHotID = '';
      this.itemID = '';
      this.itemCode='';
      this.itemName = '';
      this.endDateValid = false;
      this.startDate = '';
      this.endDate = '';
      this.promotionPrice4RMB = '';
      this.promotionPrice4USD = '';
      this.selectedStatus = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onShowSearch: function () {
      this.search_itemID = 0;
      this.search_itemCode = '';
      this.search_itemName = '';
      this.search_startDate = '';
      this.search_endDate = '';
      this.search_itemValid = true;
      this.search_endDateValid = true;
      this.search_selectedStatus = '';
      hiddenMessage();
      $('#searchModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#data-list tbody tr').eq(rowIndex);
      app.$data.itemPromotionID = $(row).find('td').eq(0).text();
      app.$data.itemCode = $(row).find('td').eq(1).text();
      app.$data.itemID = $(row).find('td').eq(1).find('input').val();
      app.$data.itemName = $.trim($(row).find('td').eq(2).text());
      app.$data.promotionPrice4RMB = $.trim($(row).find('td').eq(5).text());
      app.$data.promotionPrice4USD = $.trim($(row).find('td').eq(7).text());
      app.$data.startDate = $.trim($(row).find('td').eq(8).text()).substring(0, 10);
      app.$data.endDate = $.trim($(row).find('td').eq(9).text()).substring(0, 10);
      app.$data.selectedStatus = $(row).find('td').eq(10).find('input').val();
      app.$data.saveType = 'change';
      app.$data.endDateValid = true;

      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (itemPromotionID, itemName) {
      var confirmMsg = '您确定要删除促销商品：' + itemName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/itemPromotion?itemPromotionID=' + itemPromotionID,
            type: 'delete',
            dataType: 'json',
            success: function(res){
              if(res.err){
                showMessage(res.msg);
              }else{
                location.href = '/itemPromotion';
              }
            },
            error: function(XMLHttpRequest){
              showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
            }
          });
        }
      });
    },
    onItemCodeBlur: function () {
      if($.trim(this.itemCode).length === 0){
        return false;
      }
      $.ajax({
        url: '/item/byCode?itemCode=' + this.itemCode,
        type: 'get',
        success: function(res){
          if(res.err){
            app.$data.itemID = 0;
            app.$data.itemName = '';
            showMessage(res.msg);
          }else{
            hiddenMessage();
            if(res.data === null){
              app.$data.itemID = 0;
              app.$data.itemName = '';
              showMessage('商品不存在。');
              return false;
            }
            app.$data.itemName = res.data.itemShortDescriptionCN;
            app.$data.itemID = res.data.itemID;
          }
        },
        error: function(XMLHttpRequest){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onSearchItemCodeBlur: function () {
      if($.trim(this.search_itemCode).length === 0){
        return false;
      }
      $.ajax({
        url: '/item/byCode?itemCode=' + this.search_itemCode,
        type: 'get',
        success: function(res){
          if(res.err){
            showMessage(res.msg);
          }else{
            hiddenMessage();
            if(res.data === null){
              app.$data.search_itemName = '';
              app.$data.search_itemValid = false;
              showMessage('商品不存在。');
              return false;
            }
            app.$data.search_itemName = res.data.itemShortDescriptionCN;
            app.$data.search_itemID = res.data.itemID;
            app.$data.search_itemValid = true;
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
    onSearchEndDateBlur: function () {
      if(this.search_startDate.length === 0 || this.search_endDate.length === 0){
        return false;
      }
      var startTime = new Date(Date.parse(this.search_startDate));
      var endDate = new Date(Date.parse(this.search_endDate));
      if(endDate <= startTime){
        this.search_endDateValid = false;
        showMessage('结束时间必须大于开始时间。');
        return false;
      }
      hiddenMessage();
      this.search_endDateValid = true;
    },
    onSearch: function () {
      location.href = '/itemPromotion?itemID=' + this.search_itemID
          + '&startDate=' + this.search_startDate
          + '&endDate=' + this.search_endDate
          + '&status=' + this.search_selectedStatus;
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
          itemID: app.$data.itemID,
          startDate: app.$data.startDate,
          endDate: app.$data.endDate,
          promotionPrice4RMB: app.$data.promotionPrice4RMB,
          promotionPrice4USD: app.$data.promotionPrice4USD,
          status: app.$data.selectedStatus,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          itemPromotionID: app.$data.itemPromotionID,
          itemID: app.$data.itemID,
          startDate: app.$data.startDate,
          endDate: app.$data.endDate,
          promotionPrice4RMB: app.$data.promotionPrice4RMB,
          promotionPrice4USD: app.$data.promotionPrice4USD,
          status: app.$data.selectedStatus,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/itemPromotion',
        type: dataType,
        dataType: 'json',
        data:saveData,
        success: function(res){
          if(res.err){
            showMessage(res.msg);
          }else{
            location.href = '/itemPromotion';
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    }
  }
});