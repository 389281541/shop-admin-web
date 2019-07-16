<template>
  <div class="login-style">
    <div class="login-container">
      <div class="logo">
        <img src="../assets/images/logo.png" />
      </div>
      <div class="body">
        <div class="widget-main">
          <h4 class="header">
            <i class="fa fa-coffee"></i>&nbsp;&nbsp;&nbsp;管理员登录</h4>
          <div class="content">
            <div class="login-logo">
              <img src="../assets/images/login_bg.png" />
            </div>
            <div class="login-info">
              <ul class="items">
                <li class="item"><label class="user_icon"></label><input name="username" data-name="用户名" type="text" id="username" ref="username" @blur="showUserName()" @focus="hideUserName()"/><i>用户名</i></li>
                <li class="item"><label class="password_icon"></label><input name="userpwd" data-name="密码" type="password" id="userpwd" ref="userpwd" @blur="showPassword()" @focus="hidePassword()"/><i>密码</i></li>
                <li class="item">
                  <label class="captcha_icon"></label><input name="captcha_text" type="text"  data-name="验证码" id="captcha_text" ref="captcha" class="captcha_text" @blur="showCaptcha()" @focus="hideCaptcha()"/><i>验证码</i>
                  <div class="captcha_region">
                    <img @click="refreshpic" :src="imgSrc" class="captcha_img"/>
                  </div>
                </li>
              </ul>
            </div>
            <div class="login-button">
              <button type="button" class="login" id="login_btn"><i class="fa fa-key"></i>&nbsp;&nbsp;登录</button>
              <div class="savepass">
                <input type="checkbox" class="ace"><i class="lbl">保存密码</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'Login',
  data () {
    return {
      imgSrc: 'http://localhost:8088/kaptcha/get'
    }
  },
  methods: {
    refreshpic () {
      var sj = Math.ceil(Math.random() * 100000)
      this.imgSrc = 'http://localhost:8088/kaptcha/get?' + sj
    },
    hideUserName () {
      $('#username').next().hide()
    },
    showUserName () {
      var userName = this.$refs.username.value
      if (userName === '') {
        $('#username').next().show()
      } else {
        $('#username').next().hide()
      }
    },
    hidePassword () {
      $('#userpwd').next().hide()
    },
    showPassword () {
      var userpwd = this.$refs.userpwd.value
      if (userpwd === '') {
        $('#userpwd').next().show()
      } else {
        $('#userpwd').next().hide()
      }
    },
    hideCaptcha () {
      $('#captcha_text').next().hide()
    },
    showCaptcha () {
      var captcha = this.$refs.captcha.value
      if (captcha === '') {
        $('#captcha_text').next().show()
      } else {
        $('#captcha_text').next().hide()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    display: block;
    box-sizing: border-box;
  }
  .login-style {
    width: 100%;
    height: 730px;
    background-color: #1c77ac;
    background-image: url(../assets/images/light.png);
    background-repeat: no-repeat;
    background-position: center top;
    position: relative;
  }
  .login-container {
    width: 100%;
    height: 585px;
    position: absolute;
    top: 47px;
    background-image: url(../assets/images/loginbg3.png);
    background-repeat: no-repeat;
  }
  .logo {
    width: 650px;
    margin: 50px auto 20px;
    /*margin-top: 50px;*/
    /*margin-bottom: 20px;*/
    text-align: center;
  }
  .logo img {
    margin: 0 auto;
  }
  .body {
    width: 650px;
    height: 330px;
    margin: 0 auto;
    padding: 6px;
    background-color: #1C77AC;
  }
  .widget-main {
    padding: 16px 20px 20px;
    background: #f7f7f7;
    height:318px;
  }
  .header {
    border-bottom-color: #d5e3ef;
    line-height: 28px;
    margin-bottom: 16px;
    padding-bottom: 4px;
    border-bottom: 1px solid #CCC;
    font-size: 19px;
    color: #478fca!important;
  }
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }

  .login-logo {
    float: left;
    width: 180px;
    margin-top: 20px;
  }
  .login-info {
    width: 268px;
    float: left;
  }
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  ul .item {
    position: relative;
    height: 40px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    line-height: 40px;
    width: 250px;
  }
  ul input {
    height: 40px;
    /*padding: 5px 10px;*/
    border: 0px;
    line-height: 30px;
    width: 208px;
    font-size: 14px;
    z-index: 11;
    position: relative;
    background: 0 none;
    text-rendering: auto;
  }
  ul li i {
    position: absolute;
    left: 60px;
    top: 0px;
    color: #999;
    font-size: 16px;
    z-index: 10;
  }
  label {
    background: url(../assets/images/icon_login.png) no-repeat;
    float: left;
    width: 40px;
    margin-top: 2px;
    height: 35px;
    border-right: 1px solid #ddd;
  }
  .password_icon {
    background-position: -5px 0px;
  }
  .user_icon {
    background-position: -5px -30px;
  }
  .captcha_icon {
    background-position: -5px -60px;
  }
  #captcha_text {
    width: 128px;
  }
  .captcha_region {
    position: absolute;
    height: 40px;
    border-left: 1px solid #ddd;
    width: 80px;
    right: 0px;
    top: 0px;
  }
  .captcha_region .captcha_img {
    width: 80px;
    height: 38px;
    margin: 0 auto;
  }
  .login-button {
    width: 130px;
    float: right;
    text-align: center;
    color: #666;
    position: relative;
  }
  .login-button .login {
    width: 80px;
    color: #FFF;
    padding: 20px 0px;
    line-height: 30px;
    font-size: 18px;
    cursor: pointer;
    margin: 20px 0px 35px 0px;
    display: inline-block;
    border-style: solid;
    border-width: 1px;
    border-color: #FFF;
    position: relative;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
  }
  .login-button savepass {
    display: inline-block;
    position: relative;
    line-height: 16px;
    text-align: center;
  }
  .login-button input {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: 20px;
    margin-right: 5px;
    border: initial;
  }
  .login-button  .lbl {
    position: relative;
    display: inline-block;
    line-height: 16px;
    font-weight: normal;
    font-style: normal;
    margin-left: 20px;
  }
</style>
