<template>
  <div class="login-container">
    <h2>用户登录</h2>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    <button @click="login">登录</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
          username: this.username,
          password: this.password
        });

        // 1️⃣ 获取 token 并存入 localStorage
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        // 2️⃣ 跳转到首页
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = '登录失败，请检查用户名或密码';
      }
    }
  }
};
</script>

<style>
.login-container {
  max-width: 300px;
  margin: 100px auto;
  text-align: center;
}
.error {
  color: red;
}
</style>

