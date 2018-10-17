var app = new Vue({
  el: '#app',
  data: {
    brandID: '',
    brandNameCN: '',
    brandNameEN: '',
    brandImageID: '',
    brandImageUrl: '',
    brandImageName: '',
    brandNameCNValid: false,
    brandNameENValid: false,
    uploadEnabled: false,
    showImage: true,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.brandNameCN.length > 0
          && this.brandNameEN.length > 0
          && this.brandImageUrl.length > 0;
    },
    enabledUpload: function () {
      return this.brandNameCN.length > 0
          && this.brandNameEN.length > 0
          && this.brandImageName.length > 0;
    }
  },
  methods:{
    checkBrandName: function (brandName, lan) {
      app.$data.brandNameCNValid = true;
      app.$data.brandNameENValid = true;
    },
    onUpload: function () {
      var file = $('#demo-fileInput-4')[0].files;
      if(file.length === 0){
        showMessage('请选择需要上传的图片。');
        return false;
      }
      var formData = new FormData();
      formData.append('file',file[0]);
      //利用split切割，拿到上传文件的格式
      var src=file[0].name;
      var formart=src.split(".")[1];
      if(formart !== 'jpg' && formart !== 'png'){
        showMessage('文件格式不正确，仅支持jpg和png格式的图片。');
        return false;
      }
      $.ajax({
        url: "/brand/imageUpload",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType:"json",
        success : function(res) {
          if (res.err) {
            showMessage('图片上传失败。');
          } else {
            app.$data.brandImageUrl = res.imageUrl;
            showMessage('图片上传成功。');
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          showMessage('无法连接服务器，请检查网络连接。');
        }
      });
    },
    onAdd: function () {
      app.$data.saveType = 'add';
      app.$data.brandID = '';
      app.$data.brandNameCN = '';
      app.$data.brandNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#brand-list tbody tr').eq(rowIndex);
      app.$data.brandID = $(row).find('td').eq(0).text();
      app.$data.brandNameCN = $(row).find('td').eq(1).text();
      app.$data.brandNameEN = $(row).find('td').eq(2).text();
      app.$data.brandImageID = $(row).find('td').eq(3).find('input').val();
      app.$data.brandImageUrl = $(row).find('td').eq(3).find('img').attr('src');
      this.showImage = true;
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChangeImage: function () {
      this.showImage = false;
    },
    onCancel: function () {
      this.showImage = true;
    },
    onDelete: function (brandID, brandName) {
      var confirmMsg = '您确定要删除品牌：' + brandName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/brand?brandID=' + brandID,
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
    onBrandCNBlur: function () {
      app.checkBrandName(app.$data.brandNameCN, 'CN');
    },
    onBrandENBlur: function () {
      app.checkBrandName(app.$data.brandNameEN, 'EN');
    },
    onFileChange: function () {
      var file = $('#demo-fileInput-4')[0].files;
      app.$data.brandImageName = file[0].name;
      hiddenMessage();
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
          brandCN: app.$data.brandNameCN,
          brandEN: app.$data.brandNameEN,
          brandImageUrl: app.$data.brandImageUrl,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          brandID: app.$data.brandID,
          brandCN: app.$data.brandNameCN,
          brandEN: app.$data.brandNameEN,
          brandImageID: app.$data.brandImageID,
          brandImageUrl: app.$data.brandImageUrl,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/brand',
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