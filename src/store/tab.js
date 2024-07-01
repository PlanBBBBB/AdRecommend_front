export default {
    state:{
        isCollapse : false,//控制菜单展开收起
        name: '广告推荐管理系统'
    },
    mutations:{
        isCollapseMenu(state){
            state.isCollapse = !state.isCollapse
            state.name = state.isCollapse==true ? '广告推荐管理系统' : '广告推荐管理系统'
        },
    }
}