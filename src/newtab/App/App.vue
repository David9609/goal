<template>
  <div class="main_app">
    <div class="line"></div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      default-active="task"
      active-text-color="#ffd04b">
      <el-menu-item index="task">我的任务</el-menu-item>
      <!-- <el-menu-item index="book">计划薄</el-menu-item> -->
      <!-- <el-menu-item index="favorites">收藏夹</el-menu-item> -->
      <el-menu-item index="use">常用网站</el-menu-item>
      <el-menu-item index="about">关于我们</el-menu-item>
      <el-menu-item :index="menuLogin">{{loginText}}</el-menu-item>
    </el-menu>
    <el-row :gutter="24">
      <el-col :span="5">
        <day-todo-list title="今天任务" type="4" @showLogin="showLogin"/>
      </el-col>
      <el-col :span="5">
        <day-todo-list title="本周任务" type="3"/>
      </el-col>
      <el-col :span="5">
        <day-todo-list title="本月目标"  type="2" />
      </el-col>
      <el-col :span="5">
        <day-todo-list title="今年目标" type="1" />
      </el-col>
      <el-col :span="4">
        <day-todo-list title="总目标" type="0" />
      </el-col>
    </el-row>
    <!-- <favorites /> -->
    <!-- 登录注册 -->
    <el-dialog title="登录/注册"  width="40%" :visible.sync="loginDialogVisible">
      <el-form :model="loginForm">
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input style="width: 250px" v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input   style="width: 250px" v-model="loginForm.password" autocomplete="off" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" v-if="!isLogin" :label-width="formLabelWidth">
          <el-input   style="width: 250px" v-model="loginForm.repassword" autocomplete="off" show-password placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" v-if="!isLogin"  :label-width="formLabelWidth">
          <el-input   style="width: 250px" v-model="loginForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码:" v-if="!isLogin"  :label-width="formLabelWidth">
          <el-input   style="width: 250px" v-model="loginForm.code" @click="getCaptcha" autocomplete="off" placeholder="请输入验证码">
            <el-button slot="append">获取验证码</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center" v-if="isLogin">
        <span>没有账号?</span><span style="color:#678901;cursor:pointer;" @click="isLogin=false">立即注册-></span>
      </div>
       <div style="text-align:center" v-if="!isLogin">
        <span>已有账号?</span><span style="color:#678901;cursor:pointer;" @click="isLogin=true">立即登录-></span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="loginOrRegister">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {MessageBox, Message} from 'element-ui'
import DayTodoList from '@/components/DayTodoList'
import Favorites from '@/components/Favorites'
import axios from 'axios'
export default {
  name: 'newtab',
  components: {
    DayTodoList,Favorites
  },
  data () {
    return {
      loginDialogVisible: false,
      formLabelWidth: '120px',
      isLogin: true,
      loginForm: {
        username: '',
        password: '',
        repassword: '',
        email: '',
        code: ''
      },
      menuLogin: 'user',
      loginText: '登录/注册'
    }
  },
  created () {
    let _this = this
    chrome.storage.sync.get('userInfo', function(value) {
      let data = value.userInfo
      if(data && data.userInfo && data.access_token ) {
        console.log(value.userInfo)
        _this.menuLogin = data.userInfo.nickName
        _this.loginText = data.userInfo.nickName
      }
    });
  },
  methods: {
    showLogin ({tType, dateIndex, yearIndex}) {

      this.loginDialogVisible = true
    },
    handleSelect(key, keyPath) {
      if (key === 'favorites') {

      }else if (key === 'user') {
        this.loginDialogVisible = true
      }
    },
    loginOrRegister() {
      let _this = this
      let url = 'https://api.shuhai360.com/wx/auth/login'
      if(!_this.isLogin) {
        url = 'https://api.shuhai360.com/wx/auth/register'
      }

      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: _this.loginForm,
        url: url,
      }
      axios(options).then(function (response) {
        console.log(response.data)
        if (response.data.errno === 0) {
          let data = response.data.data
          _this.menuLogin = data.userInfo.nickName
          _this.loginText = data.userInfo.nickName
          chrome.storage.sync.set({'userInfo': data}, function() {
            console.log('Value is set to ' + data);
          });
          _this.loginDialogVisible = false;
        } else {
           Message({
            type: 'error',
            message: `${ response.data.errmsg }`
          });
        }
      })
    },
    getCaptcha () {
      let _this = this
      let url = 'https://api.shuhai360.com/wx/auth/regCaptcha'
      const data = {'mobile': _this.userInfo.email}
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        url: url,
      }
      axios(options).then(function (response) {
        console.log(response.data)
        if (response.data.errno === 0) {
          
          MessageBox.alert('验证码已发生到您的邮箱，请及时使用!', '友情提示', {
            confirmButtonText: '确定',
          })
        }
      })
    }
  }
}
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 20rpx;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    border-bottom: 1px solid #dbdbdb
  }

  .clearfix {
    font-size: 18px;
    color: #f56c6c;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-row {
    margin-top: 3px;
    margin-bottom: 4px;
  }

  .box-card-alter {
    border: 2px solid #f56c6c;
    border-radius: 5px;
  }
  .dialog-footer {
    text-align: center;
  }
</style>
