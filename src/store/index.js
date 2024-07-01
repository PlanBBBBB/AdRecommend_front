import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import { checking,adminFindBook } from '@/api'
import http from '../utils/request'
import router from '@/router';
import Cookies from 'js-cookie';

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab
    },
    state:{
        userInfo : [],
        bookInfo : []
    },
    mutations:{
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setBookInfo(state, bookInfo){
            state.bookInfo = bookInfo;
        }
    },
    actions:{
        fetchUserInfo(context,userInfo) {
            context.commit("setUserInfo",userInfo)
        },
        fetchBookInfo(context,bookInfo){
            console.log("fetchBookInfo");
            console.log(bookInfo);
            context.commit("setBookInfo",bookInfo)
        }
    }
})
