export default {
    state:{
        isCollapse : false,//控制菜单展开收起
        name: 'AIGC广告推荐系统'
    },
    mutations:{
        isCollapseMenu(state){
            state.isCollapse = !state.isCollapse
            state.name = state.isCollapse==true ? 'AIGC广告推荐系统' : 'AIGC广告推荐系统'
        },
    }
}