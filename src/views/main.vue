<template>
    <el-container>
        <el-aside width="auto" class="asideBox">
            <common-aside />
        </el-aside>
        <el-container>
            <el-header style="padding: 0;">
                <commonHeader />
            </el-header>
            <el-main>
                <el-scrollbar style="height: 93vh;">
                    <router-view></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="less" scoped>
.asideBox{
    height: 100vh;
}
</style>

<script>
import router from '@/router';
import commonAside from "../components/commonAside.vue"
import commonHeader from '@/components/commonHeader.vue';
export default{
    data() {
        return {};
    },
    components: { router,commonAside,commonHeader }
}
</script>