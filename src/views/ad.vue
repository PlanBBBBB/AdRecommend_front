<template>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card>
        <h1 style="text-align: center">广告管理查询</h1>
        <el-form
          :model="checkAdForm"
          :rules="rules"
          ref="checkAdForm"
          label-width="100px"
          class="form-container"
        >
        <el-form-item label="是否有效" prop="isValid">
            <el-select v-model="checkAdForm.isValid" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="checkAdForm.startTime"
              type="date"
              placeholder="选择开始时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="checkAdForm.endTime"
              type="date"
              placeholder="选择结束时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <div class="btn-container">
            <el-button type="primary" @click="findAd" class="addBookBtn">
              查询
            </el-button>
          </div>
        </el-form>
      </el-card>

      <el-card>
        <div class="dataItem">
          <el-table :data="bookInfo.records" style="width: 100%">
            <el-table-column prop="id" label="广告编号"> </el-table-column>
            <el-table-column prop="keyWords" label="关键词"> </el-table-column>
            <el-table-column prop="imgUrl" label="图片url"> </el-table-column>
            <el-table-column prop="targetUrl" label="跳转url">
            </el-table-column>
            <el-table-column prop="startTime" label="投放开始时间">
            </el-table-column>
            <el-table-column prop="endTime" label="投放结束时间">
            </el-table-column>
            <el-table-column prop="created" label="创建时间"> </el-table-column>
            <el-table-column prop="modified" label="修改时间">
            </el-table-column>
            <el-table-column prop="isValid" label="是否有效"> </el-table-column>
            <el-table-column prop="position" label="位置值"> </el-table-column>
            <el-table-column prop="exposureCount" label="曝光次数">
            </el-table-column>
            <el-table-column prop="type" label="广告类型"> </el-table-column>
          </el-table>
        </div>
        <div class="dataItem">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="findAdWithPage"
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
import { pageAd } from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          value: 0,
          label: "无效",
        },
        {
          value: 1,
          label: "有效",
        },
      ],
      checkAdForm: {
        isValid: "",
        startTime: "",
        endTime: "",
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
    findAd() {
      pageAd(
        this.checkAdForm.isValid,
        this.checkAdForm.startTime,
        this.checkAdForm.endTime,
        1,
        10
      );
    },
    findAdWithPage(val) {
      pageAd(
        this.checkAdForm.isValid,
        this.checkAdForm.startTime,
        this.checkAdForm.endTime,
        val,
        10
      );
    },
  },
  computed: {
    ...mapState(["bookInfo", "userInfo"]),
  },
  mounted() {
    console.log("Options on mounted: ", this.options);
  },
  created() {
    console.log("Options on created: ", this.options);
    pageAd("", "", "", 1, 10);
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
  