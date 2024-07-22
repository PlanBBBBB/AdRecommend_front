<template>
  <div class="login flex-cen-xy">
    <div class="login-info">
      <div class="login-left flex-cen-xy">
        <img
          class="login-left-img"
          src="@/assets/left-img.png"
          alt="login left img"
        />
      </div>

      <div class="login-right">
        <div class="login-title flex-xy">
          <span>AIGC 广告推荐后台管理系统</span>
          <span class="login-title-en">welcome to the system</span>
        </div>

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="login-form"
        >
          <el-form-item class="login-form-item" label="" prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入账号(admin)"
              class="login-input"
              clearable
              @keyup.enter.native="land"
            ></el-input>
          </el-form-item>

          <el-form-item class="login-form-item" label="" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码(123456)"
              type="password"
              class="login-input"
              clearable
              @keyup.enter.native="land"
            ></el-input>
          </el-form-item>

          <el-button
            class="login-btn"
            type="primary"
            @click="land"
            :loading="isLoading"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>
  
  <script>
import router from "../router";
import { landing } from "../api/index";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur" },
        ],
      },
      isLoading: false,
    };
  },
  methods: {
    async land() {
      if (
        this.ruleForm.username == "" ||
        this.ruleForm.password == "" ||
        this.ruleForm.username.length > 10 ||
        this.ruleForm.password.length > 10 ||
        this.ruleForm.username.length < 3 ||
        this.ruleForm.password.length < 3
      ) {
        alert("请检查账号和密码！");
      } else {
        console.log("前往登录");
        await landing(this.ruleForm.username, this.ruleForm.password);
        console.log("到我了");
      }
    },
  },
};
</script>
  
  <style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.login {
  width: 100%;
  height: 100vh; /* 使背景图覆盖整个视口 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0091ff;
  background-image: url("../assets/bg.png");
  background-size: cover; /* 确保背景图覆盖整个页面 */
  background-position: center;
}

.login-info {
  width: 1134px;
  height: 586px;
  display: flex;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 0 25px #cac6c6;
}

.login-left {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  background: #edfcff;
}

.login-left-img {
  width: 80%;
}

.login-right {
  width: 50%;
  padding: 20px 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-title {
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #0091ff;
}

.login-title-en {
  margin-top: 15px;
  font-size: 22px;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: rgba(0, 145, 255, 0.71);
}

.login-form {
  padding: 0 35px;
}

.login-form-item {
  margin-bottom: 18px;
}

.login-input >>> .el-input__inner {
  padding: 0 40px 0 20px;
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  color: #0091ff;
  background: #f2f8ff;
  border: none;
  border-radius: 28px;
}

.login-input >>> .el-input__inner:focus {
  border: 1px solid #0091ff;
}

.login-input >>> .el-input__suffix {
  right: 12px;
}

.login-input >>> .el-input__clear {
  font-size: 16px;
}

.login-btn {
  margin-top: 10px;
  width: 100%;
  height: 56px;
  border-radius: 28px;
  border: none;
  font-size: 20px;
  background: linear-gradient(180deg, #35abff 0%, #1c91ff 99%);
}

</style>
  