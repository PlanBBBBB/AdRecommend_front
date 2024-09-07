<template>
  <div>
    <h2>AIGC 广告推荐系统</h2>
    <div>

      <div class="username">
        用户名：{{ userForm.userName }}
      </div>

      <div class="username">
        注册时间：{{ userForm.created }}
      </div>

      <div class="name">
        昵称：
        <el-input style="width: 80%"
            v-model="userForm.name" clearable
                  prefix-icon="el-icon-user">
        </el-input>
      </div>

      <div class="interest">
        兴趣标签：
        <el-select v-model="userForm.interest"
                   placeholder="请选择兴趣标签（3到5个）"
                   multiple>
          <el-option
              v-for="item in interestOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="save">
        <el-button style="width: 100px" type="primary" @click="upUserInfo">保 存</el-button>
      </div>

      <el-button style="width: 100px" type="danger" @click="outLand">退出登录</el-button>

    </div>

    <img src="@/assets/login/info.png" alt="login/info.png" class="login-bg">

    <!-- 底部导航 -->
    <div class="bottom-nav">
      <div class="nav-separator"></div>
      <el-row>
        <el-col :span="12">
          <div class="nav-item" @click="linkToIndex">
            <img src="@/assets/user/index-active.png" alt="index-active.png" style="width: 24px; height: 24px;">
            <div class="nav-text">首页</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="nav-item" @click="linkToInfo">
            <img src="@/assets/user/profile-active.png" alt="profile-active.png" style="width: 24px; height: 24px;">
            <div class="nav-text">我的</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {checking, getDictByDictType, modifying, outLanding} from "../api/index";
import router from "@/router";

export default {
  data() {
    return {
      interestOptions: [],
      userForm: {
        id: '',
        userName: '',
        password: '',
        name: '',
        interest: [],
        interestStr: '',
        created: '',
        modified: '',
        type: ''
      },
    };
  },
  methods: {
    outLand() {
      outLanding()
      router.push('/userLogin')
    },
    linkToIndex() {
      router.push('/index');
    },
    linkToInfo() {
      router.push('/info');
    },
    async checkUserInfo() {
      try {
        const response = await checking();
        if (response && response.data) {
          this.userForm.id = response.data.id
          this.userForm.userName = response.data.userName;
          this.userForm.password = response.data.password
          this.userForm.name = response.data.name
          this.userForm.interest = response.data.interest.split(',');
          this.userForm.created = response.data.created
          this.userForm.modified = response.data.modified
          this.userForm.type = response.data.type
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    },
    async getInterest() {
      try {
        const response = await getDictByDictType(300);
        if (response && response.data) {
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
    upUserInfo() {
      this.userForm.interestStr = this.userForm.interest.join(',')
      modifying(this.userForm.name, this.userForm.interestStr)
      this.checkUserInfo()
      this.getInterest()
      this.userForm.interestStr = ''
    }
  },
  created() {
    this.checkUserInfo()
    this.getInterest()
  }
};
</script>

<style scoped>

.login-bg {
  width: 100%;
  height: 100%;
}

.username {
  text-align: left;
  padding: 10px;
  font-size: 20px;
}

.name {
  text-align: left;
  padding: 10px;
  font-size: 20px;
}

.interest {
  text-align: left;
  padding: 10px;
  font-size: 20px;
}

.save {
  text-align: center;
  padding: 10px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 4px 0;
}

.nav-item {
  text-align: center;
  margin-bottom: 10px;
}

.nav-text {
  font-size: 12px;
}

.nav-separator {
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
}
</style>