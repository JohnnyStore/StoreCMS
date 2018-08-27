var app = new Vue({
  el: '#app',
  data: {
    materialID: '',
    materialNameCN: '',
    materialNameEN: '',
    materialNameCNValid: false,
    materialNameENValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.materialNameCN.length > 0 &&
          this.materialNameEN.length > 0 &&
          this.materialNameCNValid &&
          this.materialNameENValid;
    }
  },
  methods:{
    checkMaterialName: function (materialName, lan) {
      app.$data.materialNameCNValid = true;
      app.$data.materialNameENValid = true;
      // if($.trim(materialName).length === 0){
      //   return false;
      // }
      // $.ajax({
      //   url: '/material/checkMaterial?materialName='+materialName,
      //   type: 'GET',
      //   success: function(res){
      //     if(res.err){
      //       lan === 'CN' ? app.$data.materialNameCNValid = false : app.$data.materialNameENValid = false;
      //       showMessage(res.msg);
      //     }else if(res.exist){
      //       lan === 'CN' ? app.$data.materialNameCNValid = false : app.$data.materialNameENValid = false;
      //       showMessage(materialName + '已存在。');
      //     }else{
      //       lan === 'CN' ? app.$data.materialNameCNValid = true : app.$data.materialNameENValid = true;
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
      app.$data.materialID = '';
      app.$data.materialNameCN = '';
      app.$data.materialNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#material-list tbody tr').eq(rowIndex);
      app.$data.materialID = $(row).find('td').eq(0).text();
      app.$data.materialNameCN = $(row).find('td').eq(1).text();
      app.$data.materialNameEN = $(row).find('td').eq(2).text();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (materialID, materialName) {
      var confirmMsg = '您确定要删除商品材质：' + materialName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/material?materialID=' + materialID,
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
    onMaterialCNBlur: function () {
      app.checkMaterialName(app.$data.materialNameCN, 'CN');
    },
    onMaterialENBlur: function () {
      app.checkMaterialName(app.$data.materialNameEN, 'EN');
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
          materialCN: app.$data.materialNameCN,
          materialEN: app.$data.materialNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          materialID: app.$data.materialID,
          materialCN: app.$data.materialNameCN,
          materialEN: app.$data.materialNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/material',
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