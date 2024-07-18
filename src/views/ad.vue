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
            <el-select
              v-model="checkAdForm.isValid"
              clearable
              placeholder="请选择"
            >
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
            <el-button type="primary" @click="findAd" icon="el-icon-search">
              查询
            </el-button>
            <el-button type="primary" @click="openDrawer" icon="el-icon-plus">
              新增
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <a
                  href=""
                  @click.prevent="editAd(scope.row)"
                  class="custom-link"
                  >修改
                </a>
                <a
                  href=""
                  @click.prevent="confirmDelete(scope.row.id)"
                  class="custom-link"
                >
                  删除</a
                >
              </template>
            </el-table-column>
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

    <!-- Drawer for adding/editing an ad -->
    <el-drawer
      title="新增广告"
      :visible.sync="showDrawer"
      size="50%"
      :before-close="handleClose"
    >
      <el-form :model="adForm" ref="adForm" label-width="100px">
        <el-form-item label="关键词" prop="keywords">
          <el-cascader
            v-model="adForm.keywords"
            placeholder="搜索关键词"
            :options="keywordOptions"
            :props="{ multiple: true }"
            filterable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="广告图片url" prop="imgUrl">
          <el-input v-model="adForm.imgUrl"></el-input>
        </el-form-item>

        <el-form-item label="跳转链接url" prop="targetUrl">
          <el-input v-model="adForm.targetUrl"></el-input>
        </el-form-item>

        <el-form-item label="投放开始时间" prop="startTime">
          <el-date-picker
            v-model="adForm.startTime"
            type="datetime"
            placeholder="选择开始时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="投放结束时间" prop="endTime">
          <el-date-picker
            v-model="adForm.endTime"
            type="datetime"
            placeholder="选择结束时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="广告类型" prop="type">
          <el-select v-model="adForm.type" placeholder="请选择广告类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="位置值" prop="position">
          <el-select v-model="adForm.position" placeholder="请选择位置值">
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <div class="btn-container">
          <el-button type="primary" @click="saveAd">保存</el-button>
          <el-button @click="showDrawer = false">取消</el-button>
        </div>
      </el-form>
    </el-drawer>
  </el-row>
</template>

<script>
import {
  pageAd,
  addAd,
  deleteAdById,
  getAdById,
  updateAd,
  getDictByDictType,
  getDictWithParent,
} from "@/api";
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
      showDrawer: false,
      adForm: {
        keywords: [],
        imgUrl: "",
        targetUrl: "",
        startTime: "",
        endTime: "",
        type: "",
        position: "",
      },
      keywordOptions: [],
      typeOptions: [],
      positionOptions: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
        { value: 10, label: "10" },
      ],
      currentAdId: null,
    };
  },
  methods: {
    openDrawer() {
      this.showDrawer = true;
      this.getAdKeyWords();
      this.getAdType();
    },
    async getAdKeyWords() {
      try {
        const response = await getDictWithParent(200);
        console.log("这个是响应体：", response);

        if (response && response.data) {
          console.log("这个是data:  ", response.data);
          this.keywordOptions = response.data.map((item) => ({
            label: item.dictname,
            value: item.dictcode,
            children: item.children
              ? item.children.map((child) => ({
                  label: child.dictname,
                  value: child.dictcode,
                  children: child.children,
                }))
              : [],
          }));
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    },
    async getAdType() {
      try {
        const response = await getDictByDictType(200);
        console.log("这个是响应体：", response);

        if (response && response.data) {
          console.log("这个是data:  ", response.data);
          this.typeOptions = response.data.map((item) => ({
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
    saveAd() {
      const saveAction = this.currentAdId ? updateAd : addAd;
      saveAction(this.adForm)
        .then(() => {
          this.$message.success("操作成功");
          this.showDrawer = false;
          this.findAd();
        })
        .catch(() => {
          this.$message.error("操作失败");
        });
    },
    editAd(ad) {
      this.currentAdId = ad.id;
      this.adForm = { ...ad, keywords: ad.keyWords }; // Assuming ad.keyWords is the correct field
      this.showDrawer = true;
      this.getAdType();
    },
    confirmDelete(id) {
      MessageBox.confirm("此操作将永久删除该广告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteAd(id);
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteAd(id) {
      deleteAdById(id)
        .then((response) => {
          console.log("这个是响应体：", response);
          Message({
            message: "广告删除成功",
            type: "success",
          });
          this.findAd();
        })
        .catch((error) => {
          console.error("删除广告失败:", error);
        });
    },
    handleClose(done) {
      MessageBox.confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  computed: {
    ...mapState(["bookInfo"]),
  },
  mounted() {
    this.findAd();
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
.custom-link {
  text-decoration: none; /* 去掉下划线 */
  color: #387dff; /* 设置颜色 */
  font-weight: bold; /* 加粗字体 */
}
</style>
  