import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from '../src/store/index'
import Cookies from 'js-cookie';
import { Select,ColorPicker,Container,Aside,Header,Main,Menu,MenuItem,
  MenuItemGroup,Submenu,Button,Icon,Row,Col,Card,Form,FormItem,Input,
  Upload,Dialog,Table,Scrollbar,Pagination,TableColumn,DatePicker,Option,Radio,RadioGroup,Drawer,Cascader,MessageBox,Message } from 'element-ui';

Vue.config.productionTip = false
Vue.use(Select);Vue.use(ColorPicker);Vue.use(Container);Vue.use(Aside);
Vue.use(Header);Vue.use(Main);Vue.use(Menu);Vue.use(MenuItem);
Vue.use(MenuItemGroup);Vue.use(Submenu);Vue.use(Button);Vue.use(Icon);
Vue.use(Row);Vue.use(Col);Vue.use(Card);Vue.use(Form);Vue.use(FormItem);
Vue.use(Input);Vue.use(Upload);Vue.use(Dialog);Vue.use(Table);Vue.use(Scrollbar);
Vue.use(Pagination);Vue.use(TableColumn);Vue.use(DatePicker);Vue.use(Option);Vue.use(Radio);Vue.use(RadioGroup);
Vue.use(Drawer);Vue.use(Cascader);


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

router.beforeEach((to,from,next) => {
  const token = localStorage.getItem("token")
  if(!token && to.path !== '/login'&& to.path!=="/register"){
    next({name:'login'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  el:'#app',
  render: h => h(App),
}).$mount('#app')