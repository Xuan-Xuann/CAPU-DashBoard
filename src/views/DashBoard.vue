<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, provide } from 'vue'
import LibraryCard from '../components/cards/LibraryCard.vue'
import WeatherCard from '../components/cards/WeatherCard.vue'
import PlaceholderCard from '../components/cards/PlaceholderCard.vue'
import { fetchStatusSummary, type StatusSummary } from '../api/status'
import { fetchLibraryStats, type LibraryStats } from '../api/library'

// ===== 状态数据 =====
const statusSummary = ref<StatusSummary | null>(null)
const libraryStats = ref<Partial<LibraryStats>>({})
const libraryLastUpdate = ref('--:--:--')

let statusTimer: number
let libraryTimer: number

// ===== 提供给子组件 =====
provide('statusSummary', statusSummary)
provide('libraryStats', libraryStats)
provide('libraryLastUpdate', libraryLastUpdate)

// ===== 刷新函数 =====
async function refreshStatus() {
  const data = await fetchStatusSummary()
  if (data) {
    statusSummary.value = data
  }
}

async function refreshLibrary() {
  const data = await fetchLibraryStats()
  if (data) {
    libraryStats.value = data
  }
  libraryLastUpdate.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
}

// ===== 计算属性 =====
const formattedUptime = computed(() => {
  if (!statusSummary.value) return '--'
  return (statusSummary.value.uptime_seconds / 3600).toFixed(1)
})

const overallStatusText = computed(() => {
  if (!statusSummary.value) return '加载中...'
  return statusSummary.value.overall_status === 'Operational' ? 'API 在线' : 'API 异常'
})

// ===== 生命周期 =====
onMounted(() => {
  refreshStatus()
  refreshLibrary()
  
  statusTimer = setInterval(refreshStatus, 30000)
  libraryTimer = setInterval(refreshLibrary, 30000)
})

onUnmounted(() => {
  clearInterval(statusTimer)
  clearInterval(libraryTimer)
})
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <div class="header-subtitle">实时监控校园服务状态</div>
      </div>
      <div class="header-right">
        <div class="status-badge" :class="{ 'status-warning': statusSummary?.overall_status !== 'Operational' }">
          <span class="status-dot"></span>
          <span>{{ overallStatusText }}</span>
        </div>
        <div class="stats-summary">
          <span>数据源: {{ statusSummary?.operational_sources || 0 }}/{{ statusSummary?.total_sources || 0 }}</span>
          <span>今日请求: {{ statusSummary?.total_requests_today || '--' }}</span>
          <span>运行: {{ formattedUptime }}h</span>
        </div>
      </div>
    </div>

    <main class="card-grid">
      <!-- 图书馆数据卡片 -->
      <LibraryCard />
      
      <!-- 天气卡片（真实数据） -->
      <WeatherCard />

      
      <!-- WebVPN 占位 -->
      <PlaceholderCard 
        emoji="🔧"
        title="更多信息卡片敬请期待"
        description="😉正在开发哦，敬请期待"
        badge="规划中"
      />
    </main>
  </div>
</template>

<style scoped>
@import '../styles/dashboard.css';
</style>