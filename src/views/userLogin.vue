<template>
  <div class="t-login">
    <div class="t-b">Welcome Back <br> AIGC AD Recommend </div>
    <img src="@/assets/login/back.png" alt="login/back.png" class="login-bg">
    <el-form class="cl" :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="t-a">
        <el-form-item label="" prop="username" class="from-item">
          <el-input
              prefix-icon="el-icon-user"
              type="text"
              placeholder="请输入账号"
              maxlength="11"
              v-model="ruleForm.username"
              clearable
              @keyup.enter.native="land">
          </el-input>
        </el-form-item>
      </div>
      <div class="t-a">
        <el-form-item label="" prop="password" class="from-item">
          <el-input
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="请输入密码"
              maxlength="6"
              show-password
              v-model="ruleForm.password"
              clearable
              @keyup.enter.native="land">
          </el-input>
        </el-form-item>
      </div>
      <el-button type="primary" @click="land" :loading="isLoading" class="login-btn">Log in</el-button>
    </el-form>
    <div class="or-container">
      or
    </div>
    <el-button @click="linkRegister" class="login-btn">Sign up</el-button>
  </div>
</template>

<script>
import {userLanding} from "../api/index";
import router from '@/router';

export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
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
      },
      isLoading: false,
    };
  },
  methods: {
    async land() {
      if (
          this.ruleForm.username === "" ||
          this.ruleForm.username === "admin" ||
          this.ruleForm.password === "" ||
          this.ruleForm.username.length > 10 ||
          this.ruleForm.password.length > 10 ||
          this.ruleForm.username.length < 3 ||
          this.ruleForm.password.length < 3
      ) {
        alert("请检查账号和密码是否正确！");
      } else {
        console.log("前往登录");
        await userLanding(this.ruleForm.username, this.ruleForm.password)
      }
    },
    linkRegister() {
      router.push('/register');
    }
  },
  created() {
  }
};
</script>

<style>

.login-btn {
  width: 80%;
  font-weight: bold;
}

.t-login {
  width: 600rpx;
  margin: 0 auto;
  font-size: 28rpx;
  color: #000;
}

.t-login .t-a {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
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
  font-size: 23px;
  color: #000;
  font-weight: bold;
  height: 60px;
  padding: 10px;
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

.from-item {
  width: 80%;
}

.login-bg {
  width: 100%;
  height: 100%;
}

.or-container {
  text-align: center;
  position: relative;
  font-size: 16px;
  color: #666;
  width: 80%; /* 调整宽度为70% */
  margin: 0 auto; /* 使用margin自动居中 */
  height: 25px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
}

.or-container::before,
.or-container::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 45%; /* 保持45%的宽度，因为or-container的宽度已经缩小 */
  border-top: 1px solid #ccc;
}

.or-container::before {
  left: 0;
}

.or-container::after {
  right: 0;
}

</style>