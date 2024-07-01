<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-container" :inline="true">
        <h3 class="login-title">广告推荐系统后台登录</h3>
        <el-form-item label="账号" prop="username" class="username-container">
            <el-input v-model="ruleForm.username" placeholder="请输入账号" class="username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="password-container">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" class="password"></el-input>
        </el-form-item>
        <el-form-item class="btn-contain">
            <el-button type="primary" @click="land">
                登录
            </el-button>
            <!-- <el-button type="primary" @click="register">
                注册
            </el-button> -->
        </el-form-item>
    </el-form>
</template>
<script>
import router from "../router"
import {landing} from "../api/index"
export default {
    data(){
        return{
            ruleForm : {
                username : '',
                password : ''
            },
            rules : {
                username : [
                    { required: true, message: '请输入账号', trigger: 'blur'},
                    { min: 3,max: 10,message: '长度在3-10个字符',trigger: 'blur'}
                ],
                password : [
                    { required: true, message: '请输入密码', trigger: 'blur'},
                    { min: 3,max: 10,message: '长度在3-10个字符',trigger: 'blur'}
                ]
            },
        }
    },
    methods : {
        async land() {
            if(this.ruleForm.username==''||this.ruleForm.password==''||this.ruleForm.username.length>10||
            this.ruleForm.password.length>10||this.ruleForm.username.length<3||this.ruleForm.password.length<3){
                alert("请检查账号和密码！")
            }else{
                console.log("前往登录")
                await landing(this.ruleForm.username,this.ruleForm.password);
                console.log("到我了");
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import url("../common/common.less");
.login-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 390px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    padding: 15px 0;
    margin: 180px auto;
    .login-title{
        margin-bottom: 20px;
        color: @GCCOLOR;
        font-size: 500;
    }
    .username-container{
        .username{
            width: 100%px;
        }
    }
    .btn-contain{
        margin: 0;
    }
}
</style>