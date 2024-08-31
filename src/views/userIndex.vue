<template>
  <div>
    <h2>AIGC 广告推荐系统</h2>
    <!-- 顶部轮播图 -->
    <el-carousel height="150px">
      <el-carousel-item v-for="item in bannerList" :key="item">
        <h3 class="small">nihao</h3>
        <img src="@/assets/user/index-active.png" alt="">
      </el-carousel-item>
    </el-carousel>


    <el-row>
      <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
               class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
               class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>


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
import router from "@/router";

export default {
  data() {
    return {
      bannerList: [
        {id: 1, image: 'https://example.com/banner1.jpg'},
        {id: 2, image: 'https://example.com/banner2.jpg'},
        // 更多轮播图
      ],
      productList: [
        {id: 1, image: 'https://example.com/product1.jpg', name: '鲜花玫瑰'},
        {id: 2, image: 'https://example.com/product2.jpg', name: '鲜花玫瑰'},
        // 更多商品
      ],
    };
  },
  methods: {
    linkToIndex() {
      router.push('/index');
    },
    linkToInfo() {
      router.push('/info');
    },
    getBannerList() {
      console.log("获取顶部轮播图广告")

    },
    getProductList() {
      console.log("获取卡片栏广告")

    }
  },
  created() {
    this.getBannerList()
    this.getProductList()
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
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
  margin: 20px 0;
}
</style>