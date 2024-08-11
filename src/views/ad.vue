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
            <el-table-column prop="id" label="广告编号"></el-table-column>
            <el-table-column prop="keyWordsStr" label="关键词"></el-table-column>
            <el-table-column prop="imgUrl" label="图片url"></el-table-column>
            <el-table-column prop="targetUrl" label="跳转url">
            </el-table-column>
            <el-table-column prop="startTime" label="投放开始时间">
            </el-table-column>
            <el-table-column prop="endTime" label="投放结束时间">
            </el-table-column>
            <el-table-column prop="created" label="创建时间"></el-table-column>
            <el-table-column prop="modified" label="修改时间">
            </el-table-column>
            <el-table-column prop="isValid" label="是否有效"></el-table-column>
            <el-table-column prop="position" label="位置值"></el-table-column>
            <el-table-column prop="exposureCount" label="曝光次数">
            </el-table-column>
            <el-table-column prop="typeStr" label="广告类型"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <a href=""
                   @click.prevent="editAd(scope.row)"
                   class="custom-link">修改 </a>
                <a href=""
                   @click.prevent="changeStatus(scope.row.id,0)"
                   class="custom-link"
                   v-if="scope.row.isValid === '有效'">弃用</a>
                <a href=""
                   @click.prevent="changeStatus(scope.row.id,1)"
                   class="custom-link"
                   v-if="scope.row.isValid === '无效'">启用</a>
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
        :title="title"
        :visible.sync="showDrawer"
        size="50%"
        :before-close="handleClose"
    >
      <el-card>
        <el-form :model="adForm" ref="adForm" label-width="100px">
          <el-form-item label="广告类型" prop="type">
            <el-select v-model="adForm.type" placeholder="请选择广告类型" @change="getAdKeyWords()">
              <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关键词" prop="keywords">
            <el-select v-model="adForm.keyWords" multiple placeholder="请选择关键词">
              <el-option
                  v-for="item in keywordOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
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
            <el-button @click="closeDrawer">取消</el-button>
          </div>
        </el-form>
      </el-card>
    </el-drawer>
  </el-row>
</template>

<script>
import {
  pageAd,
  addAd,
  deleteAdById,
  updateAd,
  getDictByDictType,
  getDictByParent, upStatus,
} from "@/api";
import {mapState} from "vuex";

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
          {required: true, message: "请输入当前页数", trigger: "blur"},
          {min: 1, max: 15, message: "长度在1-15个字符", trigger: "blur"},
        ],
        pageSize: [
          {required: true, message: "请输入每页显示数量", trigger: "blur"},
          {min: 1, max: 15, message: "长度在1-15个字符", trigger: "blur"},
        ],
      },
      title: "",
      showDrawer: false,
      adForm: {
        id: '',
        keyWordsStr: '',
        keyWords: [],
        imgUrl: '',
        targetUrl: '',
        startTime: '',
        endTime: '',
        type: '',
        position: ''
      },
      keywordOptions: [],
      typeOptions: [],
      positionOptions: [
        {value: 1, label: "1"},
        {value: 2, label: "2"},
        {value: 3, label: "3"},
        {value: 4, label: "4"},
        {value: 5, label: "5"},
        {value: 6, label: "6"},
        {value: 7, label: "7"},
        {value: 8, label: "8"},
        {value: 9, label: "9"},
        {value: 10, label: "10"},
      ],
      currentAdId: null,
    };
  },
  methods: {
    closeDrawer() {
      this.showDrawer = false;
      this.adForm.startTime = ''
      this.adForm.endTime = ''
      this.adForm.position = ''
      this.adForm.keyWords = []
      this.adForm.keyWordsStr = ''
      this.adForm.imgUrl = ''
      this.adForm.targetUrl = ''
      this.adForm.id = ''
      this.adForm.type = ''
    },
    openDrawer() {
      this.adForm.startTime = ''
      this.adForm.endTime = ''
      this.adForm.position = ''
      this.adForm.keyWords = []
      this.adForm.keyWordsStr = ''
      this.adForm.imgUrl = ''
      this.adForm.targetUrl = ''
      this.adForm.id = ''
      this.adForm.type = ''
      this.title = "新增广告";
      this.showDrawer = true;
      this.currentAdId = null
      this.getAdType();
      this.getAdKeyWords();
    },
    async getAdKeyWords() {
      try {
        const response = await getDictByParent(this.adForm.type);
        console.log("这个是响应体：", response);

        if (response && response.data) {
          console.log("这个是data:  ", response.data);
          this.keywordOptions = response.data.map((item) => ({
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
      this.checkAdForm.isValid = ''
      this.checkAdForm.startTime = ''
      this.checkAdForm.endTime = ''
    },
    findAdWithPage(val) {
      pageAd(
          this.checkAdForm.isValid,
          this.checkAdForm.startTime,
          this.checkAdForm.endTime,
          val,
          10
      );
      this.checkAdForm.isValid = ''
      this.checkAdForm.startTime = ''
      this.checkAdForm.endTime = ''
    },
    // 更新广告
    upAd() {
      this.adForm.keyWordsStr = this.adForm.keyWords.join(',')
      updateAd(this.currentAdId, this.adForm.keyWordsStr, this.adForm.imgUrl, this.adForm.targetUrl, this.adForm.startTime, this.adForm.endTime, this.adForm.type, this.adForm.position)
          .then(() => {
            this.$message.success("操作成功");
            this.showDrawer = false;
            this.findAd();
            this.adForm.startTime = ''
            this.adForm.endTime = ''
            this.adForm.position = ''
            this.adForm.keyWords = []
            this.adForm.keyWordsStr = ''
            this.adForm.imgUrl = ''
            this.adForm.targetUrl = ''
            this.adForm.id = ''
            this.adForm.type = ''
          })
          .catch(() => {
            this.$message.error("操作失败");
          });
    },
    // 新增广告
    adAd() {
      this.adForm.keyWordsStr = this.adForm.keyWords.join(',')
      addAd(this.adForm.keyWordsStr, this.adForm.imgUrl, this.adForm.targetUrl, this.adForm.startTime, this.adForm.endTime, this.adForm.type, this.adForm.position)
          .then(() => {
            this.$message.success("操作成功");
            this.showDrawer = false;
            this.findAd();
            this.adForm.startTime = ''
            this.adForm.endTime = ''
            this.adForm.position = ''
            this.adForm.keyWords = []
            this.adForm.keyWordsStr = ''
            this.adForm.imgUrl = ''
            this.adForm.targetUrl = ''
            this.adForm.id = ''
            this.adForm.type = ''
          })
          .catch(() => {
            this.$message.error("操作失败");
          });
    },
    saveAd() {
      if (this.currentAdId) {
        this.upAd()
      } else {
        this.adAd()
      }
    },
    editAd(ad) {
      this.currentAdId = ad.id;
      this.adForm = {...ad}; // Assuming ad.keyWords is the correct field
      this.adForm.keyWords = this.adForm.keyWords.split(',');
      this.showDrawer = true;
      this.getAdType();
      this.title = "编辑广告";
      console.log(this.adForm.type)
      this.getAdKeyWords();
    },
    changeStatus(id, status) {
      const string = status === 0 ? '弃用' : '启用'
      this.$confirm("此操作将" + string + "该广告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.upStatus(id, status);
            this.findAd()
          })
          .catch(() => {
            $message({
              type: "info",
              message: "已取消删除",
            });
          });
    },
    upStatus(id, status) {
      upStatus(id, status)
          .then((response) => {
            console.log("这个是响应体：", response);
            $message({
              message: "修改广告状态成功",
              type: "success",
            });
            this.findAd();
          })
          .catch((error) => {
            console.error("删除广告失败:", error);
          });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => {
          });
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
  