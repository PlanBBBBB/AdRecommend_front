import axios from "axios";

const http = axios.create({
    baseURL : '/adRecommend',
    timeout : 10000,
    withCredentials :true
})


// 请求拦截器
http.interceptors.request.use(function(config){
    //在发送请求之前做些什么
    return config;
},function(error){
    //对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(function(response){
    //对响应数据做些什么
    return response;
},function(error){
    //对响应错误做些什么
    return Promise.reject(error);
});

export default http