var app = new Vue({
  el: '#app',
  data: {
    subCategoryID: '',
    subCategoryNameCN: '',
    subCategoryNameEN: '',
    subCategoryNameCNValid: false,
    subCategoryNameENValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.subCategoryNameCN.length > 0
          && this.subCategoryNameEN.length > 0
          && this.subCategoryNameCNValid > 0
          && this.subCategoryNameENValid > 0;
    }
  },
  methods:{
    checkSubCategoryName: function (subCategoryName, lan) {
      app.$data.subCategoryNameCNValid = true;
      app.$data.subCategoryNameENValid = true;
      // if($.trim(subCategoryName).length === 0){
      //   return false;
      // }
      // $.ajax({
      //   url: '/subCategory/checkSubCategory?subCategoryName='+subCategoryName,
      //   type: 'GET',
      //   success: function(res){
      //     if(res.err){
      //       lan === 'CN' ? app.$data.subCategoryNameCNValid = false : app.$data.subCategoryNameENValid = false;
      //       showMessage(res.msg);
      //     }else if(res.exist){
      //       lan === 'CN' ? app.$data.subCategoryNameCNValid = false : app.$data.subCategoryNameENValid = false;
      //       showMessage(subCategoryName + '已存在。');
      //     }else{
      //       lan === 'CN' ? app.$data.subCategoryNameCNValid = true : app.$data.subCategoryNameENValid = true;
      //       hiddenMessage();
      //     }
      //   },
      //   error: function(XMLHttpRequest, textStatus){
      //     showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
      //   }
      // });
    },
    onUpload: function () {
      app.$data.subCategoryID = $(row).find('td').eq(0).text();
      app.$data.subCategoryNameCN = $(row).find('td').eq(1).text();
      app.$data.subCategoryNameEN = $(row).find('td').eq(2).text();
    },
    onAdd: function () {
      app.$data.saveType = 'add';
      app.$data.subCategoryID = '';
      app.$data.subCategoryNameCN = '';
      app.$data.subCategoryNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#subCategory-list tbody tr').eq(rowIndex);
      app.$data.subCategoryID = $(row).find('td').eq(0).text();
      app.$data.subCategoryNameCN = $(row).find('td').eq(1).text();
      app.$data.subCategoryNameEN = $(row).find('td').eq(2).text();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (subCategoryID, subCategoryName) {
      var confirmMsg = '您确定要删除商品二级分类：' + subCategoryName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/subCategory?subCategoryID=' + subCategoryID,
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
    onSubCategoryCNBlur: function () {
      app.checkSubCategoryName(app.$data.subCategoryNameCN, 'CN');
    },
    onSubCategoryENBlur: function () {
      app.checkSubCategoryName(app.$data.subCategoryNameEN, 'EN');
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
          subCategoryCN: app.$data.subCategoryNameCN,
          subCategoryEN: app.$data.subCategoryNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          subCategoryID: app.$data.subCategoryID,
          subCategoryCN: app.$data.subCategoryNameCN,
          subCategoryEN: app.$data.subCategoryNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/subCategory',
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