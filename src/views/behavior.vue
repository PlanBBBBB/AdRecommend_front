<template>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card>
        <h1 style="text-align: center">行为管理查询</h1>
        <el-form
          :model="checkBehaviorForm"
          :rules="rules"
          ref="checkBehaviorForm"
          label-width="100px"
          class="form-container"
        >
          <el-form-item label="行为类型" prop="action">
            <el-select
              v-model="checkBehaviorForm.action"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <div class="btn-container">
            <el-button type="primary" @click="findBehavior" class="addBookBtn">
              查询
            </el-button>
          </div>
        </el-form>
      </el-card>

      <el-card>
        <div class="dataItem">
          <el-table :data="bookInfo.records" style="width: 100%">
            <el-table-column prop="id" label="行为编号"> </el-table-column>
            <el-table-column prop="userId" label="用户id"> </el-table-column>
            <el-table-column prop="adId" label="广告id"> </el-table-column>
            <el-table-column prop="action" label="行为类型"> </el-table-column>
            <el-table-column prop="created" label="创建时间"> </el-table-column>
          </el-table>
        </div>
        <div class="dataItem">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="findBehaviorWithPage"
            :page-size="10"
            :total="parseInt(bookInfo.total)"
          >
          </el-pagination>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
    
<script>
import { pageBehavior, getDictByDictType } from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      options: [],
      checkBehaviorForm: {
        action: "",
      },
      rules: {
        currentPage: [
          { required: true, message: "请输入当前页数", trigger: "blur" },
          { min: 1, max: 15, message: "长度在1-15个字符", trigger: "blur" },
        ],
        pageSize: [
          { required: true, message: "请输入每页显示数量", trigger: "blur" },
          { min: 1, max: 15, message: "长度在1-15个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async fetchOptions() {
      try {
        const response = await getDictByDictType(100);
        console.log("这个是响应体：", response);

        if (response && response.data) {
          console.log("这个是data:  ", response.data);
          this.options = response.data.map((item) => ({
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
    findBehavior() {
      pageBehavior(this.checkBehaviorForm.action, 1, 10);
    },
    findBehaviorWithPage(val) {
      pageBehavior(this.checkBehaviorForm.action, val, 10);
    },
  },
  computed: {
    ...mapState(["bookInfo", "userInfo"]),
  },
  mounted() {},
  created() {
    pageBehavior("", 1, 10);
    this.fetchOptions();
    // 初始化
  },
};
</script>


    
    <style lang="less">
.form-container {
  width: 100%;
  display: flex;
  justify-content: center;
  .btn-container {
    margin-left: 20px;
  }
}
.dataItem {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-top: 10px;
}
</style>
    