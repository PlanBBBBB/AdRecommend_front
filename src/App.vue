<template>
  <div class="block" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router';

export default {
    name: "App",
    data() {
        return {
            value: "",
            color1: "#409EFF",
            color2: null
        };
    },
    components: { router }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p,html,body,h3{
    margin: 0;
    padding: 0;
}
#app{
  margin: 0;
}
</style>
