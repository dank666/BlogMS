<template>
  <div>
    <h1>博客文章</h1>
    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </li>
    </ul>
    <p v-else>暂无博客文章</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "BlogPage",  // 修改组件名，符合 Vue 规范
  data() {
    return {
      posts: []  // 初始化为空数组
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('/api/posts/');
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.posts = [];  // 确保即使失败，posts 仍然是数组，避免页面报错
      }
    }
  }
};
</script>

