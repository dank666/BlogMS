<template>
  <button @click="logout">退出登录</button>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      this.$router.push('/login');
    }
  }
};
</script>

