<template>
  <div class="t-register">

    <!-- 标题 -->
    <div class="t-b">Create Account</div>
    <img src="@/assets/login/back.png" alt="login/back.png" class="login-bg">
    <el-form class="cl" :model="registerForm" :rules="rules" ref="registerForm">
      <div class="t-a">
        <el-form-item prop="username" class="from-item">
          <el-input
              prefix-icon="el-icon-user"
              type="text"
              placeholder="请输入账号"
              maxlength="11"
              v-model="registerForm.username"
              clearable
              @keyup.enter.native="land">
          </el-input>
        </el-form-item>
      </div>
      <div class="t-a">
        <el-form-item prop="password" class="from-item">
          <el-input
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="请输入密码"
              maxlength="6"
              v-model="registerForm.password"
              clearable
              @keyup.enter.native="land">
          </el-input>
        </el-form-item>
      </div>
      <div class="t-a">
        <el-form-item prop="name" class="from-item">
          <el-input
              prefix-icon="el-icon-user"
              type="text"
              placeholder="请输入昵称"
              maxlength="10"
              v-model="registerForm.name"
              clearable
              @keyup.enter.native="land">
          </el-input>
        </el-form-item>
      </div>
      <div class="t-a">
        <el-form-item prop="interest" class="from-item">
          <el-select v-model="registerForm.interest"
                     placeholder="请选择兴趣标签（3到5个）"
                     clearable
                     multiple
                     style="width: 100%">
            <el-option
                v-for="item in interestOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-button type="primary" @click="land" :loading="isLoading" class="login-btn">Sign up</el-button>
    </el-form>


    <div class="or-container">
      or
    </div>
    <el-button @click="linkLogin" class="login-btn">Log in</el-button>

    <div class="end-container">
    </div>
  </div>
</template>

<script>
import {getDictByDictType, registering} from "../api/index";
import router from '@/router';

export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        name: '',
        interest: [],
        interestStr: ''
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
      interestOptions: []
    };
  },
  methods: {
    async land() {
      if (this.registerForm.username === "" || this.registerForm.username.length > 10 || this.registerForm.username.length < 3) {
        alert("请检查账号长度在3-10个字符！");
      } else if (this.registerForm.password === "" || this.registerForm.password.length > 10 || this.registerForm.name.length < 3) {
        alert("请检查密码长度在3-10个字符！");
      } else if (this.registerForm.name === "" || this.registerForm.name.length > 10 || this.registerForm.name.length < 3) {
        alert("请检查昵称长度在3-10个字符！");
      } else if (this.registerForm.interest.length < 3 || this.registerForm.interest.length > 5) {
        alert("请选择3至5个兴趣标签！");
      } else {
        console.log("前往注册");
        this.registerForm.interestStr = this.registerForm.interest.join(',')
        await registering(this.registerForm.username, this.registerForm.password, this.registerForm.name, this.registerForm.interestStr);
        this.registerForm.interestStr = ''
      }
    },
    linkLogin() {
      router.push('/userLogin');
    },
    async getInterest() {
      try {
        const response = await getDictByDictType(300);
        if (response && response.data) {
          console.log("这个是data:  ", response.data);
          this.interestOptions = response.data.map((item) => ({
            label: item.dictname,
            value: item.dictcode,
          }));
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    },
  },
  created() {
    this.getInterest();
  }
};
</script>

<style>

.login-btn {
  width: 80%;
  font-weight: bold;
}

.t-register {
  width: 600rpx;
  margin: 0 auto;
  font-size: 28rpx;
  color: #000;
}

.t-register .t-a {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
}

.t-register .t-a image {
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  left: 40rpx;
  top: 28rpx;
  border-right: 2rpx solid #dedede;
  padding-right: 20rpx;
}

.t-register .t-b {
  text-align: left;
  font-size: 23px;
  color: #000;
  font-weight: bold;
  height: 23px;
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

.end-container {
  height: 20px;
}
</style>