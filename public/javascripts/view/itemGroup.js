var app = new Vue({
  el: '#app',
  data: {
    saveType: '',
    itemGroupID: '',
    itemGroupCN: '',
    itemGroupEN: '',
    brandList: [],
    selectedBrand: 0,
    categoryList: [],
    selectedCategory: 0,
    subCategoryList: [],
    selectedSubCategory: 0
  },
  computed: {
    enabledSave: function () {
      return this.selectedBrand > 0
          && this.selectedCategory > 0
          && this.selectedSubCategory > 0
          && this.itemGroupCN.length > 0
          && this.itemGroupEN.length > 0;
    }
  },
  methods: {
    initProcess: function () {
      this.bindBrand();
      this.bindCategory();
      this.bindSubCategory();
    },
    bindBrand: function () {
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
    bindCategory: function () {
      $.ajax({
        url: '/category/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.categoryList = res.categoryList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    bindSubCategory: function () {
      $.ajax({
        url: '/subCategory/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.subCategoryList = res.subCategoryList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onAdd: function () {
      this.saveType = 'add';
      this.itemGroupID = '';
      this.itemGroupCN = '';
      this.itemGroupEN = '';
      this.selectedBrand = 0;
      this.selectedCategory = 0;
      this.selectedSubCategory = 0;
      $('#myModal').modal('show');
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
          // itemGroupID: this.selectedProvince,
          brandID: this.selectedBrand,
          categoryID: this.selectedCategory,
          subCategoryID: this.selectedSubCategory,
          itemGroupCN: this.itemGroupCN,
          itemGroupEN: this.itemGroupEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          itemGroupID: this.itemGroupID,
          brandID: this.selectedBrand,
          categoryID: this.selectedCategory,
          subCategoryID: this.selectedSubCategory,
          itemGroupCN: this.itemGroupCN,
          itemGroupEN: this.itemGroupEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/itemGroup',
        type: dataType,
        dataType: 'json',
        data:saveData,
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            location.reload();
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onChange: function (rowIndex) {
      var row = $('#itemGroup-list tbody tr').eq(rowIndex);
      this.itemGroupID = $(row).find('td').eq(0).text();
      this.selectedBrand = $(row).find('td').eq(1).find('input').val();
      this.selectedCategory = $(row).find('td').eq(2).find('input').val();
      this.selectedSubCategory = $(row).find('td').eq(3).find('input').val();
      this.itemGroupCN = $(row).find('td').eq(4).text();
      this.itemGroupEN = $(row).find('td').eq(5).text();
      app.$data.saveType = 'change';
      $('#myModal').modal('show');
    },
    onDelete: function (itemGroupID, itemGroupName) {
      var confirmMsg = '您确定要删除' + itemGroupName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/itemGroup?itemGroupID=' + itemGroupID,
            type: 'delete',
            dataType: 'json',
            success: function(res){
              if(res.err){
                propAlert(res.msg);
              }else{
                location.reload();
              }
            },
            error: function(XMLHttpRequest){
              propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
            }
          });
        }
      });
    }
  },
  mounted: function () {
    this.initProcess();
  }

});