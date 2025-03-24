<template>
  <div>
    <h1>用户个人资料</h1>
    <div v-if="userInfo">
      <p>用户名: {{ userInfo.username }}</p>
      <p>邮箱: {{ userInfo.email }}</p>
      <!-- 添加其他用户信息 -->
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api'; // 导入 API 请求实例

export default {
  data() {
    return {
      userInfo: null // 存储用户信息
    };
  },
  async created() {
    await this.getUserInfo(); // 组件创建时获取用户信息
  },
  methods: {
    async getUserInfo() {
      try {
        const response = await api.get('/user/profile/'); // 调用 API 获取用户信息
        this.userInfo = response.data; // 将返回的数据存储到 userInfo 中
      } catch (error) {
        console.error('获取用户信息失败:', error); // 处理错误
      }
    }
  }
};
</script>

<style>
/* 添加样式 */
</style>

