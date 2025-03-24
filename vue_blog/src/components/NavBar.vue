<template>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/dashboard">个人中心</router-link>
    <LogoutButton />
  </nav>
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  components: { LogoutButton }
};
</script>

