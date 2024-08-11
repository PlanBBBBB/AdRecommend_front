import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home";
import ad from "../views/ad";
import main from "../views/main";
import engine from "../views/engine";
import behavior from "../views/behavior";
import login from "../views/login";
import userLogin from "../views/userLogin";
import userIndex from "../views/userIndex";
import userRegister from "../views/userRegister";
import userInfo from "../views/userInfo";

Vue.use(VueRouter);

const routes = [
    // 根路径直接重定向到 /userLogin
    {
        path: '/',
        redirect: '/userLogin'
    },
    // 正确配置 /login 路由
    {
        path: '/login',
        name: 'login',
        component: login
    },
    // 配置主应用路由
    {
        path: '/main',
        name: 'main',
        component: main,
        children: [
            {path: 'home', component: home, name: 'home'},
            {path: 'ad', component: ad, name: 'ad'},
            {path: 'engine', component: engine, name: 'engine'},
            {path: 'behavior', component: behavior, name: 'behavior'}
        ]
    },
    // 配置用户登录路由
    {
        path: '/userLogin',
        name: 'userLogin',
        component: userLogin
    },
    {
        path: '/index',
        component: userIndex,
        name: 'userIndex'
    },
    {
        path: '/register',
        component: userRegister,
        name: 'userRegister'
    },
    {
        path: '/info',
        component: userInfo,
        name: 'userInfo'
    }
];

const router = new VueRouter({
    routes
});

export default router;