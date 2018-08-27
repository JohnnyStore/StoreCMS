var app = new Vue({
  el: '#app',
  data: {
    fullName: '',
    userName: '',
    cellphone: '',
    email: '',
    password: '',
    confirmPassword: '',
    userNameValid: false,
    cellphoneValid: false,
    emailValid: false,
    passwordValid: false
  },
  computed: {
    enabledSave: function () {
      return this.fullName.length > 0
          && this.userName.length > 0
          && this.cellphone.length > 0
          && this.email.length > 0
          && this.password.length > 0
          && this.confirmPassword.length > 0
          && this.userNameValid
          && this.cellphoneValid
          && this.emailValid
          && this.passwordValid;
    }
  },
  methods:{
    initProcess: function () {
      app.$data.fullName = '';
      app.$data.userName = '';
      app.$data.cellphone = '';
      app.$data.email = '';
      app.$data.password = '';
      app.$data.confirmPassword = '';
      app.$data.userNameValid = false;
      app.$data.cellphoneValid = false;
      app.$data.emailValid = false;
      app.$data.passwordValid = false;
    },
    onUserNameBlur: function () {
      if(app.$data.userName.length <= 0){
        return false;
      }
      $.ajax({
        url: '/register/checkUserName?userName='+app.$data.userName,
        type: 'GET',
        success: function(res){
          if(res.err){
            app.$data.userNameValid = false;
            showMessage(res.msg);
          }else if(res.exist){
            app.$data.userNameValid = false;
            showMessage('用户名已存在。');
          }else{
            app.$data.userNameValid = true;
            hiddenMessage();
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onCellphoneBlur: function () {
      if(app.$data.cellphone.length <= 0){
        return false;
      }
      $.ajax({
        url: '/register/checkCellphone?cellphone='+app.$data.cellphone,
        type: 'GET',
        success: function(res){
          if(res.err){
            app.$data.cellphoneValid = false;
            showMessage(res.msg);
          }else if(res.exist){
            app.$data.cellphoneValid = false;
            showMessage('手机号已存在。');
          }else{
            app.$data.cellphoneValid = true;
            hiddenMessage();
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onEmailBlur: function () {
      if(app.$data.email.length <= 0){
        return false;
      }
      $.ajax({
        url: '/register/checkEmail?email='+app.$data.email,
        type: 'GET',
        success: function(res){
          if(res.err){
            app.$data.emailValid = false;
            showMessage(res.msg);
          }else if(res.exist){
            app.$data.emailValid = false;
            showMessage('邮箱已存在。');
          }else{
            app.$data.emailValid = true;
            hiddenMessage();
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onConfirmPasswordBlur: function () {
      if(app.$data.password !== app.$data.confirmPassword){
        app.$data.passwordValid = false;
        showMessage('密码和确认密码不一致。');
      }else{
        app.$data.passwordValid = true;
        hiddenMessage();
      }
    },
    onRegister: function () {
      $.ajax({
        url: '/register',
        type: 'POST',
        dataType: 'json',
        data:{
          fullName: app.$data.fullName,
          userName: app.$data.userName,
          cellphone: app.$data.cellphone,
          email: app.$data.email,
          password: app.$data.password
        },
        success: function(res){
          if(res.err){
            showMessage(res.msg);
          }else{
            app.initProcess();
            showMessage('注册成功，待审核。');
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    }
  }
});