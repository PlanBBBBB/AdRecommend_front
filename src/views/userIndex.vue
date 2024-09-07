<template>
  <div>
    <h2>AIGC 广告推荐系统</h2>
    <!-- 顶部轮播图 -->
    <div class="banner">
      <el-carousel :interval="4000" height="190px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.image" alt="轮播栏广告图" style="width: 100%; height: 100%;" @click="linkToAdInfo(item.adId)">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 卡片栏广告 -->
    <div class="card">
      <el-row :gutter="20">
        <el-col :span="12" v-for="item in productList" :key="item.id" style="padding: 8px;">
          <el-card :body-style="{ padding: '0px' ,height: '110px' }"
                   style="height: 110px; width: 100%; object-fit: cover; overflow: hidden;">
            <img :src="item.image" alt="卡片栏广告图" style="width: 100%; height: 100%; object-fit: cover;"
                 @click="linkToAdInfo(item.adId)">
          </el-card>
        </el-col>
      </el-row>
    </div>


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
import {getAdByApi} from "@/api";

export default {
  data() {
    return {
      // 轮播图广告列表
      bannerList: [],
      // 卡片栏广告列表
      productList: [],
    };
  },
  methods: {
    // 跳转到首页
    linkToIndex() {
      router.push('/index');
    },
    // 跳转到个人信息页
    linkToInfo() {
      router.push('/info');
    },
    // 根据API获取广告
    async getAdByAPI() {
      try {
        const response = await getAdByApi(7);
        if (response && response.data) {
          if (response && Array.isArray(response.data)) {
            // 将前三个广告信息放入 bannerList
            this.bannerList = response.data.slice(0, 3).map((item, index) => ({
              id: index + 1, // id 从1开始
              image: item.imgUrl,
              adId: item.id, // 使用 item 中的 id 作为 adId
            }));
            // 将剩下的广告信息放入 productList
            this.productList = response.data.slice(3).map((item, index) => ({
              id: index + 1 + 3, // id 从1开始，加上前面的3个广告
              image: item.imgUrl,
              adId: item.id, // 使用 item 中的 id 作为 adId
            }));
          } else {
            console.error("Invalid response structure:", response);
          }
        }
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    },
    // 根据SSE获取广告
    async getAdBySSE() {
      try {
        const headers = new Headers({
          'Content-Type': 'text/event-stream',
          'token': localStorage.getItem("token")
        });

        const response = await fetch('/adRecommend/ad/recommendByAISSe?id=7', {
          headers: headers
        });

        // 创建一个可读流适配器
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let currentMessage = '';
        let done = false;

        const pushEvent = (data) => {
          console.log(data);
          // 解析数据
          let dataStr = data.substring(1, data.length - 1)
          let dataArr = dataStr.split(",")
          // 提取 id 和 imgUrl
          const id = dataArr[0];
          const imgUrl = dataArr[1];

          // 将数据添加到对应的列表中
          if (this.bannerList.length < 3) {
            console.log("添加到 bannerList");
            this.bannerList.push({
              id: this.bannerList.length + 1,
              image: imgUrl,
              adId: id,
            });
          } else if (this.productList.length < 4) {
            this.productList.push({
              id: this.productList.length + 1,
              image: imgUrl,
              adId: id,
            });
          }
        };

        const pump = () => {
          if (done) return;
          reader.read().then(({value, done: d}) => {
            if (d) {
              done = true;
              this.closeSSE();
              return;
            }
            const chunk = decoder.decode(value, {stream: true});
            currentMessage += chunk;
            console.log(currentMessage);
            // 如果 currentMessage 结束，处理它
            if (currentMessage.endsWith('\n')) {
              const messages = currentMessage.split('\n').filter(m => m.trim());
              messages.forEach((message) => {
                const eventData = message.replace(/^data:/, '').trim();
                if (eventData) {
                  pushEvent(eventData);
                }
              });
              currentMessage = ''; // 重置 currentMessage
            } else {
              // 如果 currentMessage 没有结束，继续读取下一个块
              pump();
            }
            pump()
          });
        };

        pump();

        this.eventSource = {
          close: () => {
            reader.cancel();
            this.eventSource = null;
          },
          onerror: (error) => {
            console.error('Error occurred:', error);
            this.eventSource.close();
          }
        };
      } catch (error) {
        console.error("Failed to fetch SSE:", error);
      }
    },
    closeSSE() {
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
    },

    // 跳转到广告详情页
    linkToAdInfo(adId) {
      console.log("跳转到广告详情页", adId)

    }
  },
  created() {
    this.getAdBySSE();
    // this.getAdByAPI();
  },
  beforeDestroy() {
    this.closeSSE();
  },
};
</script>

<style scoped>

.banner {
  height: 190px;
  padding: 10px;
}

.card {
  height: 290px;
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