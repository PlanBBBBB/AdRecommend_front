<template>
  <el-row :gutter="10">
      <el-col :span="24">
          <el-card>
              <h1 style="text-align: center;">用户管理查询</h1>
              <el-form :model="checkUserForm" :rules="rules" ref="checkUserForm" label-width="100px" class="form-container">
                  <el-form-item label="用户名" prop="userName">
                      <el-input v-model="checkUserForm.userName" placeholder="请输入用户名"></el-input>
                  </el-form-item>
                  <el-form-item label="用户昵称" prop="name">
                      <el-input v-model="checkUserForm.name" placeholder="请输入用户昵称"></el-input>
                  </el-form-item>
                  <div class="btn-container">
                      <el-button type="primary" @click="findUser" class="addBookBtn">
                          查询
                      </el-button>
                  </div>
              </el-form>
          </el-card>
          <el-card>
              <div class="dataItem">
                  <el-table
                      :data="bookInfo.records"
                      style="width: 100%">
                      <el-table-column
                          prop="id"
                          label="用户编号">
                      </el-table-column>
                      <el-table-column
                          prop="userName"
                          label="用户名">
                      </el-table-column>
                      <el-table-column
                          prop="name"
                          label="昵称">
                      </el-table-column>
                      <el-table-column
                          prop="interest"
                          label="兴趣标签">
                      </el-table-column>
                      <el-table-column
                          prop="created"
                          label="创建时间">
                      </el-table-column>
                      <el-table-column
                          prop="modified"
                          label="修改时间">
                      </el-table-column>
                      <el-table-column
                          prop="type"
                          label="用户类型">
                      </el-table-column>
                  </el-table>
              </div>
              <div class="dataItem">
                  <el-pagination
                  background
                  layout="prev, pager, next"
                  @current-change="findUserWithPage "
                  :page-size="checkUserForm.pageSize==='' ? 10 : parseInt(checkUserForm.pageSize)"
                  :total="parseInt(bookInfo.total)">
                  </el-pagination>
              </div>
          </el-card>
      </el-col>
  </el-row>
</template>
<script>
import { pageUser } from '@/api';
import { mapState } from 'vuex';
    export default{
        data(){
            return{
                val:1,
                tableData:[
                ],
                checkUserForm : {
                    userName: "",
                    name: "",
                    pageSize: 10, // 初始化 pageSize
                    currentPage: 1 // 初始化 currentPage
                },
                rules : {
                    userName : [
                        { required: true, message: '请输入用户名', trigger: 'blur'},
                        { min: 1,max: 15,message: '长度在1-15个字符',trigger: 'blur'}
                    ],
                    currentPage : [
                        { required: true, message: '请输入当前页数', trigger: 'blur'},
                        { min: 1,max: 15,message: '长度在1-15个字符',trigger: 'blur'}
                    ],
                    pageSize : [
                        { required: true, message: '请输入每页显示数量', trigger: 'blur'},
                        { min: 1,max: 15,message: '长度在1-15个字符',trigger: 'blur'}
                    ],
                    name : [
                        { required: true, message: '请输入用户昵称', trigger: 'blur'},
                        { min: 1,max: 15,message: '长度在1-15个字符',trigger: 'blur'}
                    ],
                },
            }
        },
        methods : {
            findUser(){
              pageUser(this.checkUserForm.userName,1,10,this.checkUserForm.name)
            },
            findUserWithPage(val){
              pageUser(this.checkUserForm.userName,val,10,this.checkUserForm.name)
            },
            checkBook(){
              pageUser('',1,'',10,'')
            }
        },
        computed : {
            ...mapState(['bookInfo','userInfo'])
        },
        mounted(){
        },
        created(){
          pageUser('',1,10,'')
        }

    }
</script>
<style lang="less">
.form-container{
  width: 100%;
  display: flex;
  justify-content: center;
  .btn-container{
      margin-left: 20px;
  }
}
.dataItem{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-top: 10px;
}

</style>