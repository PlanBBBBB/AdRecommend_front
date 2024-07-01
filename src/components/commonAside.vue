<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#002144" text-color="#ffffff" active-text-color="#387dff">
        <div class="box-title">
            <span>{{ isName }}</span>
        </div>
        <el-menu-item v-for="(item,index) in adminMenuData" :key="item.label" :index="index+''" @click="gotoPage(item.path)">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!-- <el-submenu v-for="(item2,index2) in hasChildren" :key="item2.label" :index="index2+''">
            <template slot="title">
                <i :class="`el-icon-${item2.icon}`"></i>
                <span slot="title">{{item2.label}}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="(item3,index3) in item2.children" :key="item3.label" :index="`${index2}-${index3}`" @click="gotoPage(item3.path)">
                    <i :class="`el-icon-${item3.icon}`"></i>
                    {{item3.label}}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu> -->
    </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            adminMenuData: [
                {
                    path: '/home',
                    name: "home",
                    label: "用户管理",
                    icon: "s-home",
                    url: "home/home"
                },
                {
                    path: '/ad',
                    name: "ad",
                    label: "广告管理",
                    icon: "search",
                    url: "home/home"
                },
                {
                    path: '/engine',
                    name: "engine",
                    label: "推荐引擎",
                    icon: "s-management",
                    url: "home/home"
                },
                {
                    path: '/behavior',
                    name: "behavior",
                    label: "行为日志",
                    icon: "s-comment",
                    url: "home/home"
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        gotoPage(path){
            if(this.$route.path !== path && !(this.$root.path === '/home' && (path === '/'))){
                this.$router.push(path);
            }
        }
    },
    computed: {
        // noChildren() {
        //     console.log("userInfo");
        //     console.log(this.userInfo);
        //     if(this.userInfo.role==='ADMIN'){
        //         return this.adminMenuData.filter(item => !item.children)
        //     }else{
        //         return this.userMenuData.filter(item => !item.children)
        //     }
        // },
        // hasChildren() {
        //     return this.menuData.filter(item => item.children)
        // },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        },
        isName(){
            return this.$store.state.tab.name
        },
        ...mapState(['userInfo'])
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu{
    height: 100vh;
    font-size: 18px;
    .box-title{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
    }
}
</style>