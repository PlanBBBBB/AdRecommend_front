import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home"
import ad from "../views/ad"
import main from "../views/main"
import engine from "../views/engine"
import behavior from "../views/behavior"
import login from "../views/login"

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        component:main,
        redirect: '/login',
        children:[
            { path:'/home',component:home},
            { path:'/ad',component:ad},
            { path:'/engine',component:engine},
            { path:'/behavior',component:behavior}
        ]
    },
    {
        path:'/login',
        name:'login',
        component:login
    },
]

const router = new VueRouter({
    routes
})

export default router