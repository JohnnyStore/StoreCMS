var app = new Vue({
  el: '#app',
  data: {
    categoryID: '',
    categoryNameCN: '',
    categoryNameEN: '',
    categoryNameCNValid: false,
    categoryNameENValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.categoryNameCN.length > 0
          && this.categoryNameEN.length > 0
          && this.categoryNameCNValid > 0
          && this.categoryNameENValid > 0;
    }
  },
  methods:{
    checkCategoryName: function (categoryName, lan) {
      app.$data.categoryNameCNValid = true;
      app.$data.categoryNameENValid = true;
      // if($.trim(categoryName).length === 0){
      //   return false;
      // }
      // $.ajax({
      //   url: '/category/checkCategory?categoryName='+categoryName,
      //   type: 'GET',
      //   success: function(res){
      //     if(res.err){
      //       lan === 'CN' ? app.$data.categoryNameCNValid = false : app.$data.categoryNameENValid = false;
      //       showMessage(res.msg);
      //     }else if(res.exist){
      //       lan === 'CN' ? app.$data.categoryNameCNValid = false : app.$data.categoryNameENValid = false;
      //       showMessage(categoryName + '已存在。');
      //     }else{
      //       lan === 'CN' ? app.$data.categoryNameCNValid = true : app.$data.categoryNameENValid = true;
      //       hiddenMessage();
      //     }
      //   },
      //   error: function(XMLHttpRequest, textStatus){
      //     showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
      //   }
      // });
    },
    onUpload: function () {
      app.$data.categoryID = $(row).find('td').eq(0).text();
      app.$data.categoryNameCN = $(row).find('td').eq(1).text();
      app.$data.categoryNameEN = $(row).find('td').eq(2).text();
    },
    onAdd: function () {
      app.$data.saveType = 'add';
      app.$data.categoryID = '';
      app.$data.categoryNameCN = '';
      app.$data.categoryNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#category-list tbody tr').eq(rowIndex);
      app.$data.categoryID = $(row).find('td').eq(0).text();
      app.$data.categoryNameCN = $(row).find('td').eq(1).text();
      app.$data.categoryNameEN = $(row).find('td').eq(2).text();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (categoryID, categoryName) {
      var confirmMsg = '您确定要删除商品一级分类：' + categoryName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/category?categoryID=' + categoryID,
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
    onCategoryCNBlur: function () {
      app.checkCategoryName(app.$data.categoryNameCN, 'CN');
    },
    onCategoryENBlur: function () {
      app.checkCategoryName(app.$data.categoryNameEN, 'EN');
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
          categoryCN: app.$data.categoryNameCN,
          categoryEN: app.$data.categoryNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          categoryID: app.$data.categoryID,
          categoryCN: app.$data.categoryNameCN,
          categoryEN: app.$data.categoryNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/category',
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