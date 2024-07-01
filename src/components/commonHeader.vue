<template>
    <div class="header-container">
        <div class="left-box">
            <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
        </div>
        <div class="right-box">
            <el-button type="danger" size="mini" @click="outLand">退出登录</el-button>
        </div>
    </div>
</template>
<script>
import { outLanding } from "../api"
export default{
    data(){
        return{

        } 
    },
    methods:{
        handleMenu(){
            this.$store.commit('isCollapseMenu')
        },
        outLand(){
            outLanding()
        }
    }
}
</script>
<style lang="less" scoped>
.header-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    
    .el-button{
     margin: 0 20px;   
    }
    .right-box{
        display: flex;
        align-items: center;
        margin: 0 20px;
        img{
            width: 45px;
            height: 45px;
            border-radius: 50%;
        }
    }
}
</style>