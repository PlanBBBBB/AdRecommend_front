<template>
  <div class="t-login">
    <!-- 页面装饰图片 -->
    <img src="@/assets/login/2.png" alt="login/2.png" class="img-a">
    <img src="@/assets/login/3.png" alt="login/3.png" class="img-b">
    <!-- 标题 -->
    <div class="t-b">欢迎回来！</div>
    <el-form class="cl" :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="t-a">
        <img src="@/assets/login/sj.png" alt="login/sj.png">
        <el-form-item label="" prop="username">
          <el-input
              type="number"
              placeholder="请输入账号"
              maxlength="11"
              v-model="ruleForm.username"
              clearable
              @keyup.enter.native="land">
          </el-input>
        </el-form-item>
      </div>
      <div class="t-a">
        <img src="@/assets/login/yz.png" alt="login/yz.png">
        <el-form-item label="" prop="password">
          <el-input
              type="password"
              placeholder="请输入密码"
              maxlength="6"
              v-model="ruleForm.password"
              clearable
              @keyup.enter.native="land">
          </el-input>
        </el-form-item>
      </div>
      <div class="t-a">
        <img src="@/assets/login/yz.png" alt="login/yz.png">
        <el-form-item label="" prop="name">
          <el-input
              type="text"
              placeholder="请输入昵称"
              maxlength="10"
              v-model="ruleForm.name"
              clearable
              @keyup.enter.native="land">
          </el-input>
        </el-form-item>
      </div>
      <div class="t-a">
        <img src="@/assets/login/yz.png" alt="login/yz.png">
        <el-form-item label="" prop="interest">
          <el-select>

          </el-select>
          <el-input
              type="text"
              placeholder="请输入昵称"
              maxlength="10"
              v-model="ruleForm.name"
              clearable
              @keyup.enter.native="land">
          </el-input>
        </el-form-item>
      </div>
      <el-button @click="land" :loading="isLoading">注 册</el-button>
    </el-form>

    <div @click="linkLogin" class="register">
      已有账号？点我登录
    </div>
    <div @click="openNewPage" class="new-page">
      备案号：粤ICP备2024295504号
    </div>
  </div>
</template>

<script>
import {registering} from "../api/index";
import router from '@/router';

export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        name: '',
        interest: ''
      },
      rules: {
        username: [
          {required: true, message: "请输入账号", trigger: "blur"},
          {min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur"},
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur"},
        ],
        name: [
          {required: true, message: "请输入昵称", trigger: "blur"},
          {min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur"},
        ],
        interest: [
          {required: true}
        ]
      },
      isLoading: false,
    };
  },
  methods: {
    async land() {
      if (
          this.ruleForm.username === "" ||
          this.ruleForm.password === "" ||
          this.ruleForm.username.length > 10 ||
          this.ruleForm.password.length > 10 ||
          this.ruleForm.username.length < 3 ||
          this.ruleForm.password.length < 3 ||
          this.ruleForm.name.length > 10 ||
          this.ruleForm.password.length < 3
      ) {
        alert("请检查账号和密码！");
      } else {
        console.log("前往注册");
        await registering(this.ruleForm.username, this.ruleForm.password, this.ruleForm.name, this.ruleForm.interest);
        console.log("到我了");
      }
    },
    openNewPage() {
      window.open("https://beian.miit.gov.cn/ ", "_blank");
    },
    linkLogin() {
      router.push('/userLogin');
    }
  },
};
</script>

<style>
.img-a {
  position: absolute;
  width: 100%;
  top: -280rpx;
  right: -100rpx;
}

.img-b {
  position: absolute;
  width: 50%;
  bottom: 0;
  left: 0;
  margin-bottom: -200rpx;
}

.t-login {
  width: 600rpx;
  margin: 0 auto;
  font-size: 28rpx;
  color: #000;
}

.t-login button {
  font-size: 28rpx;
  background: #5677fc;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 50rpx;
  box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
  padding: 0 20rpx 0 120rpx;
  height: 90rpx;
  line-height: 90rpx;
  margin-bottom: 50rpx;
  background: #f8f7fc;
  border: 1px solid #e9e9e9;
  font-size: 28rpx;
  border-radius: 50rpx;
}

.t-login .t-a {
  position: relative;
}

.t-login .t-a image {
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  left: 40rpx;
  top: 28rpx;
  border-right: 2rpx solid #dedede;
  padding-right: 20rpx;
}

.t-login .t-b {
  text-align: left;
  font-size: 46rpx;
  color: #000;
  padding: 300rpx 0 120rpx 0;
  font-weight: bold;
}

.t-login .t-c {
  position: absolute;
  right: 22rpx;
  top: 22rpx;
  background: #5677fc;
  color: #fff;
  font-size: 24rpx;
  border-radius: 50rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 25rpx;
}

.t-login .t-d {
  text-align: center;
  color: #999;
  margin: 80rpx 0;
}

.t-login .t-e {
  text-align: center;
  width: 250rpx;
  margin: 80rpx auto 0;
}

.t-login .t-g {
  float: left;
  width: 50%;
}

.t-login .t-e image {
  width: 50rpx;
  height: 50rpx;
}

.t-login .t-f {
  text-align: center;
  margin: 200rpx 0 0 0;
  color: #666;
}

.t-login .t-f text {
  margin-left: 20rpx;
  color: #aaaaaa;
  font-size: 27rpx;
}

.t-login .uni-input-placeholder {
  color: #000;
}

.cl {
  zoom: 1;
}

.cl:after {
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
  content: "\20";
}

.register {
  font-size: 14px;
  color: blue;
}

.new-page {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: blue;
  cursor: pointer;
}
</style>