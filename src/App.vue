<!-- 
  App.vue — 数据看板外壳
  职责：提供页面框架，组合卡片组件
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LibraryCard from './components/LibraryCard.vue'
import PlaceholderCard from './components/PlaceholderCard.vue'

const currentTime = ref(new Date().toLocaleString('zh-CN'))
let timer: number

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleString('zh-CN')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="dashboard">
    <!-- 头部 -->
    <header class="dashboard-header">
      <div>
        <h1>📡 CAPU 校园数据看板</h1>
        <div class="header-subtitle">校园数据聚合服务 · 实时监控</div>
      </div>
      <div class="header-right">
        <div class="status-badge">
          <span class="status-dot"></span>
          <span>API 在线</span>
        </div>
        <div class="stats-summary">
          <span>📊 数据源: 1/1</span>
          <span>⏱️ 运行: 0.1h</span>
        </div>
      </div>
    </header>

    <!-- 卡片网格 -->
    <main class="card-grid">
      <LibraryCard />
      
      <PlaceholderCard 
        emoji="🍜"
        title="食堂拥挤度"
        description="即将接入实时数据"
        badge="建设中"
      />
      
      <PlaceholderCard 
        emoji="📶"
        title="WebVPN 状态"
        description="延迟监测准备中"
        badge="规划中"
      />
    </main>

    <!-- 页脚 -->
    <footer class="dashboard-footer">
      <span>CAPU API Service · 数据实时同步</span>
      <span>最后更新: {{ currentTime }}</span>
    </footer>
  </div>
</template>
