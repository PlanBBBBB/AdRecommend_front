<template>
    <span>你好</span>
  </template>
      
  <script>
  import router from "../router";
  import { landing } from "../api/index";
  export default {
    data() {
      return {
        ruleForm: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            { required: true, message: "请输入账号", trigger: "blur" },
            { min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur" },
          ],
        },
        isLoading: false,
      };
    },
    methods: {
      async land() {
        if (
          this.ruleForm.username == "" ||
          this.ruleForm.password == "" ||
          this.ruleForm.username.length > 10 ||
          this.ruleForm.password.length > 10 ||
          this.ruleForm.username.length < 3 ||
          this.ruleForm.password.length < 3
        ) {
          alert("请检查账号和密码！");
        } else {
          console.log("前往登录");
          await landing(this.ruleForm.username, this.ruleForm.password);
          console.log("到我了");
        }
      },
    },
  };
  </script>
      
  <style scoped>
  html,
  body {
    height: 100%;
    margin: 0;
  }
  </style>
      