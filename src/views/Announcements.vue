<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Announcement {
  id: number
  title: string
  content: string
  publish_time: string
  source: string
  views: number
}

const announcements = ref<Announcement[]>([])
const loading = ref(true)

async function fetchAnnouncements() {
  try {
    const res = await fetch('https://api.rinty.xyz/api/v1/announcements')
    announcements.value = await res.json()
  } finally {
    loading.value = false
  }
}

onMounted(fetchAnnouncements)
</script>

<template>
  <div class="announcements-page">
    <div class="page-header">
      <h1>校园公告</h1>
      <p class="subtitle">来自学校官网的最新通知</p>
    </div>

    <div v-if="loading" class="loading">加载中...</div>
    
    <div v-else class="announcement-list">
      <article v-for="item in announcements" :key="item.id" class="announcement-item">
        <h2>{{ item.title }}</h2>
        <div class="meta">
          <span>📅 {{ item.publish_time }}</span>
          <span>📌 {{ item.source }}</span>
          <span>👁 {{ item.views }} 次阅读</span>
        </div>
        <p class="excerpt">{{ item.content.slice(0, 200) }}...</p>
        <a href="#" class="read-more">阅读全文 →</a>
      </article>
    </div>
    
  </div>
</template>

<style scoped>
.announcements-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  color: #0f172a;
  margin-bottom: 8px;
}

.announcement-item {
  background: white;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.announcement-item h2 {
  font-size: 20px;
  color: #1e293b;
  margin-bottom: 12px;
}

.meta {
  display: flex;
  gap: 24px;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 16px;
}

.excerpt {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 16px;
}

.read-more {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}
</style>