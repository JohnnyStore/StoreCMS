var app = new Vue({
  el: '#app',
  data: {
    show: false,
    optionType: '',
    itemID: '',
    image1_big: '',
    image1_normal: '',
    image1_thumbnail: '',
    image2_big: '',
    image2_normal: '',
    image2_thumbnail: '',
    image3_big: '',
    image3_normal: '',
    image3_thumbnail: '',
    image4_big: '',
    image4_normal: '',
    image4_thumbnail: '',
    image5_big: '',
    image5_normal: '',
    image5_thumbnail: '',

    image1_big_url: '',
    image1_normal_url: '',
    image1_thumbnail_url: '',
    image2_big_url: '',
    image2_normal_url: '',
    image2_thumbnail_url: '',
    image3_big_url: '',
    image3_normal_url: '',
    image3_thumbnail_url: '',
    image4_big_url: '',
    image4_normal_url: '',
    image4_thumbnail_url: '',
    image5_big_url: '',
    image5_normal_url: '',
    image5_thumbnail_url: '',
    imageDetail: [],
    imageDetail_url: [],

    image1_big_upload_show: false,
    image1_normal_upload_show: false,
    image1_thumbnail_upload_show: false,
    image2_big_upload_show: false,
    image2_normal_upload_show: false,
    image2_thumbnail_upload_show: false,
    image3_big_upload_show: false,
    image3_normal_upload_show: false,
    image3_thumbnail_upload_show: false,
    image4_big_upload_show: false,
    image4_normal_upload_show: false,
    image4_thumbnail_upload_show: false,
    image5_big_upload_show: false,
    image5_normal_upload_show: false,
    image5_thumbnail_upload_show: false,
    image_detail_upload_show: false,

    uploadResult: '',
    enabledSave: false
  },
  computed: {
    enabledUpload: function () {
      return this.image1_big.length > 0
          // && this.image1_normal.length > 0
          // && this.image1_thumbnail.length > 0
          // && this.image2_big.length > 0
          // && this.image2_normal.length > 0
          // && this.image2_thumbnail.length > 0
          // && this.image3_big.length > 0
          // && this.image3_normal.length > 0
          // && this.image3_thumbnail.length > 0
          // && this.image4_big.length > 0
          // && this.image4_normal.length > 0
          // && this.image4_thumbnail.length > 0
          // && this.image5_big.length > 0
          // && this.image5_normal.length > 0
          // && this.image5_thumbnail.length > 0
          // && this.imageDetail.length > 0
          ;
    }
  },
  methods: {
    initProcess: function () {
      this.optionType = $('#hidden-optionType').val();
      this.itemID = $('#hidden-itemID').val();
      if(this.optionType === 'upd'){
        this.setImage();
      }
    },
    setImage: function () {
      $.ajax({
        url: '/uploadItemImage/image?itemID=' + this.itemID,
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            for(var i = 0; i <= res.data.length - 1; i++){
              if(res.data[i].groupID === 0){
                app.$data.imageDetail_url.push(res.data[i].imageSrc);
                app.$data.imageDetail.push(res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1));
              }
              if(res.data[i].groupID === 1){
                if(res.data[i].imageType === 'B'){
                  app.$data.image1_big_url = res.data[i].imageSrc;
                  app.$data.image1_big = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'N'){
                  app.$data.image1_normal_url = res.data[i].imageSrc;
                  app.$data.image1_normal = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'T'){
                  app.$data.image1_thumbnail_url = res.data[i].imageSrc;
                  app.$data.image1_thumbnail = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
              }
              if(res.data[i].groupID === 2){
                if(res.data[i].imageType === 'B'){
                  app.$data.image2_big_url = res.data[i].imageSrc;
                  app.$data.image2_big = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'N'){
                  app.$data.image2_normal_url = res.data[i].imageSrc;
                  app.$data.image2_normal = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'T'){
                  app.$data.image2_thumbnail_url = res.data[i].imageSrc;
                  app.$data.image2_thumbnail = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
              }
              if(res.data[i].groupID === 3){
                if(res.data[i].imageType === 'B'){
                  app.$data.image3_big_url = res.data[i].imageSrc;
                  app.$data.image3_big = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'N'){
                  app.$data.image3_normal_url = res.data[i].imageSrc;
                  app.$data.image3_normal = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'T'){
                  app.$data.image3_thumbnail_url = res.data[i].imageSrc;
                  app.$data.image3_thumbnail = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
              }
              if(res.data[i].groupID === 4){
                if(res.data[i].imageType === 'B'){
                  app.$data.image4_big_url = res.data[i].imageSrc;
                  app.$data.image4_big = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'N'){
                  app.$data.image4_normal_url = res.data[i].imageSrc;
                  app.$data.image4_normal = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'T'){
                  app.$data.image4_thumbnail_url = res.data[i].imageSrc;
                  app.$data.image4_thumbnail = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
              }
              if(res.data[i].groupID === 5){
                if(res.data[i].imageType === 'B'){
                  app.$data.image5_big_url = res.data[i].imageSrc;
                  app.$data.image5_big = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'N'){
                  app.$data.image5_normal_url = res.data[i].imageSrc;
                  app.$data.image5_normal = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
                if(res.data[i].imageType === 'T'){
                  app.$data.image5_thumbnail_url = res.data[i].imageSrc;
                  app.$data.image5_thumbnail = res.data[i].imageSrc.substring(res.data[i].imageSrc.lastIndexOf('/') + 1);
                }
              }
            }
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('无法连接网络,，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onFileChange: function (selector) {
      switch (selector.substring(1)){
        case 'image1-big':
          this.image1_big = $(selector)[0].files[0].name;
          break;
        case 'image1-normal':
          this.image1_normal = $(selector)[0].files[0].name;
          break;
        case 'image1-thumbnail':
          this.image1_thumbnail = $(selector)[0].files[0].name;
          break;
        case 'image2-big':
          this.image2_big = $(selector)[0].files[0].name;
          break;
        case 'image2-normal':
          this.image2_normal = $(selector)[0].files[0].name;
          break;
        case 'image2-thumbnail':
          this.image2_thumbnail = $(selector)[0].files[0].name;
          break;
        case 'image3-big':
          this.image3_big = $(selector)[0].files[0].name;
          break;
        case 'image3-normal':
          this.image3_normal = $(selector)[0].files[0].name;
          break;
        case 'image3-thumbnail':
          this.image3_thumbnail = $(selector)[0].files[0].name;
          break;
        case 'image4-big':
          this.image4_big = $(selector)[0].files[0].name;
          break;
        case 'image4-normal':
          this.image4_normal = $(selector)[0].files[0].name;
          break;
        case 'image4-thumbnail':
          this.image4_thumbnail = $(selector)[0].files[0].name;
          break;
        case 'image5-big':
          this.image5_big = $(selector)[0].files[0].name;
          break;
        case 'image5-normal':
          this.image5_normal = $(selector)[0].files[0].name;
          break;
        case 'image5-thumbnail':
          this.image5_thumbnail = $(selector)[0].files[0].name;
          break;
        case 'image-detail':
          for (var i = 0; i <= $(selector)[0].files.length - 1; i++){
            this.imageDetail.push($(selector)[0].files[i].name);
          }
          break;
      }
    },
    onUpload: function () {
      var $btn = $('#btnUpload').button('loading');
      var uploadedUrl = '';
      uploadedUrl = this.upload('.image1-big');
      if(uploadedUrl !== ''){
        this.image1_big_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image1-normal');
      if(uploadedUrl !== ''){
        this.image1_normal_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image1-thumbnail');
      if(uploadedUrl !== ''){
        this.image1_thumbnail_url = uploadedUrl;
      }

      uploadedUrl = this.upload('.image2-big');
      if(uploadedUrl !== ''){
        this.image2_big_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image2-normal');
      if(uploadedUrl !== ''){
        this.image2_normal_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image2-thumbnail');
      if(uploadedUrl !== ''){
        this.image2_thumbnail_url = uploadedUrl;
      }

      uploadedUrl = this.upload('.image3-big');
      if(uploadedUrl !== ''){
        this.image3_big_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image3-normal');
      if(uploadedUrl !== ''){
        this.image3_normal_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image3-thumbnail');
      if(uploadedUrl !== ''){
        this.image3_thumbnail_url = uploadedUrl;
      }


      uploadedUrl = this.upload('.image4-big');
      if(uploadedUrl !== ''){
        this.image4_big_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image4-normal');
      if(uploadedUrl !== ''){
        this.image4_normal_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image4-thumbnail');
      if(uploadedUrl !== ''){
        this.image4_thumbnail_url = uploadedUrl;
      }

      uploadedUrl = this.upload('.image5-big');
      if(uploadedUrl !== ''){
        this.image5_big_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image5-normal');
      if(uploadedUrl !== ''){
        this.image5_normal_url = uploadedUrl;
      }
      uploadedUrl = this.upload('.image5-thumbnail');
      if(uploadedUrl !== ''){
        this.image5_thumbnail_url = uploadedUrl;
      }

      uploadedUrl = this.upload('.image-detail').split('|');
      if(uploadedUrl !== ''){
        this.imageDetail_url = uploadedUrl;
      }

      $btn.button('reset');
      if(this.uploadResult.length === 0){
        this.save();
        location.href = '/addItemSuccess?optionType='+this.optionType;
      }else{
        propAlert(this.uploadResult);
      }
    },
    onEdit: function (selector) {
      switch (selector.substring(1)){
        case 'image1-big':
          this.image1_big_upload_show = true;
          break;
        case 'image1-normal':
          this.image1_normal_upload_show = true;
          break;
        case 'image1-thumbnail':
          this.image1_thumbnail_upload_show = true;
          break;
        case 'image2-big':
          this.image2_big_upload_show = true;
          break;
        case 'image2-normal':
          this.image2_normal_upload_show = true;
          break;
        case 'image2-thumbnail':
          this.image2_thumbnail_upload_show = true;
          break;

        case 'image3-big':
          this.image3_big_upload_show = true;
          break;
        case 'image3-normal':
          this.image3_normal_upload_show = true;
          break;
        case 'image3-thumbnail':
          this.image3_thumbnail_upload_show = true;
          break;
        case 'image4-big':
          this.image4_big_upload_show = true;
          break;
        case 'image4-normal':
          this.image4_normal_upload_show = true;
          break;
        case 'image4-thumbnail':
          this.image4_thumbnail_upload_show = true;
          break;
        case 'image5-big':
          this.image5_big_upload_show = true;
          break;
        case 'image5-normal':
          this.image5_normal_upload_show = true;
          break;
        case 'image5-thumbnail':
          this.image5_thumbnail_upload_show = true;
          break;
        case 'image-detail':
          this.image_detail_upload_show = true;
          break;
      }
    },
    onCancel: function (selector) {
      switch (selector.substring(1)){
        case 'image1-big':
          this.image1_big_upload_show = false;
          break;
        case 'image1-normal':
          this.image1_normal_upload_show = false;
          break;
        case 'image1-thumbnail':
          this.image1_thumbnail_upload_show = false;
          break;
        case 'image2-big':
          this.image2_big_upload_show = false;
          break;
        case 'image2-normal':
          this.image2_normal_upload_show = false;
          break;
        case 'image2-thumbnail':
          this.image2_thumbnail_upload_show = false;
          break;

        case 'image3-big':
          this.image3_big_upload_show = false;
          break;
        case 'image3-normal':
          this.image3_normal_upload_show = false;
          break;
        case 'image3-thumbnail':
          this.image3_thumbnail_upload_show = false;
          break;
        case 'image4-big':
          this.image4_big_upload_show = false;
          break;
        case 'image4-normal':
          this.image4_normal_upload_show = false;
          break;
        case 'image4-thumbnail':
          this.image4_thumbnail_upload_show = false;
          break;
        case 'image5-big':
          this.image5_big_upload_show = false;
          break;
        case 'image5-normal':
          this.image5_normal_upload_show = false;
          break;
        case 'image5-thumbnail':
          this.image5_thumbnail_upload_show = false;
          break;
        case 'image-detail':
          this.image_detail_upload_show = false;
          break;
      }
    },
    save: function () {
      var data = {
        itemID: '',
        imageList: [],
        imageDetailList: []
      };
      data.itemID = this.itemID;

      data.imageList.push({
        id: 1,
        image_big_url: this.image1_big_url,
        image_normal_url: this.image1_normal_url,
        image_thumbnail_url: this.image1_thumbnail_url
      });
      data.imageList.push({
        id: 2,
        image_big_url: this.image2_big_url,
        image_normal_url: this.image2_normal_url,
        image_thumbnail_url: this.image2_thumbnail_url
      });
      data.imageList.push({
        id: 3,
        image_big_url: this.image3_big_url,
        image_normal_url: this.image3_normal_url,
        image_thumbnail_url: this.image3_thumbnail_url
      });
      data.imageList.push({
        id: 4,
        image_big_url: this.image4_big_url,
        image_normal_url: this.image4_normal_url,
        image_thumbnail_url: this.image4_thumbnail_url
      });
      data.imageList.push({
        id: 5,
        image_big_url: this.image5_big_url,
        image_normal_url: this.image5_normal_url,
        image_thumbnail_url: this.image5_thumbnail_url
      });
      data.imageDetailList = this.imageDetail_url;
      var errorArr = [];
      for(var i = 0; i <= data.imageList.length - 1; i++){
        $.ajax({
          url: "/uploadItemImage",
          async: false,
          type: 'POST',
          data: {
            imageSrc: data.imageList[i].image_big_url,
            parentImageSrc: '',
            objectID: data.itemID,
            objectType: 'I',
            groupID: data.imageList[i].id,
            imageType: 'B',
            loginUser: getLoginUser()
          },
          dataType:"json",
          success : function(res) {
            if (res.err) {
              errorArr.push(data.imageList[i].image_big_url);
            }
          },
          error: function () {

          }
        });

        $.ajax({
          url: "/uploadItemImage",
          async: false,
          type: 'POST',
          data: {
            imageSrc: data.imageList[i].image_normal_url,
            parentImageSrc: data.imageList[i].image_big_url,
            objectID: data.itemID,
            objectType: 'I',
            groupID: data.imageList[i].id,
            imageType: 'N',
            loginUser: getLoginUser()
          },
          dataType:"json",
          success : function(res) {
            if (res.err) {
              errorArr.push(data.imageList[i].image_normal_url);
            }
          },
          error: function () {

          }
        });

        $.ajax({
          url: "/uploadItemImage",
          async: false,
          type: 'POST',
          data: {
            imageSrc: data.imageList[i].image_thumbnail_url,
            parentImageSrc: data.imageList[i].image_normal_url,
            objectID: data.itemID,
            objectType: 'I',
            groupID: data.imageList[i].id,
            imageType: 'T',
            loginUser: getLoginUser()
          },
          dataType:"json",
          success : function(res) {
            if (res.err) {
              errorArr.push(data.imageList[i].image_thumbnail_url);
            }
          },
          error: function () {

          }
        });
      }

      $.ajax({
        url: "/uploadItemImage",
        async: false,
        type: 'POST',
        data: {
          imageDetailList: JSON.stringify(data.imageDetailList),
          parentImageSrc: '',
          objectID: data.itemID,
          objectType: 'I',
          groupID: 0,
          imageType: 'D',
          loginUser: getLoginUser()
        },
        dataType:"json",
        success : function(res) {
          if (res.err) {
            errorArr.push(data.imageDetailList[i]);
          }
        },
        error: function () {

        }
      });

      // for(var i = 0; i <= data.imageDetailList.length - 1; i++){
      //
      // }
    },
    upload: function (selector) {
      var imageUrl = '';
      var file = $(selector)[0].files;
      for(var i = 0; i <= file.length - 1; i++){
        var formData = new FormData();
        formData.append('file',file[i]);
        $.ajax({
          url: "/uploadItemImage/imageUpload",
          async: false,
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          dataType:"json",
          success : function(res) {
            if (res.err) {
              this.uploadResult += '图片' + file[i].name + '上传失败。\n';
            } else {
              imageUrl += res.imageUrl + '|';
            }
          },
          error: function () {
            this.uploadResult += '上传图片' + file[i].name + '时无法连接服务器，请检查网络连接。\n';
          }
        });
      }

      return imageUrl.substring(0, imageUrl.length - 1);
    }
  },
  mounted: function () {
    this.initProcess();
  }
});