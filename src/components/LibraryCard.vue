<!-- 
  LibraryCard — 图书馆数据卡片
  职责：请求并展示图书馆入馆数据
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { fetchLibraryStats, type LibraryStats } from '../api/library'

const libData = ref<Partial<LibraryStats>>({})
const lastUpdate = ref('--:--:--')
let timer: number

async function refreshData() {
  const data = await fetchLibraryStats()
  if (data) {
    libData.value = data
  }
  lastUpdate.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
}

onMounted(() => {
  refreshData()
  timer = setInterval(refreshData, 30000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="card library-card">
    <div class="card-header">
      <span class="card-title">📚 图书馆实时数据</span>
      <span class="card-badge">{{ lastUpdate }}</span>
    </div>
    
    <div class="library-stats">
      <div class="stat-item">
        <span class="stat-label">今日入馆</span>
        <span class="stat-number">{{ libData.today ?? '--' }}</span>
        <span class="stat-unit">人</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">本周累计</span>
        <span class="stat-number">{{ libData.week ?? '--' }}</span>
        <span class="stat-unit">人</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">本月累计</span>
        <span class="stat-number">{{ libData.month ?? '--' }}</span>
        <span class="stat-unit">人</span>
      </div>
    </div>

    <div class="card-footer">
      <span class="source-tag">📡 数据源: CAPU-Library-System</span>
    </div>
  </div>
</template>

<style src="src\styles\card\library-card.css" scoped></style>