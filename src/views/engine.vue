<template>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card class="bookCard">
        <h1>推荐引擎管理</h1>
        <br />
        <el-radio-group v-model="dictcode" @change="handleEngineChange">
          <el-radio :label="'500000'"> 基于内容 </el-radio>
          <el-radio :label="'500010'"> 协同过滤 </el-radio>
          <el-radio :label="'500020'"> SVD </el-radio>
          <el-radio :label="'500030'"> 位置归一化 </el-radio>
        </el-radio-group>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { getCurrentEngine, updateCurrentEngine } from "@/api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      dictcode: '',
      dictname: '',
    };
  },
  methods: {
    async getCurrent() {
      try {
        const response = await getCurrentEngine();
        if (response && response.data) {
          this.dictcode = response.data.dictcode;
          this.dictname = response.data.dictname;
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    },
    async handleEngineChange(value) {
      try {
        await updateCurrentEngine(value);
        await this.getCurrent();
      } catch (error) {
        console.error("Failed to update engine:", error);
      }
    }
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.getCurrent();
  },
};
</script>
<style lang="less">
.bookCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  h1 {
    text-align: center;
    margin: 0;
  }
  .bookform-container {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    margin-top: 20px;
  }
  .btn-container {
    display: flex;
    width: 100%;
    justify-content: center;
    .addBookBtn {
      display: flex;
      justify-content: center;
      width: 45%;
    }
  }
}
</style>